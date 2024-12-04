"use client";
import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import Button from "../button";

const Header: FC = () => {
  const { push } = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoNavWrapper}>
          <Link href="/" className={styles.logoLink}>
            <Image src="/globe.svg" alt="Logo" width={32} height={32} />
            <span className={`${styles.logoText} sm:inline-block`}>
              EventSnap
            </span>
          </Link>

          {/* Mobile Hamburger Icon */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          {/* Desktop Navigation */}
          <nav
            className={`${styles.navLinks} ${
              isMobileMenuOpen ? styles.navLinksMobile : ""
            }`}
          >
            <Link href="/events">Events</Link>
            <Link href="/photographers">Photographers</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>

        {/* Auth Buttons */}
        <div className={styles.authButtons}>
          <Button onClick={() => push("profile")} variant="ghost">
            Sign In
          </Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
