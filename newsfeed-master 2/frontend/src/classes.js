class UserProfile {

  friendList = [];
  history = [];

  constructor(name, username, password, picURL, userID) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.picURL = picURL;
    this.userID = userID;
  }

  addFriend(UserProfile e) {
    friendList.push(e);
  }

  get Friend(int i) {
    return friendList[i];
  }

  get userID() {
    return userID;
  }

  get name() {
    return name;
  }

  get picURL() {
    return picURL;
  }

  addArticle(Article a) {
    history.push(a);
  }
}

class Topic {
  articles = [];

  constructor(name) {
    this.name = name;
    this.start = 0;
  }

  get Article() {
    this.start = this.start + 1;
    return articles[this.start - 1];
  }

  addArticle(Article a) {
    articles.push(a);
  }

  get numArticles() {
    return articles.length;
  }
}

class Article {
  comments = [];
  constructor(articleText, imageURL) {
    this.imageURL = imageURL;
    this.upvotes = 0;
    this.downvotes = 0;
    this.articleText = articleText;
  }

  addComment(comment) {
    comments.push(comment);
  }

  get comment() {
    return comments;
  }

  upvote() {
    this.upvotes = this.upvotes + 1;
  }

  downvote() {
    this.downvote = this.downvote + 1;
  }
}
