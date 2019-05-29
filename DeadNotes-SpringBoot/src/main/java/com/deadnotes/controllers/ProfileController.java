package com.deadnotes.controllers;


import com.deadnotes.encyption.CryptoConverter;
import com.deadnotes.entities.User;
import com.deadnotes.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProfileController {

    private UserRepository userRepository;
    private CryptoConverter cryptoConverter;

    public ProfileController(UserRepository userRepository, CryptoConverter cryptoConverter) {
        this.userRepository = userRepository;
        this.cryptoConverter = cryptoConverter;
    }

    @GetMapping("profile/user")
    public User fetchUser(HttpServletRequest request){
        String username = request.getParameter("username");
        return userRepository.findByUsername(username);
    }

    @PutMapping("profile/email")
    public User setEmail (HttpServletRequest request){
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        User user = userRepository.findByUsername(username);
        if (user == null){
            return null;
        }
        user.setEmail(email);
        userRepository.save(user);
        return user;
    }

    @PutMapping("/profile/username")
    public User setUsername(HttpServletRequest request){
        String oldUsername = request.getParameter("oldUsername");
        String newUsername = request.getParameter("newUsername");
        User user = userRepository.findByUsername(oldUsername);
        if (userRepository.findByUsername(newUsername) != null || user == null){
            return null;
        }
        user.setUsername(newUsername);
        userRepository.save(user);
        return user;
    }

    @PutMapping("/profile/password")
    public User setPassword (HttpServletRequest request){
        String username = request.getParameter("username");
        String oldPassword = request.getParameter("oldPassword");
        oldPassword = cryptoConverter.encrypt(oldPassword);
        String newPassword = request.getParameter("newPassword");
        String newPassword2 = request.getParameter("newPassword2");

        User user = userRepository.findByUsernameAndPassword(username,oldPassword);
        if (user == null || !newPassword.equals(newPassword2) ){
            return null;
        }
        newPassword = cryptoConverter.encrypt(newPassword);
        user.setPassword(newPassword);
        userRepository.save(user);
        return user;
    }



}
