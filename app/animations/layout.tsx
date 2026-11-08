import type { Metadata } from "next";
import localFont from "next/font/local";
import { DocumentationShell } from "@/components/documentation/DocumentationShell";
import { LoadingMetrics } from "@/components/documentation/LoadingMetrics";
import { loadDocumentationSearch } from "@/lib/documentation/loader";
import { contentPublicationMetadata } from "@/lib/site-index/publication";
import "../docs/docs.css";
import "./library.css";

const geist = localFont({
  src: "../../public/fonts/GeistVF.woff",
  display: "swap",
  variable: "--cd-font",
});

/** Local library preview; public canonical URLs and sitemap belong to the website release. */
export const metadata: Metadata = {
  title: {
    default: "Editable animation examples | Chorono",
    template: "%s | Chorono Animations",
  },
  description:
    "Preview and download editable Chorono animations, then follow the linked guides to make them yours.",
  ...contentPublicationMetadata(),
};

/** Reuse the docs navigation, theme and search without duplicating their lifecycle. */
export default async function AnimationLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={geist.variable}>
      <DocumentationShell search={await loadDocumentationSearch()}>
        {children}
        <LoadingMetrics />
      </DocumentationShell>
    </div>
  );
}
