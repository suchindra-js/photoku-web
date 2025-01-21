"use client";
import { FC } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

const EventListing: FC = () => {
  const { push } = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Events</div>
        <div onClick={() => push("event/add")}>+ Add</div>
      </div>
    </div>
  );
};

export default EventListing;
