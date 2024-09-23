package com.gonggam.service;

import com.gonggam.entity.Comment;
import com.gonggam.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public void createComment(Comment comment) {
        commentRepository.save(comment);
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    // 댓글 수정 및 삭제 메서드 추가 가능
}