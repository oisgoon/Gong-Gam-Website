package com.gonggam.controller;

import com.gonggam.entity.User;
import com.gonggam.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user, HttpSession session) {
        boolean isAuthenticated = userService.authenticateUserByUserid(user.getUserid(), user.getPassword());
        Map<String, String> response = new HashMap<>();

        if (isAuthenticated) {
            String username = userService.findUsernameByUserid(user.getUserid());
            session.setAttribute("userid", user.getUserid());
            session.setAttribute("username", username);

            response.put("message", "로그인 성공");
            response.put("userid", user.getUserid());
            response.put("username", username);
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "로그인 실패: 잘못된 아이디 또는 비밀번호");
            return ResponseEntity.status(401).body(response);
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

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        // 세션 무효화
        request.getSession().invalidate();

        // 로그아웃 후 쿠키를 삭제
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setHttpOnly(true);  // XSS 공격 방지
        cookie.setSecure(true);  // HTTPS에서만 쿠키 전송
        cookie.setMaxAge(0);  // 즉시 쿠키 삭제
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok().build();
    }
}