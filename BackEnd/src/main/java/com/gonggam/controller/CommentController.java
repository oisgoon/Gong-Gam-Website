package com.gonggam.controller;

import com.gonggam.entity.Comment;
import com.gonggam.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<String> createComment(@RequestBody Comment comment) {
        commentService.createComment(comment);
        return ResponseEntity.ok("댓글 작성 성공");
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    // 댓글 수정 및 삭제 메서드 추가 가능
}