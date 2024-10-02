package com.gonggam.controller;

import com.gonggam.entity.Post;
import com.gonggam.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        postService.incrementViews(id);  // 조회 시 조회수 증가
        Post post = postService.getPostById(id);
        if (post != null) {
            return ResponseEntity.ok(post);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody Post post) {
        postService.createPost(post);
        return ResponseEntity.ok("게시글 작성 성공");
    }

    // 다른 CRUD 메서드들도 필요에 따라 추가...
}