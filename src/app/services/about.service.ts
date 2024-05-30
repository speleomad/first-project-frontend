import { Injectable } from '@angular/core';
import { Comment } from '../shared/comment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  info = {
    name: "Demo",
    email: "demo@gmail.com",
    tel: "12345678"
  }
  comments: Comment[] = [];
  constructor() { }
  getInfos() {
    console.log("get info")
    return this.info;
  }
  addComment(comment: Comment) {

    comment.date = new Date();
    console.log(comment);
    this.comments.push(comment);
  }
  getAllComments(): Comment[] {
    console.log("get all comment")
    return this.comments;
  }
}
