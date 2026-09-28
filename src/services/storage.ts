import { ReviveResult } from '../types';

const STORAGE_KEY = 'roomrevive_saved_designs';

export function getSavedDesigns(): ReviveResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read saved designs from localStorage', e);
    return [];
  }
}

export function saveDesign(design: ReviveResult): boolean {
  try {
    const designs = getSavedDesigns();
    const existingIndex = designs.findIndex((d) => d.id === design.id);
    if (existingIndex >= 0) {
      designs[existingIndex] = design;
    } else {
      designs.unshift(design);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
    return true;
  } catch (e) {
    console.error('Failed to save design to localStorage', e);
    return false;
  }
}

export function deleteDesign(id: string): boolean {
  try {
    const designs = getSavedDesigns().filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
    return true;
  } catch (e) {
    console.error('Failed to delete design from localStorage', e);
    return false;
  }
}

export function isDesignSaved(id: string): boolean {
  const designs = getSavedDesigns();
  return designs.some((d) => d.id === id);
}
