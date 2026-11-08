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
import { DocumentationSearch } from "./DocumentationSearch";

/** Server-renderable route navigation, shared by the desktop rail and mobile dialog. */
function DocumentationNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const groups = Array.from(
    new Set(documentationPages.map((page) => page.group)),
  );
  return (
    <nav className="cd-navigation" aria-label="Documentation">
      {groups.map((group) => (
        <div className="cd-nav-group" key={group}>
          <h2>{group}</h2>
          {documentationPages
            .filter((page) => page.group === group)
            .map((page) => (
              <Link
                key={page.slug}
                href={documentationHref(page.slug)}
                aria-current={
                  pathname === documentationHref(page.slug) ? "page" : undefined
                }
                onClick={onNavigate}
              >
                <span className="cd-nav-indicator" />
                {page.label}
                {page.slug === "animation/loops" && (
                  <span className="cd-new">NEW</span>
                )}
              </Link>
            ))}
        </div>
      ))}
      <div className="cd-nav-group cd-nav-external">
        <h2>Keep exploring</h2>
        <Link
          href="/animations"
          onClick={onNavigate}
          aria-current={pathname.startsWith("/animations") ? "page" : undefined}
        >
          Animation library <Icon name="arrow" size={13} />
        </Link>
        <a href="https://www.chorono.com/blog">
          Examples & guides <Icon name="external" size={13} />
        </a>
        <a href="https://github.com/codie1982/chorono-editor">
          GitHub repository <Icon name="external" size={13} />
        </a>
      </div>
    </nav>
  );
}

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
      <header className="cd-header">
        <div className="cd-header-inner">
          <Link
            className="cd-brand"
            href="/docs"
            aria-label="Chorono documentation home"
          >
            <span className="cd-brand-symbol" aria-hidden="true">
              <svg viewBox="0 0 36 36" fill="none">
                <path
                  d="M25 10a11 11 0 1 0 0 16"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="25" cy="18" r="3" fill="currentColor" />
              </svg>
            </span>
            <span>
              chorono<span className="cd-brand-dot">.</span>
            </span>
            <span className="cd-docs-label">docs</span>
          </Link>
          <nav className="cd-top-nav" aria-label="Main navigation">
            <Link
              href="/docs"
              className={
                pathname.startsWith("/docs") ? "cd-top-active" : undefined
              }
            >
              Documentation
            </Link>
            <Link href="/docs/scripting">API reference</Link>
            <Link
              href="/animations"
              className={
                pathname.startsWith("/animations") ? "cd-top-active" : undefined
              }
            >
              Animations
            </Link>
          </nav>
          <div className="cd-header-actions">
            <button
              className="cd-search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Search documentation"
            >
              <Icon name="search" size={17} />
              <span>Search documentation</span>
              <kbd>⌘ K</kbd>
            </button>
            <a
              className="cd-icon-button cd-github"
              href="https://github.com/codie1982/chorono-editor"
              aria-label="Chorono on GitHub"
            >
              <Icon name="github" size={20} />
            </a>
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
            <a href="/getting-started" className="cd-open-editor">
              Set up editor <Icon name="arrow" size={14} />
            </a>
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
      </header>
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
