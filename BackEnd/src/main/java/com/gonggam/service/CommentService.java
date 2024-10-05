package com.gonggam.service;

import com.gonggam.entity.Comment;
import com.gonggam.entity.Post;
import com.gonggam.repository.CommentRepository;
import com.gonggam.repository.PostRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    // 생성자 주입
    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    // 댓글 생성 메서드
    public void createComment(Comment comment, Long postId) {
        // postId로 게시글을 조회
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 게시글을 찾을 수 없습니다: " + postId));

        // 댓글에 게시글 설정
        comment.setPost(post);

        // 댓글 저장
        commentRepository.save(comment);
    }

    // 특정 게시글의 댓글 목록 조회
    public List<Comment> getCommentsByPostId(Long postId) {
        // 해당 게시글의 댓글을 조회
        return commentRepository.findByPostId(postId);
    }

    @Transactional
    public void deleteComment(Long commentId) {
        // 댓글 삭제 로직 (commentId로 삭제)
        commentRepository.deleteById(commentId);
    }
}