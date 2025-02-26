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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await apiFetch(`/events/${id}`, { method: "DELETE" });
      setEvents((prev) => prev.filter((event) => event.id.toString() !== id));
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

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
            <div key={event.id} className={styles.eventCard}>
              <div onClick={() => push(`/events/${event.id}`)}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(event.id.toString())}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventListing;
