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

    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody Post post) {
        postService.createPost(post);
        return ResponseEntity.ok("게시글 작성 성공");
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePost(@PathVariable Long id, @RequestBody Post post) {
        postService.updatePost(id, post);
        return ResponseEntity.ok("게시글 수정 성공");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok("게시글 삭제 성공");
    }
}