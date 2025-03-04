import { create } from "zustand";
import { prefix } from "../utils";

export function getTrack(key) {
  let tracksJson = localStorage.getItem(prefix(key));
  if (tracksJson == null) {
    return new Map();
  }

  let tracks = JSON.parse(tracksJson);
  return new Map(tracks.map((t) => [t.id, t]));
}

export function saveState(key, value) {
  const tracks = Array.from(value, ([, track]) => track);
  localStorage.setItem(prefix(key), JSON.stringify(tracks));
}

const useTrackStore = create((set) => ({
  cur: new Date(),
  tracks: getTrack(new Date().toLocaleDateString()),
  saveTrack: (value) =>
    set((state) => {
      const freshTracks = {
        tracks: new Map(state.tracks).set(value.id, value),
      };

      saveState(state.cur.toLocaleDateString(), freshTracks.tracks);
      return freshTracks;
    }),
}));

export default useTrackStore;
