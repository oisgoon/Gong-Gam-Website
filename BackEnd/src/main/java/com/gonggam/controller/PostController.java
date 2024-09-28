package com.gonggam.controller;

import com.gonggam.entity.Post;
import com.gonggam.service.PostService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // 게시글 작성
    @PostMapping
    public ResponseEntity<String> createPost(@Valid @RequestBody Post post, HttpSession session) {
        try {
            // 세션에서 userid 가져오기
            String userid = (String) session.getAttribute("userid");
            if (userid == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
            }
            post.setUserid(userid);  // 게시글에 userid 설정

            postService.createPost(post);
            return ResponseEntity.ok("게시글 작성 성공");
        } catch (Exception e) {
            logger.error("게시글 작성 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 작성 실패");
        }
    }

    // 모든 게시글 가져오기
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build(); // 상태 204 - 내용 없음
        }
        return ResponseEntity.ok(posts);
    }

    // ID로 게시글 하나 가져오기 (조회수 증가)
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        if (post != null) {
            // 조회수 증가 (수정 시간 변경 X)
            postService.incrementViews(id);
            return ResponseEntity.ok(post);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<String> updatePost(@PathVariable Long id, @Valid @RequestBody Post post, HttpSession session) {
        try {
            // 세션에서 userid 가져오기
            String userid = (String) session.getAttribute("userid");
            if (userid == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
            }
            post.setUserid(userid);  // 수정된 게시글에도 userid 설정

            boolean isUpdated = postService.updatePost(id, post);
            if (isUpdated) {
                return ResponseEntity.ok("게시글 수정 성공");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            logger.error("게시글 수정 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 수정 실패");
        }
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        try {
            boolean isDeleted = postService.deletePost(id);
            if (isDeleted) {
                return ResponseEntity.ok("게시글 삭제 성공");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            logger.error("게시글 삭제 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 삭제 실패");
        }
    }
}