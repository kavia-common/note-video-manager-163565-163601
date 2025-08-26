import React from "react";
import { Composition } from "remotion";
import { App } from "./App";

/*
PUBLIC_INTERFACE
AppStudio
This composition mounts the interactive notes & videos web application UI inside Remotion Studio.
- Purpose: Allow viewing and working with the app UI in development using Remotion dev server.
- Parameters: None
- Return: React composition entry shown by Remotion Studio.
Usage: remotion studio (npm run dev) and select "NotesApp" in the sidebar.
*/

export const AppStudio: React.FC = () => {
  return (
    <>
      <Composition
        id="NotesApp"
        component={App}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{}}
      />
    </>
  );
};
