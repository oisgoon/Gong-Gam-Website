package com.gonggam.entity;

import jakarta.persistence.*;

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

    // 기본 생성자
    public Comment() {}

    // 생성자 (내용과 게시글을 설정하는 용도)
    public Comment(String content, Post post) {
        this.content = content;
        this.post = post;
    }

    // Getter와 Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}