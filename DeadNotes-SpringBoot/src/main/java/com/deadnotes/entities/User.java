package com.deadnotes.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
public class User  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_user;
    private String username;
    @JsonIgnore
    private String password;
//    @JsonIgnore
    private String email;
    @JsonIgnore
    private Integer id_app_role;
    @JsonIgnore
    private Integer id_active_user;

    @JsonIgnore
    @ManyToMany(mappedBy = "groupUsers")
    private List<Group> userGroups;

    @JsonIgnore
    @OneToMany(mappedBy = "groupCreator")
    private List<Group> groupsCreated;

    @JsonIgnore
    @OneToMany(mappedBy = "delegator")
    private List<Task> tasksAssinged;

    @JsonIgnore
    @OneToMany(mappedBy = "assignedUser")
    private List<Task> assignedTasks;

    @JsonIgnore
    @OneToMany(mappedBy = "sender")
    private List<Messages> messagesSent;

    public User() {
    }


    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.id_app_role = 1;
    }

    public User(String username, String password, String email, Integer id_app_role, Integer id_active_user) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.id_app_role = id_app_role;
        this.id_active_user = id_active_user;
    }

    public User(String username, String password, String email, Integer id_app_role, Integer id_active_user, List<Group> userGroups) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.id_app_role = id_app_role;
        this.id_active_user = id_active_user;
        this.userGroups = userGroups;
    }

    public User(String username, String password, String email, Integer id_app_role, Integer id_active_user, List<Group> userGroups, List<Group> groupsCreated) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.id_app_role = id_app_role;
        this.id_active_user = id_active_user;
        this.userGroups = userGroups;
        this.groupsCreated = groupsCreated;
    }

    public List<Task> getTasksAssinged() {
        return tasksAssinged;
    }

    public void setTasksAssinged(List<Task> tasksAssinged) {
        this.tasksAssinged = tasksAssinged;
    }

    public List<Task> getAssignedTasks() {
        return assignedTasks;
    }

    public void setAssignedTasks(List<Task> assignedTasks) {
        this.assignedTasks = assignedTasks;
    }

    public List<Messages> getMessagesSent() {
        return messagesSent;
    }

    public void setMessagesSent(List<Messages> messagesSent) {
        this.messagesSent = messagesSent;
    }

    public List<Group> getGroupsCreated() {
        return groupsCreated;
    }

    public void setGroupsCreated(List<Group> groupsCreated) {
        this.groupsCreated = groupsCreated;
    }

    public Integer getId_user() {
        return id_user;
    }

    public void setId_user(Integer id_user) {
        this.id_user = id_user;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getId_app_role() {
        return id_app_role;
    }

    public void setId_app_role(Integer id_app_role) {
        this.id_app_role = id_app_role;
    }

    public Integer getId_active_user() {
        return id_active_user;
    }

    public void setId_active_user(Integer id_active_user) {
        this.id_active_user = id_active_user;
    }

    public List<Group> getUserGroups() {
        return userGroups;
    }

    public void setUserGroups(List<Group> userGroups) {
        this.userGroups = userGroups;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
