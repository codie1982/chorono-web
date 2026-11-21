import { GitHubExitPrompt } from '@/components/tutorial/GitHubExitPrompt'
import '@/components/tutorial/tutorial.css'

/** Keep one exit-intent invitation mounted across the entire blog. */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<GitHubExitPrompt /></>
}
