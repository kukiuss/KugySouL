// KugySoul Story Engine Types

export interface StoryProject {
  id: string;
  title: string;
  createdAt: Date;
  lastModified: Date;
  
  // Core Story Elements
  genre: string;
  tone: string;
  style: string;
  braindump: string;
  synopsis: string;
  
  // Story Components
  characters: CharacterCard[];
  worldbuilding: WorldbuildingCard[];
  outline: OutlineStructure;
  
  // Current State
  currentPhase: 'brainstorming' | 'planning' | 'writing';
  hasIdea: boolean;
  selectedIdea?: string | null;
}

// Character Card Types
export interface CharacterCard {
  id: string;
  name: string;
  alias: string;
  personality: string;
  background: string;
  physicalDescription: string;
  dialogueStyle: string;
  role: 'protagonist' | 'antagonist' | 'supporting' | 'minor' | 'love-interest';
  customFields: CustomField[];
  createdAt: Date;
  lastModified: Date;
}

// Worldbuilding Card Types
export interface WorldbuildingCard {
  id: string;
  elementName: string;
  elementType: 'setting' | 'organization' | 'knowledge' | 'key-event' | 'clue' | 'magic-system' | 'item' | 'technology' | 'culture' | 'other';
  alias: string;
  description: string;
  customFields: CustomField[];
  createdAt: Date;
  lastModified: Date;
}

// Outline Structure
export interface OutlineStructure {
  parts: OutlinePart[];
}

export interface OutlinePart {
  id: string;
  title: string;
  description: string;
  chapters: ChapterCard[];
  order: number;
}

// Chapter Card Types
export interface ChapterCard {
  id: string;
  title: string;
  partId: string;
  order: number;
  
  // Chapter Content Options
  roughDraft: string;
  openings: string[]; // 3 opening paragraphs
  ideas: string[];
  
  // Chapter Settings
  format: 'standard' | 'dialogue-heavy' | 'action-heavy' | 'descriptive';
  
  // Status
  isComplete: boolean;
  wordCount: number;
  createdAt: Date;
  lastModified: Date;
}

// Custom Fields for extensibility
export interface CustomField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[]; // for select type
}

// Brainstorming Types
export interface BrainstormingSession {
  selectedGenre: string;
  selectedStoryIdea: string;
  generatedSynopsis: string;
  generatedCharacters: CharacterCard[];
  generatedOutline: OutlineStructure;
}

export interface StoryIdea {
  id: string;
  title: string;
  description: string;
  genre: string;
  premise: string;
}

// Genre and Style Options
export const GENRES = [
  'Romance',
  'Fantasy',
  'Science Fiction',
  'Mystery',
  'Thriller',
  'Horror',
  'Historical Fiction',
  'Contemporary Fiction',
  'Young Adult',
  'Adventure',
  'Drama',
  'Comedy'
] as const;

export const TONES = [
  'Light and Humorous',
  'Dark and Serious',
  'Romantic and Emotional',
  'Suspenseful and Tense',
  'Mysterious and Intriguing',
  'Epic and Heroic',
  'Intimate and Personal',
  'Satirical and Witty'
] as const;

export const STYLES = [
  'First Person',
  'Third Person Limited',
  'Third Person Omniscient',
  'Multiple POV',
  'Epistolary (Letters/Documents)',
  'Stream of Consciousness'
] as const;

export type Genre = typeof GENRES[number];
export type Tone = typeof TONES[number];
export type Style = typeof STYLES[number];