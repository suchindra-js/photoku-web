import { FC } from "react";
import styles from "./styles.module.scss";

interface GalleryImageProps {
  src: string;
  alt?: string;
  caption?: string;
}

const GalleryImage: FC<GalleryImageProps> = ({ src, alt, caption }) => {
  return (
    <div className={styles.imageWrapper}>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {caption && (
        <div className={styles.imageOverlay}>
          <p className={styles.imageCaption}>{caption}</p>
        </div>
      )}
    </div>
  );
};

export default GalleryImage;
