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

    public void savePost(Post post) {
        postRepository.save(post);
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

    // 수정: 조회수만 증가시키는 메서드 (수정 시간 변경 X)
    public void incrementViews(Long id) {
        postRepository.incrementViews(id);  // 커스텀 쿼리를 사용해 조회수만 증가
    }

    public boolean updatePost(Long id, Post updatedPost) {
        Post existingPost = getPostById(id);
        if (existingPost != null) {
            existingPost.setTitle(updatedPost.getTitle());
            existingPost.setContent(updatedPost.getContent());
            existingPost.setAuthor(updatedPost.getAuthor());
            postRepository.save(existingPost);
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