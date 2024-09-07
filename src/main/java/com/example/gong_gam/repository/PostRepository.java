// src/main/java/com/example/gonggam/repository/PostRepository.java
package com.example.gong_gam.repository;

import com.example.gong_gam.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}