import synthIcon from "../assets/synth.svg";
import slideIcon from "../assets/slide.svg";
import onIcon from "../assets/on.svg";
import ambientIcon from "../assets/ambient.svg";
import winIcon from "../assets/win.svg";
import winMusic from "../assets/win.mp3";
import onMusic from "../assets/on.mp3";
import slideMusic from "../assets/slide.mp3";
import synthMusic from "../assets/synth.mp3";
import ambientMusic from "../assets/ambient.mp3";
import { MotionType } from "../libs/redux/slices/chat-slice";

export const musics = [
    {
        source: winMusic,
        name: 'win',
        icon: winIcon
    }, {
        source: slideMusic,
        name: 'slide',
        icon: slideIcon
    },
    {
        source: onMusic,
        name: 'on',
        icon: onIcon
    },

    {
        source: synthMusic,
        name: 'synth',
        icon: synthIcon
    },
    {
        source: ambientMusic,
        name: 'ambient',
        icon: ambientIcon
    }
];

export const motions: Array<{
    name: keyof MotionType
    motion: keyof MotionType
}> = [{
    name: 'chaos',
    motion: "chaos"
}, {
    name: 'focused',
    motion: "focused"
}, {
    name: 'equator',
    motion: "equator"
}]