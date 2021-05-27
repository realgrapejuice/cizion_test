"use strict";

import { comments } from "./db.js";

export default class Comment {
  constructor() {
    this.app = document.querySelector(".app");
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

  loadComment() {
    const db = localStorage.getItem("db");
    if (db) {
      const parsedDb = JSON.parse(db);
      parsedDb.forEach((comment) => this._visualize(comment));
    } else {
      localStorage.setItem("db", JSON.stringify(this.db));
      this.db.forEach((comment) => this._visualize(comment));
    }
  }
}
