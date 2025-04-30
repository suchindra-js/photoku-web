"use client";
import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "app/_lib/api";
import styles from "./styles.module.scss";
import Button from "@components/button";
import { EventWithImages } from "app/_types/event";
import ImageGallery from "app/components/ImageGallery";

interface GridImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
  caption?: string;
}

const EventDetail: FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<EventWithImages | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiFetch<EventWithImages>(`/events/${id}`);
        setData(response);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  if (loading)
    return <p className={styles.loading}>Loading event details...</p>;
  if (!data) return <p className={styles.error}>Event not found.</p>;

  // Transform event images into grid images
  const gridImages: GridImage[] = data.images.map((img) => ({
    src: img.url,
    width: 320,
    height: 240,
    alt: `Event Image ${img.filename}`,
    caption: `Uploaded: ${new Date(img.createdAt).toLocaleDateString()}`,
  }));

  return (
    <div className={styles.container}>
      {/* Banner Section */}
      <div className={styles.banner}>
        <div className={styles.overlay}>
          <h1>{data.event.title}</h1>
          <p>{data.event.description}</p>
          <p className={styles.date}>
            Created at: {new Date(data.event.createdAt).toLocaleDateString()}
          </p>
          <Button variant="ghost" onClick={() => router.push("/events")}>
            Back to Events
          </Button>
        </div>
      </div>

      {/* Image Gallery */}
      {data.images.length > 0 && <ImageGallery images={gridImages} />}
    </div>
  );
};

export default EventDetail;
