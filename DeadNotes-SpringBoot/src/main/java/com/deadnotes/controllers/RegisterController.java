package com.deadnotes.controllers;

import com.deadnotes.encyption.CryptoConverter;
import com.deadnotes.repositories.TokenRepository;
import com.deadnotes.entities.Token;
import com.deadnotes.entities.User;
import com.deadnotes.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class RegisterController {

    private UserRepository userRepository;
    private TokenRepository tokenRepository;
    private CryptoConverter cryptoConverter;

    public RegisterController(UserRepository userRepository, TokenRepository tokenRepository, CryptoConverter cryptoConverter) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.cryptoConverter = cryptoConverter;
    }

    @PostMapping("/register")
    public Map<String,Object> register(HttpServletRequest request){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String password2 = request.getParameter("password2");
        String email = request.getParameter("email");
        User user = userRepository.findByUsername(username);
        System.out.println(user);
        if (!password.equals(password2) || user != null){
            return null;
        }
        Map<String,Object> map = new HashMap<>();
        password = cryptoConverter.encrypt(password);
        userRepository.save(new User(username,password,email));
        user = userRepository.findByUsername(username);
        String uuid = UUID.randomUUID().toString();
        Token token = new Token(uuid, user.getId_user());
        tokenRepository.save(token);
        map.put("token",token);
        return map;
    }


}
