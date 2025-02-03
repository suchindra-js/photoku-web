import { FC, useState } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "react-modal";
import styles from "./styles.module.scss";

// Set the root element for accessibility (required by react-modal)
// Modal.setAppElement("#__next");

const ImageInput: FC = () => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    onDrop: (acceptedFiles) => {
      const imageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...imageUrls]);
    },
  });

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : previewImages.length - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev < previewImages.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <section className={styles.container}>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Uploaded Files</h4>
        <div className={styles.previews}>
          {previewImages.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Preview ${index}`}
              className={styles.previewImage}
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      </aside>

      {/* Modal for Image Preview */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Preview"
        ariaHideApp={false}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90%",
            maxHeight: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          },
        }}
      >
        {previewImages[currentImageIndex] && (
          <img
            src={previewImages[currentImageIndex]}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        )}
        <div className={styles.modalControls}>
          <button onClick={goToPrevious}>Previous</button>
          <button onClick={goToNext}>Next</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </section>
  );
};

export default ImageInput;
