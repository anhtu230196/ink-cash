import React from "react";
import { Composition, Folder } from "remotion";
import { Avatar } from "../channel/src/Avatar";
import { Banner } from "../channel/src/Banner";
import { AgeSheet, CharacterSheet } from "../lab/src/CharacterSheet";
import { LookChapter, LookDev } from "../lab/src/LookDev";
import { EPISODES } from "./episodes";

export const Root: React.FC = () => (
  <>
    <Folder name="channel">
      <Composition id="Avatar" component={Avatar} durationInFrames={1} fps={30} width={800} height={800} defaultProps={{ variant: "nib" as const }} />
      <Composition id="Banner" component={Banner} durationInFrames={1} fps={30} width={2560} height={1440} defaultProps={{ guides: false }} />
    </Folder>
    <Folder name="lab">
      <Composition id="CharacterSheets" component={CharacterSheet} durationInFrames={1} fps={30} width={1920} height={1080} defaultProps={{ episode: "ep01-megaspeed", id: "jensen" }} />
      <Composition id="AgeSheet" component={AgeSheet} durationInFrames={1} fps={30} width={1920} height={1080} defaultProps={{ episode: "ep01-megaspeed", id: "jensen" }} />
      <Composition id="LookDev" component={LookDev} durationInFrames={90} fps={30} width={1920} height={1080} defaultProps={{ mode: "cine" as const }} />
      <Composition id="LookChapter" component={LookChapter} durationInFrames={75} fps={30} width={1920} height={1080} />
    </Folder>
    {EPISODES.map(({ id, Compositions }) => (
      <Folder key={id} name={id}>
        <Compositions />
      </Folder>
    ))}
  </>
);
