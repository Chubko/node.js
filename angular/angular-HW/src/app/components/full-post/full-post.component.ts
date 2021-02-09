import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.css']
})
export class FullPostComponent implements OnInit {

  singlePost: Post;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getCurrentPost().subscribe(value => this.singlePost = value);

  }

}
