import type { Metadata } from "next";
import { loadDocumentationSearch } from "@/lib/documentation/loader";
import { DocumentationShell } from "@/components/documentation/DocumentationShell";
import { LoadingMetrics } from "@/components/documentation/LoadingMetrics";
import { contentPublicationMetadata } from "@/lib/site-index/publication";
import "./docs.css";
import "./navigation.css";

/** Local docs preview: public indexing is enabled only in the website release. */
export const metadata: Metadata = {
  title: {
    default: "Chorono Docs: Editable 2D Animation Guides",
    template: "%s | Chorono Docs",
  },
  description:
    "Learn Chorono with editable animation examples, practical guides and AI agent workflows.",
  ...contentPublicationMetadata(),
};

/** Load the search index once per server render while keeping article HTML on the server. */
export default async function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const search = await loadDocumentationSearch();
  return (
    <DocumentationShell search={search}>
      {children}
      <LoadingMetrics />
    </DocumentationShell>
  );
}
