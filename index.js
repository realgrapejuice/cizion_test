const comments = [
  {
    id: "jonathan Ive",
    auth: "facebook",
    profile: "none",
    postedAt: "2021.01.15.04:46",
    post: "저 또한 아이폰 12Pro Max를 사용하면서 영상, 사진 등 전문적인 작업을 제외하곤 모든 것을 해결하고 있는데 요즘 스마트폰은 RAW 촬영 또한 지원하는데요. 그래서 이번에 새로 클라우드 서비스를 구매하였는데 월 8900원이네요.",
    count: {
      comments: 0,
      likes: 0,
      dislikes: 0,
      share: 0,
    },
  },
  {
    id: "Oh In young",
    auth: "twitter",
    profile: "none",
    postedAt: "2021.01.15.04:46",
    post: "아마 이런 이유 때문에 무료 클라우드 서비스 하나 정도는 이용하고 계실텐데요, 아무래도 무료로 제공되는 클라우드의 경우 용량이 작기 때문에 기본으로 제공하는 15GB 정도...",
    count: {
      comments: 0,
      likes: 0,
      dislikes: 0,
      share: 0,
    },
  },
];

const user = false;

const app = document.querySelector(".app");

// 댓글이 붙여지는 섹션
const commentSection = document.createElement("section");

const visualizeComment = (comment) => {
  const div = document.createElement("div");
  const id = document.createElement("strong");
  const auth = document.createElement("img");
  const postedAt = document.createElement("span");
  const post = document.createElement("p");
  const comments = document.createElement("button");
  const likes = document.createElement("button");
  const dislikes = document.createElement("button");
  const shares = document.createElement("button");

  id.innerText = comment.id;
  postedAt.innerText = comment.postedAt;
  post.innerText = comment.post;
  comments.innerText = comment.count.comments;
  likes.innerText = comment.count.likes;
  dislikes.innerText = comment.count.dislikes;
  shares.innerText = comment.count.share;
  div.append(id, postedAt, post, comments, likes, dislikes, shares);
  commentSection.append(div);
};

comments.forEach((comment) => {
  visualizeComment(comment);
});

const beforeLogin = document.createElement("div");
const visualizeBeforeLogin = () => {
  const button = document.createElement("button");
  button.setAttribute("class", "moveToLogin");
  button.innerText = "로그인하고 댓글 작성하기";
  beforeLogin.append(button);
};

const visualizeAuth = (e) => {
  console.log("클릭됨");
};

if (!user) {
  visualizeBeforeLogin();
  const button = beforeLogin.querySelector(".moveToLogin");
  button.addEventListener("click", visualizeAuth);
}

// append 영역
app.append(commentSection, beforeLogin);
