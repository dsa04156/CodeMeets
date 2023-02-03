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
    default: "http://i8d109.p.ssafy.io:8082",
    effects_UNSTABLE: [persistAtom],
})

export const groupNavTitle = atom({
    key:"groupNavTitle",
    default: "Notice",
    effects_UNSTABLE: [persistAtom],
})
