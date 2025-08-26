# Note & Video Manager (Remotion-based)

A modern, minimalistic, light-themed web application to create, edit, search, and organize notes with attached video playback. Built on Remotion to run in the browser via the Remotion Studio dev server. Data persists locally in the browser using localStorage.

## Features
- Create and edit text notes
- Attach and playback videos in notes (URL or file upload)
- List and organize notes in a sidebar with sorting
- Search notes by title and content
- Delete (move to trash) and restore notes; permanently delete from trash
- Light theme with primary, secondary, and accent colors

## Tech
- Remotion 4
- React 19
- TypeScript

## Getting Started

Install dependencies:
```console
npm i
```

Start the Remotion Studio (development server):
```console
npm run dev
```

In the Remotion Studio UI, select the "NotesApp" composition to open the application UI.

## Notes
- All data is stored in localStorage and stays in the browser.
- File uploads are played from a generated blob URL for the current session.
- No backend is required.
