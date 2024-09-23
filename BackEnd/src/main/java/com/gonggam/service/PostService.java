package com.gonggam.service;

import com.gonggam.entity.Post;
import com.gonggam.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // 게시글 작성
    public void createPost(Post post) {
        postRepository.save(post);
    }

    // 모든 게시글 가져오기
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // ID로 게시글 하나 가져오기
    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);  // 존재하지 않으면 null 반환
    }

    // 게시글 수정
    public boolean updatePost(Long id, Post post) {
        if (postRepository.existsById(id)) {  // 해당 ID의 게시글이 있는지 확인
            post.setId(id);  // 기존 게시글 ID를 유지
            postRepository.save(post);  // 게시글 수정
            return true;  // 수정 성공 시 true 반환
        } else {
            return false;  // 해당 게시글이 없으면 false 반환
        }
    }

    // 게시글 삭제
    public boolean deletePost(Long id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return true;  // 삭제 성공 시 true 반환
        } else {
            return false;  // 해당 게시글이 없으면 false 반환
        }
    }
}