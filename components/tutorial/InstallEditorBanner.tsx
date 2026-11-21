import { TutorialAction } from './TutorialAction'
import './tutorial.css'

export function InstallEditorBanner({ installed = false, placement = 'codex-example', context = 'example' }: { installed?: boolean; placement?: string; context?: 'example' | 'documentation' }) {
  const documentation = context === 'documentation'
  return <aside className="tutorial-install" aria-label={installed ? 'Your next animation step' : 'Install the free editor'}>
    <img className="tutorial-install-art" src="/tutorial/install-world-v1.jpg" width={2172} height={724} alt="" aria-hidden="true" loading="lazy" decoding="async" />
    <div className="tutorial-install-content"><div><p className="tutorial-eyebrow">{installed ? 'READY FOR YOUR FIRST EDIT?' : documentation ? 'FROM THE GUIDE TO THE CANVAS' : 'MAKE THIS ANIMATION YOURS'}</p><h3>{installed ? 'Open a project. Change something.' : documentation ? 'Put these ideas in motion.' : 'Keep every layer editable.'}</h3>
      <p>{installed ? 'Try the Codex walkthrough, or edit a project by hand with the first-animation guide.' : documentation ? 'Install the free, open-source editor and use these guides to create an animation you can keep editing.' : 'Run the free, open-source editor on your computer, then open this project and try the revision.'}</p></div>
    <div className="tutorial-install-actions">
      <TutorialAction primary href={installed ? '/docs/first-animation' : '/getting-started'} placement={placement}>{installed ? 'Make your first edit' : 'Install the free editor'}</TutorialAction>
      <TutorialAction href={installed ? '/blog/make-animations-with-codex#animation-example' : '/docs/first-animation'} placement={`${placement}-next`}>{installed ? 'Follow the Codex example' : documentation ? 'Try your first animation' : 'Already installed? Start editing'}</TutorialAction>
    </div>
    </div>
  </aside>
}
