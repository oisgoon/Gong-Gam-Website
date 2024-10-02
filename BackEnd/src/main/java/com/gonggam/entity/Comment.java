package com.gonggam.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;  // 댓글 내용
    private String userid;   // 댓글 작성자의 사용자 ID
    private String author;   // 댓글 작성자의 이름

    private LocalDateTime createdAt;  // 댓글 작성 시간

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;  // 게시글과의 연관관계

    // 생성자
    public Comment() {
        this.createdAt = LocalDateTime.now();  // 댓글 작성 시간 자동 설정
    }

}