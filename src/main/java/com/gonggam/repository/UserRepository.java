// src/main/java/com/gonggam/repository/UserRepository.java
package com.gonggam.repository;

import com.gonggam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}