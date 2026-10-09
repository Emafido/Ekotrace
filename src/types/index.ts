export type CulturalAssetType = 
  | 'festival' 
  | 'place' 
  | 'tradition' 
  | 'food' 
  | 'craft' 
  | 'story';

export type ClaimStatus = 
  | 'verified-community' 
  | 'verified-institution' 
  | 'unverified' 
  | 'unknown' 
  | 'conflicting';

export type VerificationType = 
  | 'community' 
  | 'institution' 
  | 'cross-referenced' 
  | 'pending';

export interface Contributor {
  id: string;
  name: string;
  roleOrAffiliation: string;
  community: string;
  avatarUrl?: string;
}

export interface Source {
  id: string;
  title: string;
  type: 'archive' | 'community' | 'institution' | 'programme' | 'oral-history' | 'field-observation';
  authorOrOrg: string;
  yearOrDate?: string;
  url?: string;
  reliabilityNote?: string;
}

export interface Evidence {
  id: string;
  title: string;
  type: 'photo' | 'document' | 'link' | 'programme' | 'audio-recording';
  url?: string;
  description: string;
  dateCaptured?: string;
}

export interface Verification {
  type: VerificationType;
  verifierName: string;
  verifierRole: string;
  verifiedDate: string;
  confidenceLevel?: 'high' | 'medium' | 'pending-review';
  verificationNotes?: string;
}

export interface CompetingPoint {
  sourceLabel: string;
  claimValue: string;
  sourceName: string;
  note?: string;
}

export interface ConflictDetails {
  description: string;
  competingPoints: CompetingPoint[];
  resolutionNote: string;
}

export interface Claim {
  id: string;
  statement: string;
  category: 'schedule' | 'location' | 'origin' | 'significance' | 'access' | 'operation' | 'tradition';
  value?: string;
  status: ClaimStatus;
  sources: Source[];
  verification: Verification;
  evidence: Evidence[];
  lastReviewedAt: string;
  conflictDetails?: ConflictDetails;
}

export interface StorySection {
  heading?: string;
  content: string;
  quote?: {
    text: string;
    attribution: string;
  };
  image?: {
    url: string;
    caption: string;
    alt: string;
  };
}

export interface EditorialStory {
  introduction: string;
  sections: StorySection[];
}

export interface CulturalFacts {
  when: string;
  where: string;
  visitorAccess: string;
  category: string;
}

export type CulturalImage = {
  src: string;
  alt: string;
  credit?: string;
  sourceUrl?: string;
  license?: string;
  type: 'documentary' | 'illustrative';
  objectPosition?: string;
};

export interface CulturalAsset {
  id: string;
  slug: string;
  name: string;
  type: CulturalAssetType;
  location: string;
  neighborhood: string;
  summary: string;
  story: EditorialStory;
  coverImage: string;
  coverImageAlt: string;
  coverImagePosition?: string;
  image?: CulturalImage;
  galleryImages?: { url: string; caption: string }[];
  facts: CulturalFacts;
  claims: Claim[];
  overallVerification: 'verified-community' | 'verified-institution' | 'unverified' | 'conflicting';
  contributor?: Contributor;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  happeningNow?: boolean;
  eventDate?: string;
  eventStatus?: string;
}

export interface ContributionEvidenceItem {
  id: string;
  name: string;
  type: 'photo' | 'link' | 'document';
  url?: string;
}

export interface ExtractedClaimItem {
  id: string;
  title: string;
  statement: string;
  status: 'confirmed' | 'unknown' | 'needs-clarification';
  clarificationPrompt?: string;
  value?: string;
  isUnknown?: boolean;
}

export interface ContributionSubmission {
  id: string;
  assetTitle: string;
  category: CulturalAssetType;
  rawText: string;
  location: string;
  evidence: ContributionEvidenceItem[];
  extractedClaims: ExtractedClaimItem[];
  knowledgeOwner: 'My community' | 'An organisation' | 'Public/general information' | '';
  publicDisplayPermission: 'Yes' | "I'm unsure" | '';
  submittedBy: string;
  status: 'draft' | 'under-review' | 'verified';
  createdAt: string;
}
