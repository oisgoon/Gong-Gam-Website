package com.gonggam.controller;

import com.gonggam.entity.Comment;
import com.gonggam.entity.Post;
import com.gonggam.repository.PostRepository;
import com.gonggam.service.CommentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<String> createComment(@RequestBody Comment comment, @PathVariable Long postId, HttpSession session) {
        // 세션에서 userid와 username 가져오기
        String userid = (String) session.getAttribute("userid");
        String username = (String) session.getAttribute("username");

        if (userid == null || username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        // postId로 Post 엔티티 조회 후 comment에 설정
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        comment.setPost(post); // comment에 post 설정
        comment.setUserId(userid); // 댓글에 사용자 ID 설정
        comment.setAuthor(username); // 댓글에 작성자 이름 설정

        // 댓글 저장
        commentService.createComment(comment, postId);
        return ResponseEntity.ok("댓글 작성 성공");
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }
}