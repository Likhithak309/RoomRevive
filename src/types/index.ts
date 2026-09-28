export type RoomType =
  | 'Bedroom'
  | 'Living Room'
  | 'Study Room'
  | 'Gaming Room'
  | 'Dining Room'
  | 'Other';

export type DesignStyle =
  | 'Minimal'
  | 'Modern'
  | 'Cozy'
  | 'Scandinavian'
  | 'Luxury'
  | 'Industrial'
  | 'Japandi'
  | 'Bohemian';

export type TransformationGoal =
  | 'Make it look better'
  | 'Make it feel bigger'
  | 'Improve study/work setup'
  | 'Add more storage'
  | 'Make it cozier'
  | 'Create a luxury look'
  | 'Improve lighting';

export type ColorPreference =
  | 'Neutral'
  | 'Warm'
  | 'Cool'
  | 'Earthy'
  | 'Dark'
  | 'Bright';

export interface ColorSwatch {
  name: string;
  hex: string;
  role: string;
}

export interface RecommendationSection {
  title: string;
  description: string;
  palette?: ColorSwatch[];
  fixtures?: string[];
  items?: string[];
  retainedPlacement?: string;
  suggestedAdditions?: string[];
  tips?: string[];
}

export interface BudgetItem {
  item: string;
  cost: number;
  category: string;
  note: string;
}

export interface MakeoverDay {
  day: number;
  title: string;
  description: string;
  timeCommitment: string;
  priority: string;
  completed?: boolean;
}

export interface AlternativeStyle {
  styleId: string;
  name: string;
  tag: string;
  whyItWorks: string;
}

export interface RoomPreAnalysis {
  detectedRoomType: string;
  detectedFurniture: string[];
  currentLighting: string;
  clutterLevel: string;
  layoutStrengths: string;
  spatialOpportunities: string;
  detectedPalette: string[];
}

export interface ReviveResult {
  id: string;
  createdAt: string;
  designName: string;
  roomType: RoomType;
  style: DesignStyle | string;
  budget: number;
  estimatedTotal: number;
  spaceOptimization: string;
  explanation: string;
  originalImageUrl: string;
  redesignedImageUrl: string | null;
  isConceptVisualization: boolean;
  detectedRoomAnalysis: {
    roomType: string;
    furniture: string[];
    layout: string;
    lighting: string;
    clutter: string;
    improvements: string[];
  };
  recommendations: {
    color: RecommendationSection;
    lighting: RecommendationSection;
    decor: RecommendationSection;
    furniture: RecommendationSection;
    storage: RecommendationSection;
  };
  budgetBreakdown: BudgetItem[];
  makeoverPlan: MakeoverDay[];
  alternativeStyles: AlternativeStyle[];
  visualPrompt: string;
  userInputs: {
    roomType: RoomType;
    style: DesignStyle;
    budget: number;
    keptFurniture: string[];
    customKept: string;
    goal: TransformationGoal;
    colorPref: ColorPreference;
    customColor: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  roomType: string;
  style: string;
  budget: string;
  beforeImage: string;
  afterImage: string;
  keyChanges: string;
  timeSpent: string;
}
