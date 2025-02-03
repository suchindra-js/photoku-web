"use client";
import Button from "@components/button";
import ImageInput from "@components/image-input";
import TextAreaInput from "@components/text-area-input";
import TextInput from "@components/text-input";
import { Formik, Form } from "formik";
import { FC } from "react";
import styles from "./styles.module.scss";

const EventAdd: FC = () => {
  return (
    <div>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = { email: null };
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput label="Title" name="title" />
              <TextAreaInput label="Description" name="description" />
              <ImageInput />
              <div className={styles.footer}>
                <Button variant="ghost">Cancel</Button>
                <Button variant="default">Save</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EventAdd;
