export type ExperienceLevel = 'beginner' | 'intermediate' | 'creator' | 'musician' | 'pro';

export type HelpGoal = 'learn' | 'growth' | 'revenue' | 'ideas' | 'posts' | 'music_distro';

export type PlatformId =
  | 'tiktok'
  | 'instagram'
  | 'shorts'
  | 'youtube'
  | 'x'
  | 'linkedin'
  | 'facebook'
  | 'threads'
  | 'pinterest'
  | 'telegram'
  | 'whatsapp';

export type CareerRouteId =
  | 'route_zero_to_hero'       // 0-Ahnung Einsteiger (Kompletter Start von Null)
  | 'route_suno_producer'       // Musikproduzent, DJ & Suno AI Artist
  | 'route_faceless_autopilot'  // Faceless Video & Repurposing Autopilot
  | 'route_personal_authority'  // Personal Brand, Coach & B2B Creator
  | 'route_viral_entertainer'   // Kurzvideo Viralist (Humor, Gaming, Lifestyle)
  | 'route_digital_merchant';   // Sample Packs, Templates & Direct Commerce

export type MusicGenreId =
  | 'phonk_drift'              // Phonk / Drift Bass / Cowbell
  | 'melodic_techno_house'     // Melodic Techno / Deep / Peak-Time House
  | 'lofi_chillhop'            // Lo-Fi Beats / Study / Chillout
  | 'drill_trap'               // UK/NY Drill & Heavy 808 Trap
  | 'hyperpop_cyber'           // Hyperpop / Glitch / Digicore
  | 'synthwave_retro'          // 80s Synthwave / Outrun / Retrowave
  | 'hardstyle_rave'           // Hard Techno / Rave / Schranz
  | 'cinematic_ambient';       // Epic Soundtrack / Gaming / Ambient

export interface GenreAlgorithmWeights {
  completionImportance: number; // 0 - 100
  loopReplayImportance: number; // 0 - 100
  commentDiscussionImportance: number; // 0 - 100
  shareSaveImportance: number; // 0 - 100
  dropWindowSeconds: number; // optimal drop timestamp e.g. 2.4s or 3.2s
  recommendedLufsMaster: number; // e.g. -14 LUFS streaming vs -9 LUFS club
  monoCutoffHz: number; // e.g. 100Hz or 120Hz
}

export interface MusicGenreSpec {
  id: MusicGenreId;
  name: string;
  icon: string;
  badge: string;
  bpmRange: string;
  primaryKeySignatures: string[];
  viralPlatforms: PlatformId[];
  audienceDemographic: string;
  sunoMasterPromptTemplate: string;
  dawMixChainGuide: string[];
  algorithmWeights: GenreAlgorithmWeights;
  viralVideoConcept: string;
  monetizationPathway: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  linkInBio: string;
  experienceLevel: ExperienceLevel;
  primaryGoal: HelpGoal;
  niche: string;
  musicGenre: MusicGenreId;
  weeklyHours: number;
  activePlatforms: PlatformId[];
  isMusician: boolean;
  musicTools: {
    usesSuno: boolean;
    usesDistroKid: boolean;
    usesBandLab: boolean;
    usesSpotify: boolean;
  };
  monetizationTarget: string;
  assignedRouteId: CareerRouteId;
  currentPhaseIndex: number;
  ownedAudienceGoal: number;
}

export interface ToolItem {
  name: string;
  category: 'Content' | 'KI' | 'Musik' | 'Links' | 'Analyse' | 'Planung' | 'SEO' | 'Transkript';
  desc: string;
  pricing: string;
  url: string;
  tip?: string;
}

export interface NicheStrategy {
  id: string;
  title: string;
  icon: string;
  pillars: string[];
  audience: string;
  contentIdeas: string[];
  monetizationWays: string[];
  viralTags: string[];
  recommendedFormats: string[];
}

export interface DailyTask {
  id: string;
  title: string;
  type: 'pflicht' | 'soll' | 'extra';
  desc: string;
  done: boolean;
}

export interface WeeklyCheckinData {
  postsCount: number;
  experimentsCount: number;
  followerGrowth: number;
  linkClicks: number;
  revenueEst: number;
  notes: string;
  date: string;
}

export interface ScoreBreakdown {
  consistency: number;
  testing: number;
  growth: number;
  impact: number;
  total: number;
  recommendations: string[];
}

// Synapse Brain & Career Route Engine Types
export interface CareerBattlePlan {
  dailyChecklist: {
    duty: string;
    routine: string;
    bonus: string;
  };
  weeklySprint: {
    focusTitle: string;
    targetDeliverable: string;
    reviewMetric: string;
  };
  monthlyWarGoal: {
    targetIncome: string;
    targetFollowers: string;
    ownedAssetDeliverable: string;
  };
}

export interface SynapseNode {
  id: string;
  label: string;
  targetTabKey: string;
  category: 'content' | 'audio' | 'monetization' | 'autonomy' | 'analysis';
  description: string;
  primaryMetric: string;
  genreRelevance?: MusicGenreId[];
}

export interface CareerRoute {
  id: CareerRouteId;
  title: string;
  subtitle: string;
  badge: string;
  avatarIcon: string;
  idealForProfile: string;
  targetFocus: string;
  synapseKeys: string[];
  battlePlan: CareerBattlePlan;
  keyChecklistItems: string[];
  dangerTrapWarning: string;
  nextMilestoneUnlocked: string;
}

// Script Studio Types
export interface ScriptScene {
  id: string;
  timeRange: string;
  secondsDuration: number;
  stage: 'Hook' | 'Problem/Setup' | 'Proof/Value' | 'Action/CTA';
  spokenText: string;
  visualCue: string;
  audioSfx: string;
  bRollInstruction: string;
}

export interface VideoScript {
  id: string;
  title: string;
  targetDuration: 15 | 30 | 60;
  nicheId: string;
  hookCategory: string;
  scenes: ScriptScene[];
}

// Trend Radar Types
export type TrendCategory = 'audio' | 'youtube_search' | 'hook_pattern';

export interface TrendItem {
  id: string;
  category: TrendCategory;
  title: string;
  velocity: string;
  velocityLevel: 'breakout' | 'rising' | 'evergreen';
  nichePillar: string;
  platform: 'TikTok' | 'YouTube' | 'Instagram' | 'Multi';
  description: string;
  actionSnippet: string;
  metrics: {
    volume: string;
    competition: 'Niedrig' | 'Mittel' | 'Hoch';
  };
}

// Music Release Calendar Types
export interface ReleaseMilestone {
  id: string;
  phaseDays: number;
  phaseLabel: string;
  category: 'production' | 'distrokid' | 'spotify' | 'marketing' | 'post_release';
  title: string;
  description: string;
  targetDate: string;
  isCompleted: boolean;
  priority: 'must' | 'recommended';
}

export interface MusicReleaseConfig {
  trackTitle: string;
  artistName: string;
  genre: string;
  releaseDate: string;
  isSunoTrack: boolean;
  hasDistroKid: boolean;
  preSaveUrl: string;
}

// Carousel Builder Types
export interface CarouselSlide {
  slideNumber: number;
  role: 'Cover / Hook' | 'Problem & Agitation' | 'Core Framework' | 'Deep Dive / Step' | 'Cheat Sheet / Summary' | 'Call to Action';
  headline: string;
  subheadline: string;
  bulletPoints: string[];
  visualDesignNote: string;
  layoutTemplate: 'bold-title' | 'split-card' | 'checklist' | 'comparison' | 'stat-callout' | 'cta-final';
}

export interface CarouselDocument {
  id: string;
  title: string;
  platform: 'Instagram' | 'LinkedIn';
  slideCount: number;
  colorTheme: 'dark-neon' | 'clean-white' | 'editorial-warm' | 'coral-vibrant';
  slides: CarouselSlide[];
}

// EPK Generator Types
export interface EpkProfile {
  artistName: string;
  genre: string;
  hometown: string;
  tagline: string;
  shortBio: string;
  fullBio: string;
  monthlyListeners: number;
  totalStreams: string;
  socialFollowers: string;
  pressQuotes: { source: string; quote: string }[];
  featuredTracks: {
    id: string;
    title: string;
    bpm: number;
    key: string;
    duration: string;
    streamCount: string;
    isSunoCoProduced: boolean;
  }[];
  bookingEmail: string;
  managementContact: string;
  riderRequirements: string[];
}

// Hook A/B Split-Tester Types
export interface HookVariant {
  id: string;
  name: string;
  hookText: string;
  visualConcept: string;
  soundCue: string;
  targetTrigger: 'curiosity' | 'loss_aversion' | 'social_proof' | 'taboo_contrarian' | 'hyper_specific';
  predictedStopRate: number;
  retentionScore: number;
  pros: string[];
  weaknesses: string[];
}

// Sample Pack & Digital Store Types
export interface SampleTrackPreview {
  id: string;
  title: string;
  category: 'Kicks & 808s' | 'Melodic Loops' | 'Serum Presets' | 'MIDI Chord Stacks' | 'Vocal Chops';
  bpm: number;
  key: string;
  duration: string;
  filesize: string;
}

export interface SamplePackTier {
  id: string;
  name: string;
  price: number;
  badge?: string;
  features: string[];
  includedItems: string;
  isPopular?: boolean;
}

export interface SamplePackBundle {
  id: string;
  title: string;
  tagline: string;
  coverBadge: string;
  totalSamplesCount: number;
  totalMidiCount: number;
  totalPresetsCount: number;
  totalSizeMb: number;
  compatibility: string[];
  licenseType: string;
  audioPreviews: SampleTrackPreview[];
  tiers: SamplePackTier[];
}

// Revenue Forecast Types
export interface RevenueForecastInputs {
  monthlyStreams: number;
  streamPpsRate: number;
  socialFollowing: number;
  patreonMembers: number;
  patreonTierPrice: number;
  monthlyVideoViews: number;
  brandDealsCount: number;
  brandCpmAverage: number;
  samplePackMonthlySales: number;
  samplePackPriceAvg: number;
  affiliateClicksMonthly: number;
  affiliateCommissionAvg: number;
  tiktokAudienceInterestTier: 'Broad (Mass Appeal)' | 'Mid-Tier (General Music/Tech)' | 'Micro-Niche (Specific DAW/Genre)';
  tiktokCompletionRatePercent: number;
  tiktokCommentQualityRatio: 'High (Discussions & Replies)' | 'Medium (Standard Emojis)' | 'Low (Few Reactions)';
  tiktokTrendVelocityMultiplier: number;
}

export interface RevenueStreamBreakdown {
  channel: string;
  grossAmount: number;
  sharePercent: number;
  color: string;
  benchmarkTip: string;
}

// Creator Collaboration Finder Types
export interface CreatorCollaborator {
  id: string;
  name: string;
  handle: string;
  avatarInitials: string;
  niche: string;
  primaryPlatform: 'TikTok' | 'YouTube' | 'Instagram' | 'Spotify';
  audienceSize: '1k-10k' | '10k-50k' | '50k-150k' | '150k+';
  followerCountLabel: string;
  preferredDaw: 'Ableton Live' | 'FL Studio' | 'Logic Pro' | 'BandLab' | 'Bitwig';
  vibeGenres: string[];
  collabPitchMatch: string;
  strengths: string[];
  openFor: ('Remix Swap' | 'Co-Production' | 'Joint Short-Form' | 'Sample Flip Challenge' | 'Podcast Guest')[];
}

// Sound Licensing & Sync Contract Types
export type LicenseTierType = 'non_exclusive_standard' | 'exclusive_commercial' | 'sync_film_tv';

export interface SyncContractConfig {
  trackTitle: string;
  artistLegalName: string;
  licenseeName: string;
  licenseeProject: string;
  licenseType: LicenseTierType;
  upfrontFee: number;
  masterSharePercent: number;
  publishingSharePercent: number;
  territory: 'Worldwide' | 'Europe' | 'Digital Platforms Only';
  termDuration: '1 Year' | '5 Years' | 'In Perpetuity';
  cueSheetData: {
    isrc: string;
    iswc: string;
    proAffiliation: 'GEMA' | 'BMI' | 'ASCAP' | 'PRS' | 'None';
    composerName: string;
    publisherName: string;
    cueUsageType: 'Theme' | 'Background Vocal' | 'Background Instrumental' | 'End Credits';
  };
}

// Video Storyboard Studio Types
export type FramingType = 'Extreme Close-Up' | 'Close-Up' | 'Medium Shot' | 'Wide Shot' | 'Over-the-Shoulder' | 'POV / Screen Recording';
export type CameraMotion = 'Static Locked-Off' | 'Fast Whip Pan' | 'Slow Push-In / Zoom' | 'Tracking Gimbal' | 'Snap Cut / Glitch';
export type LightingSetup = 'Ring Light Warm (High Key)' | 'Neon Cyberpunk (Red/Cyan Split)' | 'Natural Daylight Window' | 'Moody Rim Light (Low Key)';

export interface StoryboardFrame {
  id: string;
  frameNumber: number;
  timeRange: string;
  durationSeconds: number;
  framing: FramingType;
  cameraMotion: CameraMotion;
  lighting: LightingSetup;
  visualAction: string;
  dialogueVoiceover: string;
  audioCue: string;
  thumbnailPlaceholderColor: string;
}

// Viral Challenge & Contest Builder Types
export interface ContestPrizeTier {
  place: '1. Platz' | '2. Platz' | '3. Platz' | 'Community Ehrenpreis';
  reward: string;
  valueEst: string;
}

export interface ContestSubmission {
  id: string;
  handle: string;
  avatar: string;
  postLink: string;
  views: number;
  likes: number;
  shares: number;
  status: 'In Review' | 'Finalist' | 'Winner';
  audioSnippetName: string;
}

export interface ViralContestConfig {
  title: string;
  campaignHashtag: string;
  soundTitle: string;
  coreHookChallenge: string;
  durationDays: number;
  rules: string[];
  prizes: ContestPrizeTier[];
  announcementScript: string;
}

// Competitor & Trend Heatmap Types
export interface CompetitorProfile {
  id: string;
  handle: string;
  platform: 'TikTok' | 'Instagram' | 'YouTube';
  niche: string;
  followers: string;
  avgViews: string;
  viralScore: number;
  topHookPattern: string;
  peakHour: string;
  postingFrequency: string;
  fatigueRisk: 'Gering' | 'Mittel' | 'Kritisch (Spam)';
  winningFormats: string[];
}

export interface PostingTimeHeatCell {
  day: 'Mo' | 'Di' | 'Mi' | 'Do' | 'Fr' | 'Sa' | 'So';
  hour: number;
  intensity: number;
}

// TikTok Viral Audit (2026 Rules) Types
export interface TikTokViralAuditDraft {
  hookText: string;
  visualHookDescription: string;
  coreTopic: string;
  topicInterestSize: 'Broad Mass Interest' | 'Mid-Tier Category' | 'Ultra-Niche Technical';
  plannedDurationSeconds: number;
  callToActionQuestion: string;
  isTrendBased: boolean;
  trendAgeHours: number;
  pacingType: 'Rapid Cut (< 1.5s)' | 'Smooth Flow' | 'Slow Monologue';
}

export interface TikTokViralAuditScore {
  totalScore: number;
  verdict: 'Sofort viral-ready 🚀' | 'Solide mit Feinschliff ⚠️' | 'Gefahr von Shadow-Drop ❌';
  audienceInterestScore: number;
  completionProbabilityScore: number;
  commentDepthScore: number;
  trendWindowScore: number;
  fatigueRiskAlert: string | null;
  automatedFixes: string[];
}

// AI Audio Remixer & Stem Lab Types
export interface StemChannel {
  id: string;
  name: string;
  color: string;
  volume: number;
  isMuted: boolean;
  isSolo: boolean;
  activeFx: string[];
}

export interface AudioRemixPreset {
  id: string;
  title: string;
  genreVibe: string;
  pitchSemitones: number;
  bpm: number;
  loopCutStartSec: number;
  loopCutEndSec: number;
  loopDurationSec: number;
  reverbDecaySec: number;
  filterLowCutHz: number;
  ottCompressionPercent: number;
  recommendedTikTokLoopHook: string;
}

// Transcript to Viral Clip Types (100% Free Autonomy Pipeline)
export interface ExtractedViralClip {
  id: string;
  clipNumber: number;
  title: string;
  targetDuration: 15 | 30 | 60;
  viralAngle: 'Kontroverse & Tabubruch' | 'Praxis-Hack & Lösung' | 'Story & Transformation' | 'Schneller Aha-Moment';
  hookSpoken: string;
  hookOnScreenText: string;
  coreSpokenText: string;
  callToAction: string;
  bRollPrompts: string[];
  capcutCaptionDraft: string;
  teleprompterDurationEstSec: number;
  autonomyChecklist: string[];
}

export interface AutonomyWorkflowStep {
  stepNr: number;
  title: string;
  toolName: string;
  is100PercentFree: boolean;
  freeLimitExplanation: string;
  actionGuidance: string;
  directUrl: string;
}

// Advanced Transcript Soundbite & Multi-Platform Adaptation Types
export interface SoundbiteAdaptation {
  tiktok: string;
  reels: string;
  shorts: string;
}

export interface TranscriptSoundbite {
  id: string;
  title: string;
  originalSnippet: string;
  retentionScore: number;
  pacingWpm: number;
  estimatedSeconds: number;
  hookPatternType: string;
  adaptations: SoundbiteAdaptation;
  capcutMarkers: {
    timestamp: string;
    captionText: string;
    highlightWord: string;
    bRollPrompt: string;
  }[];
}

// Creator Autonomy & De-Platforming Risk Types
export interface AutonomyMilestone {
  id: string;
  stageNr: 1 | 2 | 3 | 4;
  stageName: string;
  title: string;
  description: string;
  freeToolsUsed: string[];
  isCompleted: boolean;
  impactOnAutonomy: 'Fundament' | 'Eigenbesitz (Leads)' | 'Risiko-Absicherung' | 'Direkter Cashflow';
}

export interface PlatformRiskGaugeInputs {
  followersOnRentedPlatforms: number;
  emailSubscribersOwned: number;
  recurringDirectRevenuePercent: number;
  hasSelfHostedDomain: boolean;
  hasOwnPaymentCheckout: boolean;
  hasDirectCommunity: boolean;
}

// Thumbnail A/B Studio Types
export interface ThumbnailDiagnostic {
  contrastRatio: number;
  contrastGrade: 'AAA (Exzellent)' | 'AA (Gut)' | 'Fail (Zu geringer Kontrast)';
  focalPointScore: number;
  textReadabilityScore: number;
  curiosityScore: number;
  mobileSquintScore: number;
  totalCtrScore: number;
  diagnosticTips: string[];
}

export interface ThumbnailVariant {
  id: string;
  label: string;
  ratio: '16:9 (YouTube)' | '9:16 (TikTok/Reels)';
  headlineText: string;
  subtext?: string;
  textColor: string;
  strokeColor: string;
  strokeWidth: number;
  fontFamily: 'Impact / Ultra-Bold' | 'Montserrat Black' | 'Bebas Neue' | 'Cinematic Sans';
  fontSizePt: number;
  badgeTag: string;
  badgeColor: string;
  backgroundTheme: 'dark-cyber' | 'studio-glow' | 'contrast-amber' | 'bold-crimson';
  customImageUri?: string;
  faceEmotion: 'Shocked / Open Mouth' | 'Confident / Focused' | 'Curious / Smirk' | 'No Face / Product Only';
  visualElements: string[];
  predictedCtrPercent: number;
  diagnostics: ThumbnailDiagnostic;
  aiPromptIdea: string;
}

// Live Speech Teleprompter Types
export interface TeleprompterCadenceAnalysis {
  currentWpm: number;
  targetWpm: number;
  pacingStatus: 'Perfekt' | 'Zu Schnell (Überhastet)' | 'Zu Langsam (Retention-Verlust)';
  roboticCadenceWarning: boolean;
  confidenceScore: number;
  voicePitchVariance: 'Dynamisch & Energetisch' | 'Monoton (Einschlaf-Gefahr)' | 'Zu leise';
  lastSpokenPhrase: string;
  pacingBottlenecks: string[];
}

// Record Label vs DIY Deal Simulator Types
export interface DealComparisonInputs {
  advanceAmount: number;
  majorLabelMasterRoyaltyPercent: number;
  labelTouringMerchCutPercent: number;
  monthlyStreams: number;
  streamPayoutPer1000: number;
  monthlyPhysicalMerchIncome: number;
  labelMarketingDeductionsMonthly: number;
  catalogueValuationMultipleYears: number;
}

export interface DealTimelinePoint {
  year: string;
  major360DealCumulative: number;
  indieDistroCumulative: number;
  hybridSplitCumulative: number;
  unrecoupedDebtMajor: number;
  catalogueEquityIndie: number;
  catalogueEquityMajor: number;
}
