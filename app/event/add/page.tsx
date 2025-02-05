"use client";
import Button from "@components/button";
import ImageInput from "@components/image-input";
import TextAreaInput from "@components/text-area-input";
import TextInput from "@components/text-input";
import { Formik, Form } from "formik";
import { FC } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const EventAdd: FC = () => {
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
                <Button disabled={!isValid} variant="default" type="submit">
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
