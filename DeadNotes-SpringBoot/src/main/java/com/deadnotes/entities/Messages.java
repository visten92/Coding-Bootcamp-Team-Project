package com.deadnotes.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "messages")
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_message;
    private String message;
    @Column(name = "time",   columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP",insertable = false, updatable = false)
    private Timestamp time;

//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="id_user")
    private User sender;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="id_group")
    private Group messagesGroup;

    public Messages() {
    }

    public Messages(String message, User sender, Group messagesGroup) {
        this.message = message;
        this.sender = sender;
        this.messagesGroup = messagesGroup;
    }

    public int getId_message() {
        return id_message;
    }

    public void setId_message(int id_message) {
        this.id_message = id_message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public Group getMessagesGroup() {
        return messagesGroup;
    }

    public void setMessagesGroup(Group messagesGroup) {
        this.messagesGroup = messagesGroup;
    }
}
