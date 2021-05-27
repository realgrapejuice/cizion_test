"use strict";

export default class AuthControl {
  _saveUser(auth) {
    const userName = ["Foden", "Stones", "Debruyne", "Silva", "Walker"];
    const img = ["", "", "", "", ""];

    switch (auth) {
      case "naver":
        localStorage.setItem("user", userName[0]);
        localStorage.setItem("auth", "naver");
        localStorage.setItem("img", img[0]);
        break;
      case "kakao":
        localStorage.setItem("user", userName[1]);
        localStorage.setItem("auth", "kakao");
        localStorage.setItem("img", img[1]);
        break;
      case "facebook":
        localStorage.setItem("user", userName[2]);
        localStorage.setItem("auth", "facebook");
        localStorage.setItem("img", img[2]);
        break;
      case "google":
        localStorage.setItem("user", userName[3]);
        localStorage.setItem("auth", "google");
        localStorage.setItem("img", img[3]);
        break;
      case "twitter":
        localStorage.setItem("user", userName[4]);
        localStorage.setItem("auth", "twitter");
        localStorage.setItem("img", img[4]);
        break;
      default:
        break;
    }
  }

  logIn() {
    const authBox = document.querySelector(".auth__container");
    authBox.addEventListener("click", (e) => {
      const target = e.target.className;
      let currentAuth;
      switch (target) {
        case "naver_login":
          currentAuth = "naver";
          break;
        case "kakao_login":
          currentAuth = "kakao";
          break;
        case "facebook_login":
          currentAuth = "facebook";
          break;
        case "google_login":
          currentAuth = "google";
          break;
        case "twitter_login":
          currentAuth = "twitter";
          break;
        default:
          break;
      }

      this._saveUser(currentAuth);
      window.location.reload(true);
    });
  }

  logOut() {}
}
