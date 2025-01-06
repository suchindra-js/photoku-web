"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";
import Button from "../button";
import { useAuth } from "@contexts/auth-context";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, login, logout } = useAuth(); // Get auth state and actions

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
        {/* Common Links */}
        {!isAuthenticated && (
          <>
            <Link href="/events" onClick={() => setIsMobileMenuOpen(false)}>
              Events
            </Link>
            <Link
              href="/photographers"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Photographers
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
          </>
        )}

        {/* Conditional Links based on Authentication */}
        {isAuthenticated ? (
          <>
            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </Link>
            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
              Profile
            </Link>
            <Button variant="ghost" onClick={logout}>
              Sign Out
            </Button>
          </>
        ) : (
          <div className={styles.authButtons}>
            <Button variant="ghost" onClick={() => login()}>
              Sign In
            </Button>
            <Button>Sign Up</Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
