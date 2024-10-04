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

    // 생성자, getter, setter
    public Comment() {}

    public Comment(String content, Post post) {
        this.content = content;
        this.post = post;
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