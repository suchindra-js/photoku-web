import { FC } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

interface EventListingProps {
  events: Event[]; // Array of events
  onEventClick?: (id: string) => void; // Callback for when an event is clicked
}

const EventListing: FC<EventListingProps> = ({ events, onEventClick }) => {
  return (
    <div className={styles.eventListing}>
      {events.map((event) => (
        <div
          key={event.id}
          className={styles.eventCard}
          onClick={() => onEventClick?.(event.id)}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={event.imageUrl}
              alt={event.name}
              layout="fill"
              objectFit="cover"
              className={styles.eventImage}
            />
          </div>
          <div className={styles.eventDetails}>
            <h3 className={styles.eventName}>{event.name}</h3>
            <p className={styles.eventDate}>{event.date}</p>
            <p className={styles.eventLocation}>{event.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventListing;
