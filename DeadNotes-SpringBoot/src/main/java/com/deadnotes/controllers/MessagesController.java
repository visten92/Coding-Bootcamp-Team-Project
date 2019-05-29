package com.deadnotes.controllers;


import com.deadnotes.entities.Group;
import com.deadnotes.entities.Messages;
import com.deadnotes.entities.User;
import com.deadnotes.repositories.GroupRepository;
import com.deadnotes.repositories.MessagesRepository;
import com.deadnotes.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class MessagesController {

    private MessagesRepository messagesRepository;
    private GroupRepository groupRepository;
    private UserRepository userRepository;

    public MessagesController(MessagesRepository messagesRepository, GroupRepository groupRepository, UserRepository userRepository) {
        this.messagesRepository = messagesRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/messages/{id}")
    public List<Messages> fetchMessages(@PathVariable("id") int id){
        Group group = groupRepository.getOne(id);
        return group.getGroupsMessages();
    }

    @PostMapping("/message/save/{id}")
    public  List<Messages> saveMessage(@PathVariable("id") int id, HttpServletRequest request){
        Group group = groupRepository.getOne(id);
        String username = request.getParameter("username");
        String message = request.getParameter("message");
        User user = userRepository.findByUsername(username);
        if (!group.getGroupUsers().contains(user)){
            return null;
        }
        Messages messages = new Messages(message,user,group);
        messagesRepository.save(messages);

        return group.getGroupsMessages();
    }
}
