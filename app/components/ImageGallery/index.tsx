import { FC, useEffect, useRef, useState } from "react";
import GalleryImage from "../GalleryImage";
import styles from "./styles.module.scss";

interface GridImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GridImage[];
}

const ImageGallery: FC<ImageGalleryProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const calculateLayout = (images: GridImage[], containerWidth: number) => {
    const margin = 10;
    const rowHeight = 300;
    const rows: GridImage[][] = [];
    let currentRow: GridImage[] = [];
    let currentWidth = 0;

    images.forEach((image) => {
      const aspectRatio = image.width / image.height;
      const scaledWidth = rowHeight * aspectRatio;

      if (currentWidth + scaledWidth + margin > containerWidth) {
        rows.push(currentRow);
        currentRow = [image];
        currentWidth = scaledWidth + margin;
      } else {
        currentRow.push(image);
        currentWidth += scaledWidth + margin;
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  const layout = calculateLayout(images, containerWidth);

  return (
    <div className={styles.galleryContainer} ref={containerRef}>
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.galleryRow}>
          {row.map((image, imageIndex) => (
            <div key={imageIndex} className={styles.galleryItem}>
              <GalleryImage
                src={image.src}
                alt={image.alt}
                caption={image.caption}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
