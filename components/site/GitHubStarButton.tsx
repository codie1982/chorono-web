'use client'

import { useState, useEffect } from 'react'
import { Github, Star } from 'lucide-react'
import { loadGitHubStars } from '@/lib/github-stars.mjs'
import { REPOSITORY_URL } from '@/lib/site'
import { trackAction } from '@/lib/analytics'

/** Links to GitHub; the public count does not confirm a visitor starring. */
export function GitHubStarButton() {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadGitHubStars().then(count => {
      if (!active) return;
      setStars(count);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  return (
    <a
      href={REPOSITORY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackAction('githubStar', 'header')}
      aria-label="Star Chorono on GitHub (opens in a new tab)"
      className="site-github inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 backdrop-blur"
    >
      <Github className="h-4 w-4" />
      <span>Star on GitHub</span>
      {!loading && stars !== null && (
        <>
          <span className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />
            <span className="font-semibold">{stars.toLocaleString()}</span>
          </div>
        </>
      )}
    </a>
  );
}

