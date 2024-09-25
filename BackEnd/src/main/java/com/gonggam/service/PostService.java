package com.gonggam.service;

import com.gonggam.entity.Post;
import com.gonggam.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // 게시글 저장 메서드 추가
    public void savePost(Post post) {
        postRepository.save(post);  // 수정된 게시글을 데이터베이스에 저장
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    public void createPost(Post post) {
        postRepository.save(post);
    }

    public boolean updatePost(Long id, Post updatedPost) {
        Post existingPost = getPostById(id);
        if (existingPost != null) {
            existingPost.setTitle(updatedPost.getTitle());
            existingPost.setContent(updatedPost.getContent());
            existingPost.setAuthor(updatedPost.getAuthor());
            postRepository.save(existingPost);  // 수정된 게시글 저장
            return true;
        }
        return false;
    }

    public boolean deletePost(Long id) {
        Post post = getPostById(id);
        if (post != null) {
            postRepository.delete(post);
            return true;
        }
        return false;
    }
}