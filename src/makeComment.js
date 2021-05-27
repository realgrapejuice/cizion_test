"use strict";

import AuthControl from "./authControl.js";
const authControl = new AuthControl();

export default class MakeComment {
  constructor() {
    this.app = document.querySelector(".app");
    this.commentSection = document.createElement("div");
    this.commentSection.setAttribute("class", "comment__container");
    this.beforeLoginBtn = document.createElement("button");
    this.beforeLoginBtn.setAttribute("class", "moveToLogin");
    this.user = localStorage.getItem("user");
  }

  _beforeLogin() {
    this.beforeLoginBtn.innerText = "로그인하고 댓글 작성하기";
    this.commentSection.append(this.beforeLoginBtn);
    this.app.append(this.commentSection);
  }

  _fadeUpLogin() {
    const app = document.querySelector(".app");
    const div = document.createElement("div");
    div.setAttribute("class", "auth__container");
    // title
    const title = document.createElement("h2");
    // auth
    const naver = document.createElement("button");
    const kakao = document.createElement("button");
    const facebook = document.createElement("button");
    const google = document.createElement("button");
    const twitter = document.createElement("button");

    title.innerText = "SNS 로그인하고 댓글 쓰기";
    naver.innerText = "네이버로 로그인";
    kakao.innerText = "카카오톡으로 로그인";
    facebook.innerText = "페이스북으로 로그인";
    google.innerText = "구글로 로그인";
    twitter.innerText = "트위터로 로그인";

    naver.setAttribute("class", "naver_login");
    kakao.setAttribute("class", "kakao_login");
    facebook.setAttribute("class", "facebook_login");
    google.setAttribute("class", "google_login");
    twitter.setAttribute("class", "twitter_login");

    div.append(naver, kakao, facebook, google, twitter);

    // filter
    const container = document.querySelector(".auth__container");
    if (!container) {
      app.append(div);
    }

    authControl.logIn();
  }

  _afterLogin() {}

  loadMakeComment() {
    if (!this.user) {
      this._beforeLogin();
      this.beforeLoginBtn.addEventListener("click", this._fadeUpLogin);
    } else {
      this._afterLogin();
      console.log(this.user);
    }
  }
}
