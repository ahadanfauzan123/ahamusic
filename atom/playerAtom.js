import { atom } from "recoil"

//these get access to the whole application
export const playState = atom ({
    key: "playState",
    default: false,
});

export const playingTrackState = atom ({
    key: 'playingTrackState',
    default: ""
});