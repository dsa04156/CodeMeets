import {atom} from "recoil"

export const user = atom({
    key:"user",
    default:{},
})

export const API = atom({
    key:"API",
    default: "http://aeoragy.iptime.org:18081"
})