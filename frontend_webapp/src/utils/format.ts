import type { Note } from "../types";

export function formatDate(ts: number | undefined | null) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleString();
}

export function filterAndSortNotes(
  notes: Note[],
  search: string,
  showTrash: boolean,
  sortBy: "updated" | "created" | "title",
  sortDir: "asc" | "desc"
): Note[] {
  const filtered = notes.filter((n) =>
    showTrash ? !!n.deletedAt : !n.deletedAt
  ).filter((n) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
    );
  });

  const sorted = filtered.sort((a, b) => {
    let va: string | number = 0;
    let vb: string | number = 0;
    if (sortBy === "updated") {
      va = a.updatedAt;
      vb = b.updatedAt;
    } else if (sortBy === "created") {
      va = a.createdAt;
      vb = b.createdAt;
    } else {
      va = a.title.toLowerCase();
      vb = b.title.toLowerCase();
    }
    if (va < vb) return sortDir === "asc" ? -1 : 1;
    if (va > vb) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  return [...sorted];
}
