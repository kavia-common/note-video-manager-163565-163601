export type VideoSource = {
  type: "file" | "url";
  url: string; // blob URL for file or external URL
  name?: string; // optional file name for display
};

export type Note = {
  id: string;
  title: string;
  content: string;
  video?: VideoSource | null;
  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
  deletedAt?: number | null; // null or epoch ms
};

export type AppState = {
  notes: Note[];
  selectedId: string | null;
  search: string;
  showTrash: boolean;
  sortBy: "updated" | "created" | "title";
  sortDir: "desc" | "asc";
};
