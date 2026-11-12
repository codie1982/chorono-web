import type { Metadata } from "next";
import { LoadingMetrics } from "@/components/documentation/LoadingMetrics";
import { contentPublicationMetadata } from "@/lib/site-index/publication";
import "../docs/docs.css";
import "./library.css";

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

/** Collection pages share the root site frame and reader tokens. They keep
 * their own collection navigation, without mounting the documentation sidebar. */
export default function AnimationLibraryLayout({ children }: { children: React.ReactNode }) {
  return <div className="cd-site al-site">{children}<LoadingMetrics /></div>;
}
