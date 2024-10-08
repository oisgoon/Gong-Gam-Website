package com.gonggam.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "comments")  // 테이블 이름을 명시적으로 설정
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Column(nullable = false)
    private String userId;  // 사용자 ID

    @Column(nullable = false)
    private String author;  // 작성자 이름

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;  // 작성 시간 추가

    // 기본 생성자
    public Comment() {}

    // 생성자 (내용과 게시글을 설정하는 용도)
    public Comment(String content, Post post) {
        this.content = content;
        this.post = post;
    }
}