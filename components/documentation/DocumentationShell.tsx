"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { DocumentationSearchEntry } from "@/lib/documentation/content";
import {
  documentationHref,
  documentationPages,
} from "@/lib/documentation/manifest";
import { DocumentationIcon as Icon } from "./DocumentationIcon";
import { DocumentationNavigation } from "./DocumentationNavigation";
import { documentationSections } from "@/lib/documentation/sections";
import { DocumentationSearch } from "./DocumentationSearch";

/**
 * Docs-only theme, search hotkeys and responsive navigation. Theme preference
 * is stored under a separate key and never changes editor/global theme state.
 * Native dialogs own modal focus. Listeners and open dialogs are cleaned up
 * when leaving the docs; route content remains server-rendered children.
 */
export function DocumentationShell({
  children,
  search,
}: {
  children: ReactNode;
  search: readonly DocumentationSearchEntry[];
}) {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenu = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    try {
      if (localStorage.getItem("chorono-docs-theme") === "dark")
        setTheme("dark");
    } catch {
      /* Storage is optional. */
    }
    const keydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen(false);
        setSearchOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (menuOpen && !mobileMenu.current?.open) mobileMenu.current?.showModal();
    if (!menuOpen && mobileMenu.current?.open) mobileMenu.current.close();
  }, [menuOpen]);
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("chorono-docs-theme", next);
    } catch {
      /* Optional preference. */
    }
  };
  return (
    <div className="cd-site" data-theme={theme}>
      <a className="cd-skip" href="#docs-main">
        Skip to content
      </a>
      <div className="cd-toolbar" role="region" aria-label="Documentation tools">
        <div className="cd-toolbar-inner">
          <Link className="cd-section-home" href="/docs">Documentation</Link>
          <nav className="cd-top-nav" aria-label="Documentation sections">
            {documentationSections.filter(section => section.primary).map(section => (
              <Link key={section.id} href={documentationHref(section.slug)}
                className={documentationPages.find(page => documentationHref(page.slug) === pathname)?.section === section.id ? "cd-top-active" : undefined}
                aria-current={documentationHref(section.slug) === pathname ? "page" : undefined}
              >{section.label}</Link>
            ))}
          </nav>
          <div className="cd-toolbar-actions">
            <button
              className="cd-search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Search documentation"
            >
              <Icon name="search" size={17} />
              <span>Search documentation</span>
              <kbd>⌘ K</kbd>
            </button>
            <button
              className="cd-icon-button"
              onClick={toggleTheme}
              aria-label={
                theme === "light"
                  ? "Switch to dark theme"
                  : "Switch to light theme"
              }
            >
              <Icon name={theme === "light" ? "sun" : "moon"} size={19} />
            </button>
            <button
              className="cd-icon-button cd-mobile-menu-trigger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <Icon name="menu" size={21} />
            </button>
          </div>
        </div>
      </div>
      <div className="cd-frame">
        <aside className="cd-sidebar">
          <div className="cd-sidebar-top">
            <span className="cd-sidebar-label">THE HANDBOOK</span>
            <Link href="/docs/releases/0.2.0" className="cd-version">
              v0.2.0
            </Link>
          </div>
          <DocumentationNavigation />
          <div className="cd-sidebar-note">
            <span className="cd-sidebar-note-icon">
              <Icon name="spark" size={17} />
            </span>
            <div>
              <strong>Your ideas, still editable.</strong>
              <p>
                Make it. Change it.
                <br />
                Make it yours.
              </p>
              <Link href="/docs/first-animation">
                Start creating <Icon name="arrow" size={14} />
              </Link>
            </div>
          </div>
          <div className="cd-sidebar-foot">
            <span className="cd-status-dot" /> Free & open source{" "}
            <span>MIT</span>
          </div>
        </aside>
        <div className="cd-reading">{children}</div>
      </div>
      <DocumentationSearch
        entries={search}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <dialog
        className="cd-mobile-menu"
        ref={mobileMenu}
        aria-label="Documentation navigation"
        onClose={() => setMenuOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setMenuOpen(false);
        }}
      >
        <div className="cd-mobile-menu-panel">
          <div className="cd-mobile-menu-heading">
            <strong>Explore the docs</strong>
            <button
              className="cd-icon-button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <Icon name="close" />
            </button>
          </div>
          <DocumentationNavigation onNavigate={() => setMenuOpen(false)} />
        </div>
      </dialog>
    </div>
  );
}
