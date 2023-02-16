import {atom} from "recoil"
import {recoilPersist} from "recoil-persist"; // npm install recoil-persist

const {persistAtom} = recoilPersist();

export const user = atom({
    key:"user",
    default:{},
    effects_UNSTABLE: [persistAtom],
})

export const APIroot = atom({
    key:"APIroot",
    default: "https://i8d109.p.ssafy.io/api",
    effects_UNSTABLE: [persistAtom],
})

export const groupNavTitle = atom({
    key:"groupNavTitle",
    default: "Notice",
    effects_UNSTABLE: [persistAtom],
})

export const pageNumber = atom({
    key: "pageNumber",
    default: "1",
    effects_UNSTABLE: [persistAtom],
})

export const conference = atom({
    key: "conference",
    default: {},
    effects_UNSTABLE: [persistAtom],
})