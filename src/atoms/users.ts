import { atom } from "recoil";

export const userNameState = atom({
  key: "userNameState",
  default: null,
});

export const userProfilePicState = atom({
  key: "userProfilePicState",
  default: null,
});
