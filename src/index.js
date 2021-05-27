"use strict";

import Comment from "./comments.js";
import MakeComment from "./makeComment.js";

const commentContainer = new Comment();
const makeComment = new MakeComment();

const init = () => {
  commentContainer.loadComment();
  makeComment.loadMakeComment();
};

init();
