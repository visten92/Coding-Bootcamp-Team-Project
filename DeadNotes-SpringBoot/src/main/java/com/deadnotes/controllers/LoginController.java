package com.deadnotes.controllers;

import com.deadnotes.encyption.CryptoConverter;
import com.deadnotes.entities.Token;
import com.deadnotes.repositories.TokenRepository;
import com.deadnotes.entities.User;
import com.deadnotes.repositories.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class LoginController {


    private UserRepository userRepository;
    private TokenRepository tokenRepository;
    private CryptoConverter cryptoConverter;

    public LoginController(UserRepository userRepository, TokenRepository tokenRepository, CryptoConverter cryptoConverter) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.cryptoConverter = cryptoConverter;
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public Map<String, Object> login(HttpServletRequest request) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        password = cryptoConverter.encrypt(password);
        User user = userRepository.findByUsernameAndPassword(username, password);
        if (user != null) {
            String uuid = UUID.randomUUID().toString();
            Token token = new Token(uuid, user.getId_user());
            tokenRepository.save(token);
            Map<String, Object> map = new HashMap<>();
            map.put("token",token);
            map.put("username",user.getUsername());
            return map;
        }
        return null;
    }


}
