"use client";
import { FC } from "react";
import styles from "./page.module.css";
import ProfilePhoto from "@components/profile-photo";
import EventListing from "@components/event-listing";

const events = [
  {
    id: "1",
    name: "Summer Music Festival",
    date: "June 15, 2024",
    location: "Central Park, NYC",
    description:
      "Join us for a day filled with music, food, and fun at the annual Summer Music Festival.",
    imageUrl: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    id: "2",
    name: "Art Expo 2024",
    date: "July 10, 2024",
    location: "Downtown Art Gallery",
    description:
      "Explore contemporary art from local and international artists at Art Expo 2024.",
    imageUrl: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    id: "3",
    name: "Tech Conference 2024",
    date: "August 5, 2024",
    location: "Silicon Valley Conference Center",
    description:
      "Learn about the latest advancements in technology at this year's Tech Conference.",
    imageUrl: "https://picsum.photos/seed/picsum/200/300",
  },
];

const Profile: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ProfilePhoto alt="Jane Smith" size="medium" />
        <div>Jane Smith</div>
      </div>

      <div className={styles.listing}>
        <EventListing events={events} onEventClick={() => {}} />
      </div>
    </div>
  );
};

export default Profile;
