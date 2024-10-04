package com.gonggam.controller;

import com.gonggam.entity.Comment;
import com.gonggam.entity.Post;
import com.gonggam.repository.PostRepository;
import com.gonggam.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
public class CommentController {

    private final CommentService commentService;
    private final PostRepository postRepository; // PostRepository 주입

    // 생성자 주입
    public CommentController(CommentService commentService, PostRepository postRepository) {
        this.commentService = commentService;
        this.postRepository = postRepository;
    }

    @PostMapping
    public ResponseEntity<String> createComment(@RequestBody Comment comment, @PathVariable Long postId) {
        // postId로 Post 엔티티 조회 후 comment에 설정
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        comment.setPost(post); // comment에 post 설정

        commentService.createComment(comment, postId);
        return ResponseEntity.ok("댓글 작성 성공");
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
        System.out.println("postId: " + postId); // 로그 추가
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }
}