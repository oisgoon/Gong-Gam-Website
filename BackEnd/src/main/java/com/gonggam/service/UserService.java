package com.gonggam.service;

import com.gonggam.entity.User;
import com.gonggam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean registerUser(User user) {
        // 회원가입 로직 구현
        userRepository.save(user); // 사용자 정보를 데이터베이스에 저장
        return true; // 성공 시 true 반환
    }

    public boolean authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password); // 비밀번호 검증 로직
    }
}