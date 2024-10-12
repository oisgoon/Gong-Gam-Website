package com.gonggam.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    @JsonBackReference // 순환 참조 해결
    private Post post;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String author;

    @CreationTimestamp // 생성 시간 자동 기록
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // 기본 생성자
    public Comment() {}

    // 생성자 (내용과 게시글을 설정하는 용도)
    public Comment(String content, Post post) {
        this.content = content;
        this.post = post;
    }
}