package com.gonggam.repository;

import com.gonggam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByUserid(String userid); // userid로 사용자 찾기
}