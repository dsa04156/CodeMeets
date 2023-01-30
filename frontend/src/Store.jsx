import {atom} from "recoil"

export const user = atom({
    key:"user",
    default:{},
})

export const APIroot = atom({
    key:"APIroot",
    default: "http://aeoragy.iptime.org:18081"
})