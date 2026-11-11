"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { documentationHref, documentationPages, type DocumentationPage } from "@/lib/documentation/manifest";
import { documentationChildren, documentationAncestors } from "@/lib/documentation/hierarchy";
import { documentationSections } from "@/lib/documentation/sections";
import { DocumentationIcon as Icon } from "./DocumentationIcon";

/** Each parent remains a real overview link inside a native disclosure. All
 * child links are server rendered, including when the branch is collapsed. */
function NavigationBranch({ page, active, onNavigate }: { page: DocumentationPage; active?: DocumentationPage; onNavigate?: () => void }) {
  const children = documentationChildren(page);
  const link = (label: string) => <Link href={documentationHref(page.slug)} onClick={onNavigate}
    aria-current={active?.slug === page.slug ? "page" : undefined}><span className="cd-nav-indicator" />{label}</Link>;
  if (!children.length) return link(page.label);
  const expanded = active?.slug === page.slug || !!active && documentationAncestors(active).some(parent => parent.slug === page.slug);
  return <details className="cd-nav-branch" open={expanded}>
    <summary><span>{page.label}</span><Icon name="chevron" size={12} /></summary>
    <div className="cd-nav-group cd-nav-children">{link("Overview")}
      {children.map(child => <NavigationBranch key={child.slug} page={child} active={active} onNavigate={onNavigate} />)}
    </div>
  </details>;
}

/**
 * Crawlable section navigation shared by the desktop rail and mobile dialog.
 * Native disclosures support keyboard/touch; each route opens its own section.
 * Article URLs remain independent of the visual grouping and ordering.
 */
export function DocumentationNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = documentationPages.find(page => documentationHref(page.slug) === pathname);
  return <nav className="cd-navigation" aria-label="Documentation">
    {documentationSections.map(section => {
      const pages = documentationPages.filter(page => page.section === section.id && page.parentSlug === undefined);
      const groups = Array.from(new Set(pages.map(page => page.group)));
      return <details key={`${section.id}:${pathname}`} className="cd-nav-section" open={active?.section === section.id}>
        <summary><span>{section.label}</span><Icon name="chevron" size={13} /></summary>
        <div className="cd-nav-section-content">
          {groups.map(group => <div className="cd-nav-group" key={group}>
            {groups.length > 1 && <h2>{group}</h2>}
            {pages.filter(page => page.group === group).map(page => <NavigationBranch key={page.slug} page={page} active={active} onNavigate={onNavigate} />)}
          </div>)}
        </div>
      </details>;
    })}
    <div className="cd-nav-group cd-nav-external">
      <h2>Keep exploring</h2>
      <Link href="/animations" onClick={onNavigate}>Animation library <Icon name="arrow" size={13} /></Link>
      <Link href="/blog" onClick={onNavigate}>Examples & guides <Icon name="arrow" size={13} /></Link>
      <a href="https://github.com/codie1982/chorono-editor">GitHub repository <Icon name="external" size={13} /></a>
    </div>
  </nav>;
}
