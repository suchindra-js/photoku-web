import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoNavWrapper}>
          <Link href="/" className={styles.logoLink}>
            <Image src="/globe.svg" alt="Logo" width={32} height={32} />
            <span className={styles.logoText}>EventSnap</span>
          </Link>
          <nav className={styles.navLinks}>
            <Link href="/events">Events</Link>
            <Link href="/photographers">Photographers</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <div className={styles.authButtons}>
          <button className={`${styles.button} ${styles.ghostButton}`}>
            Sign In
          </button>
          <button className={styles.button}>Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
