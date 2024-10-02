package com.gonggam.controller;

import com.gonggam.entity.Comment;
import com.gonggam.entity.Post;
import com.gonggam.service.CommentService;
import com.gonggam.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;

    public CommentController(CommentService commentService, PostService postService) {
        this.commentService = commentService;
        this.postService = postService;
    }

    // 댓글 작성
    @PostMapping
    public ResponseEntity<String> createComment(@PathVariable Long postId, @RequestBody Comment comment, @AuthenticationPrincipal UserDetails currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        Post post = postService.getPostById(postId);
        if (post == null) {
            return ResponseEntity.badRequest().body("게시글을 찾을 수 없습니다.");
        }

        comment.setPost(post);
        comment.setAuthor(currentUser.getUsername());

        commentService.createComment(comment);
        return ResponseEntity.ok("댓글 작성 성공");
    }

    // 특정 게시글의 댓글 조회
    @GetMapping
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        if (comments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(comments);
    }

    // 댓글 수정 및 삭제 메서드 추가 가능
}