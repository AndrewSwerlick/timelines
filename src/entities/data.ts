export interface Timeline {
  id: string;
  momentIds: string[];
}

export interface Moment {
  id: string;
  parentId?: string;
  branchPointId?: string;
  featIds: string[];
  narrative?: string;
  events: string[];
  // fixed: boolean
  title?: string;
  timelineId: string;
}

export interface BranchPoint {
  id: string;
  sourceTimelineId: string;
  branches: { timelineId: string; momentId: string }[];
}

export interface UIState {
  currentTimelineId?: string;
}

export interface Card {
  cardType: "fortune" | "failure";
  id: string;
  description: string;
  tier: number;
}

export interface Feat {
  card_id?: string;
  featType: "knowledge" | "cunning" | "stealth" | "strength";
  description: "string";
  result?: "success" | "failure";
  roll?: number;
  bonsus?: number;
  characterRole: "scholar" | "solider" | "snake" | "shadow";
}

export interface Deck {
  card_ids: string[];
}
