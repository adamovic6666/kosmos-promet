"use client";
import Image from "next/image";
import styles from "./Header.module.css";
import { useEffect, useState, useRef } from "react";
import Facebook from "@/app/_svg/Facebook";
import YouTube from "@/app/_svg/YouTube";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/app/utils/nav-links";
import SearchDropdown from "@/app/_components/ui/SearchDropdown";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  // Define a type for the SearchDropdown ref if not already defined
  type SearchDropdownRef = {
    clearSearch: () => void;
  };

  const searchInputRef = useRef<SearchDropdownRef | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleOpenMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };

  const handleOpenSearch = () => {
    setSearchIsOpen((prev) => !prev);
  };

  const handleCloseSearch = () => {
    setSearchIsOpen(false);
  };

  useEffect(() => {
    if ((menuIsOpen || searchIsOpen) && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuIsOpen, searchIsOpen, isMobile]);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.burger} onClick={handleOpenMenu} />
        {!searchIsOpen && (
          <div className={styles.logo}>
            <Link href={"/"}>
              <Image src={"/images/logo.webp"} alt="logo" fill />
            </Link>
          </div>
        )}
        <nav className={`${styles.nav} ${menuIsOpen ? styles.open : ""}`}>
          <ul>
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                {label.toLowerCase() === "katalog" ? (
                  <a href="/pdf/AutoFrogyKatalog2025.pdf" target="_blank">
                    {label}
                  </a>
                ) : (
                  <Link
                    onClick={handleOpenMenu}
                    href={href}
                    className={
                      pathname === href ? styles.activeLink : styles.link
                    }
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.socials}>
            <a
              href="https://www.facebook.com/autofrogy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook fill="#000" />
            </a>
            <a
              href="https://www.youtube.com/@autofrogy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTube fill="#000" />
            </a>
          </div>

          <div className={styles.bgImage}></div>
        </nav>
        <div className={styles.search}>
          <SearchDropdown
            placeholder="Pretraži..."
            className={styles.headerSearch}
          />
        </div>
        {!searchIsOpen && (
          <div className={styles.mobileSearch} onClick={handleOpenSearch} />
        )}
      </div>

      {/* Mobile Search Overlay */}
      <div
        className={`${styles.mobileSearchOverlay} ${
          searchIsOpen ? styles.open : ""
        }`}
        onClick={(e) => {
          // Close dropdown when clicking on backdrop
          if (e.target === e.currentTarget) {
            handleCloseSearch();
          }
        }}
      >
        <div className={styles.mobileSearchContainer}>
          <div
            className={styles.mobileSearchClose}
            onClick={() => {
              // Clear search text and close the search overlay
              if (searchInputRef?.current) {
                searchInputRef.current.clearSearch();
              }
            }}
          >
            ✕
          </div>
          <div className={styles.mobileSearchInput}>
            <SearchDropdown
              placeholder="Pretraži..."
              isMobile={true}
              onClose={handleCloseSearch}
              ref={searchInputRef}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
