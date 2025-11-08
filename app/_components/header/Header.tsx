"use client";
import Image from "next/image";
import styles from "./Header.module.css";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/app/utils/nav-links";
import SearchDropdown from "@/app/_components/ui/SearchDropdown";
import Burger from "@/app/_svg/Burger";
import Search from "@/app/_svg/Search";
import Cart from "@/app/_svg/Cart";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  const handleOpenDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // Small delay to prevent flickering
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
        <div className={styles.mobileIcons}>
          <Burger onClick={handleOpenMenu} className={styles.burger} />
          {!searchIsOpen && (
            <Search
              onClick={handleOpenSearch}
              className={styles.headerSearchIcon}
            />
          )}
        </div>

        {!searchIsOpen && (
          <div className={styles.logo}>
            <Link href={"/"}>
              <Image src={"/images/logo.svg"} alt="logo" fill />
            </Link>
          </div>
        )}
        <nav className={`${styles.nav} ${menuIsOpen ? styles.open : ""}`}>
          <ul className={styles.navList}>
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  onClick={handleOpenMenu}
                  onMouseOver={() => {
                    // Close search when hovering over a link
                    if (label === "proizvodi") {
                      handleOpenDropdown();
                    }
                  }}
                  onMouseLeave={() => {
                    // Close dropdown when mouse leaves the link
                    if (label === "proizvodi") {
                      handleCloseDropdown();
                    }
                  }}
                  href={href}
                  className={
                    pathname === href ? styles.activeLink : styles.link
                  }
                >
                  {label}
                </Link>
                {/* {label === "proizvodi" && (
                  <div
                    className={`${styles.productsDropdown} ${
                      isDropdownOpen ? styles.open : ""
                    }`}
                    onMouseEnter={handleOpenDropdown}
                    onMouseLeave={handleCloseDropdown}
                  >
                    <ul className={styles.productsList}>
                      <li>
                        <Link href="/proizvodi/auto-kopce">Auto kopče</Link>
                      </li>
                      <li>
                        <Link href="/proizvodi/kopce-podizaca-stakla">
                          Kopče podizača stakla
                        </Link>
                      </li>
                      <li>
                        <Link href="/proizvodi/fiksatori-za-patosnice">
                          Fiksatori za patosnice
                        </Link>
                      </li>

                      <li>
                        <Link href="/proizvodi/ukrasne-kapice-za-srafove">
                          Ukrasne kapice za šrafove
                        </Link>
                      </li>
                      <li>
                        <Link href="/proizvodi/univerzalni-nastavci">
                          Univerzalni nastavci
                        </Link>
                      </li>
                      <li>
                        <Link href="/proizvodi/nosaci-i-ramovi-za-tablice">
                          Nosaci i ramovi za tablice
                        </Link>
                      </li>
                      <li>
                        <Link href="/proizvodi/alati-za-limare">
                          Alati za limare
                        </Link>
                      </li>
                      <li>
                        <Link href="/proizvodi/ostali-proizvodi">
                          Ostali proizvodi
                        </Link>
                      </li>
                    </ul>
                  </div>
                )} */}
              </li>
            ))}
          </ul>

          <div className={styles.bgImage}></div>
        </nav>
        <div className={styles.cartContainer}>
          <div className={styles.search}>
            <SearchDropdown
              placeholder="Pretraži..."
              className={styles.headerSearch}
            />
          </div>
          <Cart className={styles.cart} />
        </div>
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
