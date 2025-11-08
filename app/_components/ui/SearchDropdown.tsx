"use client";
import {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./SearchDropdown.module.css";
import { useRouter } from "next/navigation";
import { debounce, searchProducts, SearchResult } from "@/app/utils/search";
import Link from "next/link";

interface SearchDropdownProps {
  placeholder?: string;
  isMobile?: boolean;
  onClose?: () => void;
  className?: string;
}

export interface SearchDropdownRef {
  clearSearch: () => void;
}

const SearchDropdown = forwardRef<SearchDropdownRef, SearchDropdownProps>(
  ({ placeholder = "Pretraži...", onClose, className = "" }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          searchRef.current &&
          !searchRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // Debounced search function - only executes after typing stops for the specified time
    const debouncedSearch = useRef(
      debounce(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
          setResults([]);
          setIsLoading(false);
          return;
        }
        setIsLoading(true);
        try {
          const searchResults = await searchProducts(searchQuery, true);
          setResults(searchResults);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      }, 400), // 400ms debounce - waits until typing pauses
    ).current;

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);

      if (value.length > 0) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }

      // Use the debounced search function
      debouncedSearch(value);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (query.length < 2) return;

      if (selectedIndex >= 0 && results[selectedIndex]) {
        // Navigate to the selected result
        router.push(results[selectedIndex].url);
      } else {
        // Navigate to search results page
        router.push(`/proizvodi/search?q=${encodeURIComponent(query)}`);
      }

      setIsOpen(false);
      if (onClose) onClose();
    };

    // Handle keyboard navigation in dropdown
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      // Down arrow
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev,
        );
      }
      // Up arrow
      else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
      // Escape key
      else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    // Handle result click
    const handleResultClick = (result: SearchResult) => {
      router.push(result.url);
      setIsOpen(false);
      setQuery("");
      if (onClose) onClose();
    };

    // Function to clear search input
    const handleClearSearch = () => {
      setQuery("");
      setIsOpen(false);
      setResults([]);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Expose clearSearch method to parent components via ref
    useImperativeHandle(ref, () => ({
      clearSearch: handleClearSearch,
    }));

    return (
      <div className={`${styles.searchContainer} ${className}`} ref={searchRef}>
        <form onSubmit={handleSubmit}>
          <div className={styles.searchInput}>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              ref={inputRef}
              autoComplete="off"
            />
            {query.length > 0 && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {isOpen && query.length > 0 && (
            <div className={styles.resultsDropdown}>
              {isLoading ? (
                <div className={styles.loading}>Učitavanje...</div>
              ) : results.length > 0 ? (
                <ul>
                  {results.map((result, index) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      className={styles.resultLink}
                    >
                      <li
                        className={
                          index === selectedIndex ? styles.selected : ""
                        }
                        onClick={() => handleResultClick(result)}
                      >
                        {result.imageUrl && (
                          <div className={styles.resultImage}>
                            {/* <img src={result.imageUrl} alt={result.title} /> */}
                          </div>
                        )}
                        <div className={styles.resultContent}>
                          <h5>{result.title}</h5>
                          {result.description && <p>{result.description}</p>}
                          {result.category && (
                            <span className={styles.category}>
                              {result.category}
                            </span>
                          )}
                        </div>
                      </li>
                    </Link>
                  ))}
                  <li className={styles.viewAll} onClick={handleSubmit}>
                    Prikaži sve rezultate
                  </li>
                </ul>
              ) : query.length >= 2 ? (
                <div className={styles.noResults}>
                  Nema rezultata pretrage za &quot;<strong>{query}</strong>
                  &quot;
                </div>
              ) : (
                <div className={styles.minChars}>
                  Unesite najmanje 2 karaktera...
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    );
  },
);

// Add display name to fix ESLint warning
SearchDropdown.displayName = "SearchDropdown";

export default SearchDropdown;
