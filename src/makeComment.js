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
    this.logOutBtn = document.createElement("button");
    this.logOutBtn.setAttribute("type", "button");
    this.logOutBtn.innerText = "로그 아웃";
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

  _afterLogin() {
    const user = this._loadUser();
    const div = document.createElement("div");
    const form = document.createElement("form");
    const strong = document.createElement("strong");
    const auth = document.createElement("span");
    const textarea = document.createElement("textarea");
    const submitBtn = document.createElement("button");

    div.setAttribute("class", "comment__container-block");
    form.setAttribute("action", "#");
    form.setAttribute("method", "GET");
    form.setAttribute("class", "comment__container-form");
    strong.setAttribute("class", "userId");
    auth.setAttribute("class", "userAuth");
    textarea.setAttribute(
      "placeholder",
      "댓글 작성 시 상대에 대한 배려와 책임을 담아주세요"
    );
    submitBtn.setAttribute("type", "submit");

    strong.innerText = user.id;
    auth.innerText = user.auth;
    submitBtn.innerText = "댓글 등록";

    form.append(textarea, submitBtn);
    div.append(auth, strong, form);
    this.app.append(div, this.logOutBtn);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit(textarea, user.id, user.auth, user.img);
    });
  }

  _loadUser() {
    const currentUser = {
      id: localStorage.getItem("user"),
      auth: localStorage.getItem("auth"),
      img: localStorage.getItem("img"),
    };
    return currentUser;
  }

  _addComment(userObj) {
    const div = document.createElement("div");
    const id = document.createElement("strong");
    const postedAt = document.createElement("span");
    const post = document.createElement("p");
    const comments = document.createElement("button");
    const likes = document.createElement("button");
    const dislikes = document.createElement("button");
    const shares = document.createElement("button");

    div.setAttribute("class", "userComment");
    id.setAttribute("class", "userComment__name");
    postedAt.setAttribute("class", "userComment__postedAt");
    post.setAttribute("class", "userComment__post");
    comments.setAttribute("class", "userComment__comment");
    likes.setAttribute("class", "userComment__likes");
    dislikes.setAttribute("class", "userComment__dislikes");
    shares.setAttribute("class", "userComment__shares");

    id.innerText = userObj.id;
    postedAt.innerText = userObj.postedAt;
    post.innerText = userObj.post;
    comments.innerText = userObj.count.comments;
    likes.innerText = userObj.count.likes;
    dislikes.innerText = userObj.count.dislikes;
    shares.innerText = userObj.count.share;

    div.append(id, postedAt, post, comments, likes, dislikes, shares);

    const commandContainer = document.querySelector(".comment__container");

    commandContainer.append(div);
  }

  _handleSubmit(input, id, auth, profile) {
    const userInput = input.value;
    const userObj = {
      id,
      auth,
      profile,
      postedAt: Date.now(),
      post: userInput,
      count: {
        comments: 0,
        likes: 0,
        dislikes: 0,
        share: 0,
      },
    };
    this._addComment(userObj);

    const dbArr = localStorage.getItem("db");
    const comments = JSON.parse(dbArr);
    comments.push(userObj);
    localStorage.setItem("db", JSON.stringify(comments));
    input.value = "";
  }

  _handleLogOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    localStorage.removeItem("img");
    window.location.reload(true);
  }

  loadMakeComment() {
    if (!this.user) {
      this._beforeLogin();
      this.beforeLoginBtn.addEventListener("click", this._fadeUpLogin);
    } else {
      this._afterLogin();
      this.logOutBtn.addEventListener("click", this._handleLogOut);
    }
  }
}
