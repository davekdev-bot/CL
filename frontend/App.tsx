import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { INITIAL_USER_PROFILE } from './constants';
import { Navbar, TabKey } from './components/Navbar';
import { CreatorVaultWorld } from './components/CreatorVaultWorld';
import { GenreNeuroEngineTab } from './components/GenreNeuroEngineTab';
import { CareerRoutesTab } from './components/CareerRoutesTab';
import { UniversalNavigatorModal } from './components/UniversalNavigatorModal';
import { ThumbnailStudioTab } from './components/ThumbnailStudioTab';
import { VoiceTeleprompterTab } from './components/VoiceTeleprompterTab';
import { DealSimulatorTab } from './components/DealSimulatorTab';
import { TranscriptPipelineTab } from './components/TranscriptPipelineTab';
import { CreatorAutonomyTab } from './components/CreatorAutonomyTab';
import { TranscriptClipsRepurposerTab } from './components/TranscriptClipsRepurposerTab';
import { ProfileTab } from './components/ProfileTab';
import { PlanTab } from './components/PlanTab';
import { PlatformHubTab } from './components/PlatformHubTab';
import { TikTokViralAuditTab } from './components/TikTokViralAuditTab';
import { CompetitorHeatmapTab } from './components/CompetitorHeatmapTab';
import { AudioRemixerTab } from './components/AudioRemixerTab';
import { RevenueForecastTab } from './components/RevenueForecastTab';
import { ScriptStudioTab } from './components/ScriptStudioTab';
import { VideoStoryboardTab } from './components/VideoStoryboardTab';
import { SyncLicensingTab } from './components/SyncLicensingTab';
import { ViralContestTab } from './components/ViralContestTab';
import { CarouselBuilderTab } from './components/CarouselBuilderTab';
import { HookSplitTesterTab } from './components/HookSplitTesterTab';
import { TrendRadarTab } from './components/TrendRadarTab';
import { GeneratorTab } from './components/GeneratorTab';
import { StrategyTab } from './components/StrategyTab';
import { ToolsTab } from './components/ToolsTab';
import { ScoreTab } from './components/ScoreTab';
import { MusicPlaybook } from './components/MusicPlaybookModal';
import { EpkGeneratorTab } from './components/EpkGeneratorTab';
import { SamplePackStoreTab } from './components/SamplePackStoreTab';
import { CollabFinderTab } from './components/CollabFinderTab';
import { AiCopilotModal } from './components/AiCopilotModal';

const STORAGE_KEY = 'creator_compass_profile_v1';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  const [activeTab, setActiveTab] = useState<TabKey>('creator_desk');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  // Global Keyboard shortcut for Universal Navigator (CMD+K or CTRL+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsNavigatorOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-800">
      {/* Top Bar with OCR styling */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        openAiModal={() => setIsAiModalOpen(true)}
        openUniversalNavigator={() => setIsNavigatorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'creator_desk' && (
          <CreatorVaultWorld
            onNavigateTab={setActiveTab}
            onOpenNavigator={() => setIsNavigatorOpen(true)}
          />
        )}

        {activeTab === 'genre_engine' && (
          <GenreNeuroEngineTab
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'career_routes' && (
          <CareerRoutesTab
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'thumbnails' && <ThumbnailStudioTab profile={profile} />}

        {activeTab === 'voice_teleprompter' && <VoiceTeleprompterTab profile={profile} />}

        {activeTab === 'deal_simulator' && <DealSimulatorTab profile={profile} />}

        {activeTab === 'transcript_pipeline' && <TranscriptPipelineTab profile={profile} />}

        {activeTab === 'autonomy_roadmap' && <CreatorAutonomyTab profile={profile} />}

        {activeTab === 'repurposer_studio' && <TranscriptClipsRepurposerTab profile={profile} />}

        {activeTab === 'profile' && (
          <ProfileTab
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onContinueToPlan={() => setActiveTab('plan')}
          />
        )}

        {activeTab === 'plan' && <PlanTab profile={profile} />}

        {activeTab === 'storyboard' && <VideoStoryboardTab profile={profile} />}

        {activeTab === 'viral_audit' && <TikTokViralAuditTab profile={profile} />}

        {activeTab === 'competitor_heatmap' && <CompetitorHeatmapTab profile={profile} />}

        {activeTab === 'audio_remixer' && <AudioRemixerTab profile={profile} />}

        {activeTab === 'revenue' && <RevenueForecastTab profile={profile} />}

        {activeTab === 'licensing' && <SyncLicensingTab profile={profile} />}

        {activeTab === 'contest' && <ViralContestTab profile={profile} />}

        {activeTab === 'samplepack' && <SamplePackStoreTab profile={profile} />}

        {activeTab === 'collab' && <CollabFinderTab profile={profile} />}

        {activeTab === 'scripts' && <ScriptStudioTab profile={profile} />}

        {activeTab === 'carousel' && <CarouselBuilderTab profile={profile} />}

        {activeTab === 'split' && <HookSplitTesterTab profile={profile} />}

        {activeTab === 'radar' && (
          <TrendRadarTab
            profile={profile}
            onSendToGenerator={() => setActiveTab('generator')}
          />
        )}

        {activeTab === 'generator' && <GeneratorTab profile={profile} />}

        {activeTab === 'strategies' && <PlatformHubTab profile={profile} />}

        {activeTab === 'tools' && <ToolsTab />}

        {activeTab === 'score' && <ScoreTab profile={profile} />}

        {activeTab === 'music' && <MusicPlaybook profile={profile} />}

        {activeTab === 'epk' && <EpkGeneratorTab profile={profile} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-6 mt-12 text-center text-xs text-neutral-400">
        <p>Creator Compass &copy; 2026 &bull; 100% Kostenloses universales Creator-Portal &bull; Alle Daten bleiben lokal in deinem Browser gespeichert</p>
      </footer>

      {/* Gemini AI Copilot Modal */}
      <AiCopilotModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        profile={profile}
      />

      {/* Universal Synapse Command Palette Modal */}
      <UniversalNavigatorModal
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
        onSelectTab={setActiveTab}
      />
    </div>
  );
};

export default App;
