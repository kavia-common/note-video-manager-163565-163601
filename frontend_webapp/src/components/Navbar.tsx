import React from "react";
import { COLORS, RADIUS, SHADOW_SM } from "../theme";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  onNewNote: () => void;
  showTrash: boolean;
  onToggleTrash: () => void;
};

export const Navbar: React.FC<Props> = ({
  search,
  onSearch,
  onNewNote,
  showTrash,
  onToggleTrash,
}) => {
  return (
    <div
      style={{
        height: 56,
        backgroundColor: COLORS.surface,
        borderBottom: `1px solid ${COLORS.border}`,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 12,
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxShadow: SHADOW_SM,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          color: COLORS.primary,
          letterSpacing: 0.3,
        }}
        aria-label="App name"
      >
        Note & Video
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <input
          aria-label="Search notes"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: 260,
            height: 36,
            borderRadius: RADIUS,
            border: `1px solid ${COLORS.border}`,
            outline: "none",
            padding: "0 12px",
            background: "#fff",
            color: COLORS.text,
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.focus}`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <button
          aria-label="Toggle trash"
          onClick={onToggleTrash}
          style={{
            height: 36,
            borderRadius: RADIUS,
            border: `1px solid ${showTrash ? COLORS.accent : COLORS.border}`,
            background: showTrash ? COLORS.accent : "#fff",
            color: showTrash ? "#fff" : COLORS.text,
            padding: "0 12px",
            cursor: "pointer",
          }}
        >
          {showTrash ? "Viewing Trash" : "Trash"}
        </button>
        <button
          aria-label="Create note"
          onClick={onNewNote}
          style={{
            height: 36,
            borderRadius: RADIUS,
            border: "none",
            background: COLORS.primary,
            color: "#fff",
            padding: "0 14px",
            cursor: "pointer",
          }}
        >
          + New note
        </button>
      </div>
    </div>
  );
};
