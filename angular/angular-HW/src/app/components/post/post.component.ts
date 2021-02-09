import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()
  post: Post;
  activePost: number;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
  }

  showFullPost(post): void {
    this.postService.setNewPost(post);
    this.postService.getCurrentPost().subscribe(value => this.activePost = value.id);
  }

}
