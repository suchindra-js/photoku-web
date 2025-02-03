"use client";
import ImageInput from "@components/image-input";
import TextAreaInput from "@components/text-area-input";
import TextInput from "@components/text-input";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FC } from "react";

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
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EventAdd;
