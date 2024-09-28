package com.gonggam.controller;

import com.gonggam.entity.User;
import com.gonggam.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        boolean isRegistered = userService.registerUser(user);
        return isRegistered
                ? ResponseEntity.ok()
                .header("Content-Type", "text/plain; charset=UTF-8")
                .body("회원가입 성공")
                : ResponseEntity.badRequest()
                .header("Content-Type", "text/plain; charset=UTF-8")
                .body("회원가입 실패");
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user, HttpSession session) {
        boolean isAuthenticated = userService.authenticateUserByUserid(user.getUserid(), user.getPassword());
        if (isAuthenticated) {
            // 로그인 성공 시 userid와 username을 세션에 저장
            String username = userService.findUsernameByUserid(user.getUserid());
            session.setAttribute("userid", user.getUserid());  // userid도 세션에 저장
            session.setAttribute("username", username);  // username도 세션에 저장

            return ResponseEntity.ok()
                    .header("Content-Type", "text/plain; charset=UTF-8")
                    .body("로그인 성공");
        } else {
            return ResponseEntity.status(401)
                    .header("Content-Type", "text/plain; charset=UTF-8")
                    .body("로그인 실패: 잘못된 아이디 또는 비밀번호");
        }
    }

    // 로그인된 사용자 정보 가져오기
    @GetMapping("/me")

    public ResponseEntity<Map<String, String>> getCurrentUser(HttpSession session) {
        String userid = (String) session.getAttribute("userid");
        String username = (String) session.getAttribute("username");

        if (userid != null && username != null) {
            Map<String, String> userInfo = new HashMap<>();
            userInfo.put("userid", userid);  // 세션에서 userid 가져옴
            userInfo.put("username", username);  // 세션에서 username 가져옴
            return ResponseEntity.ok(userInfo);
        } else {
            return ResponseEntity.status(401).body(null);  // 인증되지 않은 경우 401 반환
        }
    }
}