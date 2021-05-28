"use strict";

import { comments } from "./db.js";

export default class Comment {
  constructor() {
    this.app = document.querySelector(".app");
    this.index = 0;
    this.commentSection = document.createElement("section");
    this.commentSection.setAttribute("class", "comment__container");
    this.db = comments;
  }

  _visualize(comment) {
    const div = document.createElement("div");
    const id = document.createElement("strong");
    const postedAt = document.createElement("span");
    const post = document.createElement("p");
    const comments = document.createElement("button");
    const likes = document.createElement("button");
    const dislikes = document.createElement("button");
    const shares = document.createElement("button");

    div.setAttribute("class", "userComment");
    div.setAttribute("id", `tag${this.index++}`);
    id.setAttribute("class", "userComment__name");
    postedAt.setAttribute("class", "userComment__postedAt");
    post.setAttribute("class", "userComment__post");
    comments.setAttribute("class", "userComment__comment");
    likes.setAttribute("class", "userComment__likes");
    dislikes.setAttribute("class", "userComment__dislikes");
    shares.setAttribute("class", "userComment__shares");

    id.innerText = comment.id;
    postedAt.innerText = comment.postedAt;
    post.innerText = comment.post;
    comments.innerText = comment.count.comments;
    likes.innerText = comment.count.likes;
    dislikes.innerText = comment.count.dislikes;
    shares.innerText = comment.count.share;

    div.append(id, postedAt, post, comments, likes, dislikes, shares);
    this.commentSection.append(div);
    this.app.append(this.commentSection);
  }

  _findIndex(e) {
    const currentTarget = e.target;
    let index;
    if (
      currentTarget.className == "userComment__comment" ||
      currentTarget.className == "userComment__likes" ||
      currentTarget.className == "userComment__dislikes" ||
      currentTarget.className == "userComment__shares"
    ) {
      index = currentTarget.parentNode.id;
    } else return;
    return index;
  }

  _updateCount(e, tag, index) {
    const currentTarget = e.target;
    const comment = document.querySelector(
      `#tag${index} > .userComment__comment`
    );
    const likes = document.querySelector(`#tag${index} > .userComment__likes`);
    const dislikes = document.querySelector(
      `#tag${index} > .userComment__dislikes`
    );
    const shares = document.querySelector(
      `#tag${index} > .userComment__shares`
    );
    if (currentTarget && tag) {
      switch (currentTarget.className) {
        case "userComment__comment":
          ++tag.count.comments;
          comment.innerText = tag.count.comments;
          break;
        case "userComment__likes":
          ++tag.count.likes;
          likes.innerText = tag.count.likes;
          break;
        case "userComment__dislikes":
          ++tag.count.dislikes;
          dislikes.innerText = tag.count.dislikes;
          break;
        case "userComment__shares":
          ++tag.count.share;
          shares.innerText = tag.count.share;
          break;
        default:
          return;
      }
    }
  }

  loadComment() {
    const db = localStorage.getItem("db");
    if (db) {
      // 로딩 후 데이터를 화면에 보여주는 것을 담당
      const parsedDb = JSON.parse(db);
      parsedDb.forEach((comment) => this._visualize(comment));
      this._updateCount(parsedDb);
      this.commentSection.addEventListener("click", (e) => {
        const index =
          this._findIndex(e) && Number(this._findIndex(e).split("g")[1]);
        const currentTag = parsedDb[index];
        this._updateCount(e, currentTag, index);
      });
    }
    // 초기화면에서 데이터를 불러온 뒤 업데이트 시겨주는 것을 담당
    else {
      localStorage.setItem("db", JSON.stringify(this.db));
      this.db.forEach((comment) => this._visualize(comment));
    }
  }
}
