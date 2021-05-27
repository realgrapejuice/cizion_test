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

// Global Tags
const app = document.querySelector(".app");
const commentSection = document.createElement("section");
const beforeLogin = document.createElement("div");
const auth = document.createElement("div");

commentSection.setAttribute("class", "comment__container");
beforeLogin.setAttribute("class", "move_to_login");
auth.setAttribute("class", "auth__container");

app.append(commentSection, beforeLogin);

const getDistance = (date) => {};

// 댓글을 불러와 화면에 보여주도록 도와주는 코드
const visualizeComment = (comment) => {
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
  commentSection.append(div);
};

// 비로그인시 로그인하고 댓글 작성하기 버튼을 보여주는 코드
const visualizeBeforeLogin = () => {
  const button = document.createElement("button");
  button.setAttribute("class", "moveToLogin");
  button.innerText = "로그인하고 댓글 작성하기";
  beforeLogin.append(button);
};

// 댓글 작성하기 버튼을 클릭하면 로그인을 담당하는 창을 보여주는 코드
const visualizeAuth = () => {
  const title = document.createElement("h2");
  const authBox = document.createElement("div");
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

  authBox.setAttribute("class", "auth__box");
  naver.setAttribute("class", "naver_login");
  kakao.setAttribute("class", "kakao_login");
  facebook.setAttribute("class", "facebook_login");
  google.setAttribute("class", "google_login");
  twitter.setAttribute("class", "twitter_login");

  authBox.append(naver, kakao, facebook, google, twitter);
  auth.append(title, authBox);
};

const toggleAuth = (e) => {
  // 버튼이 클릭되면 Auth 버튼이 담겨 있는 섹션을 보이도록 하는 함수
  const moveToLogin = document.querySelector(".move_to_login");
  visualizeAuth();
  app.append(auth);
  app.removeChild(moveToLogin);
};

const init = () => {
  // 댓글 보여주기
  comments.forEach((comment) => {
    visualizeComment(comment);
  });
  // 로그인 버튼 보여주기
  visualizeBeforeLogin();
  const button = beforeLogin.querySelector(".moveToLogin");
  button.addEventListener("click", toggleAuth);

  auth.addEventListener("click", (e) => {
    const target = e.target.className;
    let currentClass;
    switch (target) {
      case "naver_login":
        currentClass = "naver";
        break;
      case "kakao_login":
        currentClass = "kakao";
        break;
      case "facebook_login":
        currentClass = "facebook";
        break;
      case "google_login":
        currentClass = "google";
        break;
      case "twitter_login":
        currentClass = "twitter";
        break;
      default:
        break;
    }
  });
};

init();
