"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";
import Button from "../button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image src="/globe.svg" alt="EventSnap Logo" width={32} height={32} />
          <span>EventSnap</span>
        </Link>

        {/* Hamburger Icon */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle Mobile Menu"
        >
          ☰
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ""}`}>
        <Link href="/events" onClick={() => setIsMobileMenuOpen(false)}>
          Events
        </Link>
        <Link href="/photographers" onClick={() => setIsMobileMenuOpen(false)}>
          Photographers
        </Link>
        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
          About
        </Link>

        {/* Auth Buttons */}
        <div className={styles.authButtons}>
          <Button variant="ghost">Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
