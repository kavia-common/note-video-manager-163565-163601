import { useEffect, useMemo, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { EditorPane } from "./components/EditorPane";
import { COLORS } from "./theme";
import { AppState, Note } from "./types";
import { createNote, loadState, saveState } from "./utils/storage";
import { filterAndSortNotes } from "./utils/format";

// PUBLIC_INTERFACE
export function App() {
  /** Root application for the note and video manager UI. Uses localStorage for persistence. */
  const [state, setState] = useState<AppState>(() => loadState());

  // Persist to localStorage
  useEffect(() => {
    saveState(state);
  }, [state]);

  const visibleNotes = useMemo(
    () =>
      filterAndSortNotes(
        state.notes,
        state.search,
        state.showTrash,
        state.sortBy,
        state.sortDir
      ),
    [state.notes, state.search, state.showTrash, state.sortBy, state.sortDir]
  );

  const selected = useMemo<Note | null>(() => {
    if (!state.selectedId) return null;
    return state.notes.find((n) => n.id === state.selectedId) || null;
  }, [state.selectedId, state.notes]);

  const createAndSelectNote = () => {
    const n = createNote();
    setState((s) => ({
      ...s,
      notes: [n, ...s.notes],
      selectedId: n.id,
      showTrash: false,
    }));
  };

  const selectNote = (id: string) => {
    setState((s) => ({ ...s, selectedId: id }));
  };

  const updateNote = (next: Note) => {
    setState((s) => ({
      ...s,
      notes: s.notes.map((n) => (n.id === next.id ? next : n)),
    }));
  };

  const softDelete = (id: string) => {
    setState((s) => ({
      ...s,
      notes: s.notes.map((n) =>
        n.id === id ? { ...n, deletedAt: Date.now(), updatedAt: Date.now() } : n
      ),
      // if currently selected, keep selection so user sees the deleted note in editor if viewing trash,
      // otherwise clear selection
      selectedId:
        s.selectedId === id
          ? id
          : s.selectedId,
      showTrash: true,
    }));
  };

  const restore = (id: string) => {
    setState((s) => ({
      ...s,
      notes: s.notes.map((n) =>
        n.id === id ? { ...n, deletedAt: null, updatedAt: Date.now() } : n
      ),
      showTrash: false,
    }));
  };

  const hardDelete = (id: string) => {
    setState((s) => {
      const remaining = s.notes.filter((n) => n.id !== id);
      return {
        ...s,
        notes: remaining,
        selectedId: s.selectedId === id ? (remaining.find((n) => !n.deletedAt)?.id ?? null) : s.selectedId,
      };
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", background: COLORS.bg }}>
      <Navbar
        search={state.search}
        onSearch={(v) => setState((s) => ({ ...s, search: v }))}
        onNewNote={createAndSelectNote}
        showTrash={state.showTrash}
        onToggleTrash={() => setState((s) => ({ ...s, showTrash: !s.showTrash }))}
      />

      <div style={{ display: "flex" }}>
        <Sidebar
          notes={visibleNotes}
          selectedId={state.selectedId}
          onSelect={selectNote}
          sortBy={state.sortBy}
          sortDir={state.sortDir}
          onChangeSortBy={(v) => setState((s) => ({ ...s, sortBy: v }))}
          onChangeSortDir={(v) => setState((s) => ({ ...s, sortDir: v }))}
        />
        <EditorPane
          note={selected}
          onChange={updateNote}
          onSoftDelete={softDelete}
          onRestore={restore}
          onHardDelete={hardDelete}
        />
      </div>
    </div>
  );
}
