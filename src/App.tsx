/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FeaturedProject,
  ProjectCaseStudy,
} from './data/content';
import { GlobalOverlays } from './components/GlobalOverlays';
import { IdeHeroSection } from './components/IdeHeroSection';
import { BuiltDifferentAndFlowSection } from './components/BuiltDifferentAndFlowSection';
import { ShowcaseAndArcSection } from './components/ShowcaseAndArcSection';
import { StillsAndOutlastSection } from './components/StillsAndOutlastSection';
import { ProfileCardAndFooter } from './components/ProfileCardAndFooter';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] =
    useState<ProjectCaseStudy | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleSelectFeaturedProject = (proj: FeaturedProject) => {
    setActiveProjectModal(proj.caseStudy);
  };

  return (
    <main className="relative bg-[#080808] text-white min-h-screen selection:bg-[#fd5200] selection:text-white overflow-x-clip">
      {/* Global Film Noise, Custom Dual-Dot Cursor, ⌘K Command Palette & Project Case Study Modal */}
      <GlobalOverlays
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        activeProjectModal={activeProjectModal}
        setActiveProjectModal={setActiveProjectModal}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Section 1: "Crafting digital experiences that Come Alive" + FrameToFullscreen macOS VS Code IDE */}
      <IdeHeroSection
        onOpenSearch={() => setSearchOpen(true)}
        onSelectProject={(proj) => setActiveProjectModal(proj)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Section 2 & 3: "Built Different." 3D Interactive Robot Stage + #fd5200 Curtain + 5 Flow-Art Chapters */}
      <BuiltDifferentAndFlowSection
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Section 4 & 5: WarpTransition + #showcase Selected Work + Sticky #FAFAFA 20-Card 3D Arc Morph */}
      <ShowcaseAndArcSection
        onSelectProject={handleSelectFeaturedProject}
      />

      {/* Section 6 & 7: PageFoldTransition + #gallery Field of Stills + Coverflow + Zoom Portal + Cyan Lamp + Flagship Projects + Kinetic Roles */}
      <StillsAndOutlastSection
        onSelectProject={handleSelectFeaturedProject}
      />

      {/* Section 8: #contact Holographic 3D Tilt Profile Card + Direct Contact Composer + Monumental Footer */}
      <ProfileCardAndFooter onOpenResume={() => setResumeOpen(true)} />

      {/* Interactive Printable / Downloadable Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </main>
  );
}
