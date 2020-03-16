import {FAKE_USER_ID} from "core/globals";
import {v4 as uuid} from "uuid";

export default (e) => {
  let fakeUserId = localStorage.getItem(FAKE_USER_ID);
  if (!fakeUserId) {
    fakeUserId = uuid();
    localStorage.setItem(FAKE_USER_ID, fakeUserId);
  }

  return fakeUserId;
};