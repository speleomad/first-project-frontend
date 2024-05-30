import { Component, OnInit } from '@angular/core';
import { AboutService } from '../services/about.service';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  //template:`<p> about works from template</p>`,
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  /*info = {
    name: "Demo",
    email: "demo@gmail.com",
    tel: "12345678"
  }*/
  /*colors={odd:"red", even:"#00ff00"}*/
  info:any;
  comments:Comment[] = [];
  newComment: boolean = false;
  comment:Comment=new Comment(-1,new Date(),"");
  constructor(private aboutService:AboutService) {
  }
  ngOnInit(): void {
    this.info=this.aboutService.getInfos();
    this.comments=this.aboutService.getAllComments();
  }

  addComment() {
    if(this.comment.message!=""){
      this.aboutService.addComment({
          id:this.comment.id,
          date:this.comment.date,
          message:this.comment.message
      })
      this.comment.message="";
    }
   
  }
}
