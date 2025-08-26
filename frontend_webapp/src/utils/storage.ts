import type { AppState, Note } from "../types";

const STORAGE_KEY = "note-video-manager/state/v1";

const defaultState: AppState = {
  notes: [],
  selectedId: null,
  search: "",
  showTrash: false,
  sortBy: "updated",
  sortDir: "desc",
};

export function loadState(): AppState {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as AppState;
    // Basic migration/validation
    if (!parsed.notes) parsed.notes = [];
    if (typeof parsed.search !== "string") parsed.search = "";
    if (typeof (parsed as any).showTrash !== "boolean") parsed.showTrash = false;
    if (parsed.sortBy !== "updated" && parsed.sortBy !== "created" && parsed.sortBy !== "title") {
      parsed.sortBy = "updated";
    }
    if (parsed.sortDir !== "asc" && parsed.sortDir !== "desc") parsed.sortDir = "desc";
    return parsed;
  } catch {
    return defaultState;
  }
}

export function saveState(state: AppState) {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function createNote(): Note {
  const now = Date.now();
  const id = `note_${now}_${Math.random().toString(36).slice(2, 8)}`;
  return {
    id,
    title: "Untitled",
    content: "",
    createdAt: now,
    updatedAt: now,
    video: null,
    deletedAt: null,
  };
}
