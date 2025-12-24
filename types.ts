
export type RoundType = 'unknown' | 'live' | 'blank';

export interface Slot {
  id: string;
  type: RoundType;
  isFired: boolean;
}

export interface GameState {
  initialLive: number;
  initialBlank: number;
  slots: Slot[];
  isStarted: boolean;
}

export interface HistoryEntry {
  id: number;
  timestamp: string;
  live: number;
  blank: number;
  roundsFired: number;
  totalRounds: number;
}
