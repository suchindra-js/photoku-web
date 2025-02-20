"use client";
import Button from "@components/button";
import ImageInput from "@components/image-input";
import TextAreaInput from "@components/text-area-input";
import TextInput from "@components/text-input";
import { Formik, Form } from "formik";
import { FC } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { apiFetch } from "app/_lib/api";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const EventAdd: FC = () => {
  async function createEvent() {
    const data = {
      title: "testing",
      description: "description baby",
    };

    try {
      const response = await apiFetch("/events", {
        method: "POST", // Set method to POST
        body: JSON.stringify(data), // Include the data in the body of the request
      });

      console.log("Event created:", response);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  }
  return (
    <div>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));

              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isValid }) => (
            <Form>
              <TextInput label="Title" name="title" />
              <TextAreaInput label="Description" name="description" />
              <ImageInput />
              <div className={styles.footer}>
                <Button variant="ghost">Cancel</Button>
                <Button
                  disabled={!isValid}
                  variant="default"
                  type="submit"
                  onClick={() => createEvent()}
                >
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EventAdd;
