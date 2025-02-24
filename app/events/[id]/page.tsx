"use client";

import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "app/_lib/api";
import styles from "./styles.module.scss";
import Button from "@components/button";
import { Event } from "app/_types/event";

const EventDetail: FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiFetch<Event>(`/events/${id}`);
        setEvent(response);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{event.title}</h1>
        <Button variant="ghost" onClick={() => router.push("/events")}>
          Back
        </Button>
      </div>
      <p className={styles.description}>{event.description}</p>
      <p className={styles.date}>
        Created at: {new Date(event.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default EventDetail;
