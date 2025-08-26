import React from "react";
import { COLORS, RADIUS } from "../theme";
import { Note } from "../types";
import { formatDate } from "../utils/format";

type Props = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  sortBy: "updated" | "created" | "title";
  sortDir: "asc" | "desc";
  onChangeSortBy: (v: Props["sortBy"]) => void;
  onChangeSortDir: (v: Props["sortDir"]) => void;
};

export const Sidebar: React.FC<Props> = ({
  notes,
  selectedId,
  onSelect,
  sortBy,
  sortDir,
  onChangeSortBy,
  onChangeSortDir,
}) => {
  return (
    <aside
      style={{
        width: 320,
        borderRight: `1px solid ${COLORS.border}`,
        background: "#fff",
        height: "calc(100vh - 56px)",
        overflow: "auto",
      }}
      aria-label="Notes list"
    >
      <div style={{ padding: 12, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>
          Sort
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            aria-label="Sort by"
            value={sortBy}
            onChange={(e) =>
              onChangeSortBy(e.target.value as Props["sortBy"])
            }
            style={{
              border: `1px solid ${COLORS.border}`,
              borderRadius: RADIUS,
              padding: "6px 10px",
              background: "#fff",
              color: COLORS.text,
              flex: 1,
            }}
          >
            <option value="updated">Updated</option>
            <option value="created">Created</option>
            <option value="title">Title</option>
          </select>
          <select
            aria-label="Sort direction"
            value={sortDir}
            onChange={(e) =>
              onChangeSortDir(e.target.value as Props["sortDir"])
            }
            style={{
              border: `1px solid ${COLORS.border}`,
              borderRadius: RADIUS,
              padding: "6px 10px",
              background: "#fff",
              color: COLORS.text,
            }}
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>

      {notes.length === 0 ? (
        <div
          style={{
            padding: 16,
            color: COLORS.textMuted,
            fontSize: 14,
          }}
        >
          No notes yet.
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {notes.map((n) => {
            const active = n.id === selectedId;
            return (
              <li key={n.id}>
                <button
                  onClick={() => onSelect(n.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: active ? "#f1f5f9" : "#fff",
                    borderLeft: active ? `3px solid ${COLORS.primary}` : "3px solid transparent",
                    padding: "10px 12px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: n.video ? COLORS.accent : COLORS.border,
                        marginTop: 4,
                        flex: "0 0 auto",
                      }}
                      aria-hidden
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          color: COLORS.text,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={n.title || "Untitled"}
                      >
                        {n.title || "Untitled"}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: COLORS.textMuted,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginTop: 2,
                        }}
                        title={n.content}
                      >
                        {n.content || "Empty note"}
                      </div>
                      <div
                        style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6 }}
                      >
                        Updated: {formatDate(n.updatedAt)}
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
};
