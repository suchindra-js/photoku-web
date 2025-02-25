"use client";
import Button from "@components/button";
import ImageInput from "@components/image-input";
import TextAreaInput from "@components/text-area-input";
import TextInput from "@components/text-input";
import { Formik, Form, FormikHelpers } from "formik";
import { FC, useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { apiFetch } from "app/_lib/api";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

interface FormValues {
  title: string;
  description: string;
}

const EventAdd: FC = () => {
  const { push, back } = useRouter();
  const [images, setImages] = useState<File[]>([]);

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      images.forEach((image) => formData.append("images", image));

      await apiFetch<{ message: string }>("/events", {
        method: "POST",
        body: formData, // Send formData instead of JSON
      });

      push("/events");
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form className={styles.form}>
            <TextInput label="Title" name="title" />
            <TextAreaInput label="Description" name="description" />
            <ImageInput onImagesChange={setImages} />
            <div className={styles.footer}>
              <Button variant="ghost" type="button" onClick={() => back()}>
                Cancel
              </Button>
              <Button
                disabled={!isValid || isSubmitting}
                variant="default"
                type="submit"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventAdd;
