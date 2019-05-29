package com.deadnotes.controllers;


import com.deadnotes.email.EmailHelper;
import com.deadnotes.entities.Task;
import com.deadnotes.repositories.TaskRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class EmailController {

    private TaskRepository taskRepository;
    private EmailHelper emailHelper;

    public EmailController(TaskRepository taskRepository, EmailHelper emailHelper) {
        this.taskRepository = taskRepository;
        this.emailHelper = emailHelper;
    }

    @PostMapping("/sendEmail/{id}")
    public int sendEmail(@PathVariable("id") int id){
        Task task = taskRepository.getOne(id);
//        emailHelper.sendSimpleMessage(task);
        return id;
    }


}
