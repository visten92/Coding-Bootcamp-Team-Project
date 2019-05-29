package com.deadnotes.email;


import com.deadnotes.entities.Task;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailHelper {

    private JavaMailSender javaMailSender;

    public EmailHelper(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendSimpleMessage(Task task) {
        String sender = task.getAssignedUser().getUsername();
        String receiverEmail = task.getDelegator().getEmail();
        String taskTitle = task.getTaskTitle();
        String taskBody = task.getTask();

        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(receiverEmail);

        message.setSubject(taskTitle +": Update");
        message.setText("The task is completed, please review,\n\n Thank you,\n"+sender);

        javaMailSender.send(message);

    }

}
