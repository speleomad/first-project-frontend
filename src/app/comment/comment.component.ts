import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
    @Input() commentList:Comment[]=[];
    constructor(){}
    ngOnInit(): void {
        
    }
}
