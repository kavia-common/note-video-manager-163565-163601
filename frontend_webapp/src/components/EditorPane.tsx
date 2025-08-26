import React, { useEffect, useRef, useState } from "react";
import { COLORS, RADIUS, SHADOW_MD } from "../theme";
import { Note, VideoSource } from "../types";
import { formatDate } from "../utils/format";

type Props = {
  note: Note | null;
  onChange: (next: Note) => void;
  onSoftDelete: (id: string) => void;
  onRestore: (id: string) => void;
  onHardDelete: (id: string) => void;
};

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6, marginTop: 10 }}>
    {children}
  </div>
);

export const EditorPane: React.FC<Props> = ({
  note,
  onChange,
  onSoftDelete,
  onRestore,
  onHardDelete,
}) => {
  const [url, setUrl] = useState("");
  const fileInputRef = useRef<globalThis.HTMLInputElement | null>(null);
  const videoRef = useRef<globalThis.HTMLVideoElement | null>(null);

  useEffect(() => {
    setUrl("");
  }, [note?.id]);

  // Cleanup created object URLs if any
  useEffect(() => {
    return () => {
      // Nothing to revoke here because we persist video URLs for playback;
      // browser will release blob URLs when page unloads. If we wanted to revoke,
      // we could store a separate transient flag.
    };
  }, []);

  if (!note) {
    return (
      <main style={{ flex: 1, padding: 24 }}>
        <div
          style={{
            height: "100%",
            border: `1px dashed ${COLORS.border}`,
            borderRadius: RADIUS,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.textMuted,
          }}
        >
          No note selected
        </div>
      </main>
    );
  }

  const isDeleted = !!note.deletedAt;

  const onAttachUrl = () => {
    if (!url.trim()) return;
    const vs: VideoSource = { type: "url", url: url.trim(), name: url.trim() };
    onChange({ ...note, video: vs, updatedAt: Date.now() });
    setUrl("");
  };

  const onAttachFile = (file: globalThis.File) => {
    const blobUrl = globalThis.URL.createObjectURL(file);
    const vs: VideoSource = { type: "file", url: blobUrl, name: file.name };
    onChange({ ...note, video: vs, updatedAt: Date.now() });
  };

  const onTitleChange = (v: string) => {
    onChange({ ...note, title: v, updatedAt: Date.now() });
  };

  const onContentChange = (v: string) => {
    onChange({ ...note, content: v, updatedAt: Date.now() });
  };

  const onRemoveVideo = () => {
    onChange({ ...note, video: null, updatedAt: Date.now() });
  };

  return (
    <main
      style={{
        flex: 1,
        padding: 20,
        background: "#fafcff",
        height: "calc(100vh - 56px)",
        overflow: "auto",
      }}
      aria-label="Editor and video player"
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 16,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              aria-label="Note title"
              value={note.title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Note title"
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: 600,
                padding: "10px 12px",
                borderRadius: RADIUS,
                border: `1px solid ${COLORS.border}`,
                background: "#fff",
                color: COLORS.text,
              }}
            />
            {!isDeleted ? (
              <button
                aria-label="Delete note"
                onClick={() => onSoftDelete(note.id)}
                style={{
                  height: 40,
                  borderRadius: RADIUS,
                  border: `1px solid ${COLORS.border}`,
                  background: "#fff",
                  color: COLORS.secondary,
                  cursor: "pointer",
                  padding: "0 12px",
                }}
              >
                Move to Trash
              </button>
            ) : (
              <>
                <button
                  aria-label="Restore note"
                  onClick={() => onRestore(note.id)}
                  style={{
                    height: 40,
                    borderRadius: RADIUS,
                    border: "none",
                    background: COLORS.primary,
                    color: "#fff",
                    cursor: "pointer",
                    padding: "0 12px",
                  }}
                >
                  Restore
                </button>
                <button
                  aria-label="Delete permanently"
                  onClick={() => {
                    if (globalThis.confirm && globalThis.confirm("Permanently delete this note? This cannot be undone.")) {
                      onHardDelete(note.id);
                    }
                  }}
                  style={{
                    height: 40,
                    borderRadius: RADIUS,
                    border: `1px solid #ef4444`,
                    background: "#fff",
                    color: "#ef4444",
                    cursor: "pointer",
                    padding: "0 12px",
                  }}
                >
                  Delete forever
                </button>
              </>
            )}
          </div>

          <SectionLabel>Details</SectionLabel>
          <div style={{ display: "flex", gap: 16, color: COLORS.textMuted, fontSize: 12 }}>
            <div>Created: {formatDate(note.createdAt)}</div>
            <div>Updated: {formatDate(note.updatedAt)}</div>
            {isDeleted && <div>Deleted: {formatDate(note.deletedAt)}</div>}
          </div>

          <SectionLabel>Content</SectionLabel>
          <textarea
            aria-label="Note content"
            value={note.content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Write your note..."
            style={{
              width: "100%",
              minHeight: 300,
              resize: "vertical",
              borderRadius: RADIUS,
              border: `1px solid ${COLORS.border}`,
              padding: 12,
              fontSize: 14,
              background: "#fff",
              color: COLORS.text,
              boxShadow: SHADOW_MD,
            }}
          />
        </div>

        <div>
          <div
            style={{
              background: "#fff",
              border: `1px solid ${COLORS.border}`,
              borderRadius: RADIUS,
              padding: 12,
              boxShadow: SHADOW_MD,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 16, color: COLORS.secondary }}>Video</h3>
              {note.video && (
                <button
                  onClick={onRemoveVideo}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#ef4444",
                    cursor: "pointer",
                  }}
                  aria-label="Remove video"
                >
                  Remove
                </button>
              )}
            </div>

            {!note.video ? (
              <>
                <div style={{ height: 8 }} />
                <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 8 }}>
                  Attach a video by URL or upload a file.
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    placeholder="https://example.com/video.mp4"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{
                      flex: 1,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: RADIUS,
                      padding: "8px 10px",
                      background: "#fff",
                      color: COLORS.text,
                    }}
                  />
                  <button
                    onClick={onAttachUrl}
                    style={{
                      border: "none",
                      background: COLORS.accent,
                      color: "#fff",
                      borderRadius: RADIUS,
                      padding: "8px 12px",
                      cursor: "pointer",
                    }}
                    aria-label="Attach video by URL"
                  >
                    Attach URL
                  </button>
                </div>
                <div style={{ height: 10 }} />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onAttachFile(f);
                    // reset so same file can be selected again
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `1px solid ${COLORS.border}`,
                    background: "#fff",
                    color: COLORS.text,
                    borderRadius: RADIUS,
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                  aria-label="Upload video file"
                >
                  Upload File
                </button>
              </>
            ) : (
              <div style={{ marginTop: 10 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: COLORS.textMuted,
                    marginBottom: 6,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={note.video?.name || note.video?.url}
                >
                  {note.video?.name || note.video?.url}
                </div>
                <div
                  style={{
                    width: "100%",
                    background: "#000",
                    borderRadius: RADIUS,
                    overflow: "hidden",
                  }}
                >
                  <video
                    ref={videoRef}
                    src={note.video?.url}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    controls
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
