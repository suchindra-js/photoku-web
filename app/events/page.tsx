"use client";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { apiFetch } from "app/_lib/api";
import Button from "@components/button";
import { Event } from "app/_types/event";

const EventListing: FC = () => {
  const { push } = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiFetch<Event[]>("/events");
        setEvents(data);
      } catch (error) {
        // console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Events</h1>
        <Button onClick={() => push("/events/add")}>+ Add Event</Button>
      </div>

      {/* Loading State */}
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className={styles.eventList}>
          {events.map((event) => (
            <div
              key={event.id}
              className={styles.eventCard}
              onClick={() => push(`/events/${event.id}`)}
            >
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventListing;
