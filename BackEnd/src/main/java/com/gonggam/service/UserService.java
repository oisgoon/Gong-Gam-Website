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
        if (isUserIdTaken(user.getUserid())) {
            return false; // userid 중복 시 실패 반환
        }
        userRepository.save(user);
        return true;
    }

    public boolean authenticateUserByUserid(String userid, String password) {
        User user = userRepository.findByUserid(userid);
        return user != null && user.getPassword().equals(password);
    }

    public boolean isUserIdTaken(String userid) {
        return userRepository.findByUserid(userid) != null;
    }
}