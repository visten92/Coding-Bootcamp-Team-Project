package com.deadnotes.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "groupn")
public class Group  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_group;
    @Column(name = "groupname")
    private String groupName;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="id_creator")
    private User groupCreator;


    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "user_group",
            joinColumns = @JoinColumn(name = "id_group"),
            inverseJoinColumns = @JoinColumn(name = "id_user"))
    private List<User> groupUsers;

    @JsonIgnore
    @OneToMany(mappedBy = "tasksGroup")
    private List<Task> groupsTasks;

    @JsonIgnore
    @OneToMany(mappedBy = "messagesGroup")
    private List<Messages> groupsMessages;

    public Group() {
    }

    public Group(String groupName, User groupCreator) {
        this.groupName = groupName;
        this.groupCreator = groupCreator;
    }

    public Group(String groupName, User groupCreator, List<User> groupUsers) {
        this.groupName = groupName;
        this.groupCreator = groupCreator;
        this.groupUsers = groupUsers;
    }


    public User getGroupCreator() {
        return groupCreator;
    }

    public void setGroupCreator(User groupCreator) {
        this.groupCreator = groupCreator;
    }

    public Integer getId_group() {
        return id_group;
    }

    public void setId_group(Integer id_group) {
        this.id_group = id_group;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public List<User> getGroupUsers() {
        return groupUsers;
    }

    public void setGroupUsers(List<User> groupUsers) {
        this.groupUsers = groupUsers;
    }


    public List<Task> getGroupsTasks() {
        return groupsTasks;
    }

    public void setGroupsTasks(List<Task> groupsTasks) {
        this.groupsTasks = groupsTasks;
    }

    public List<Messages> getGroupsMessages() {
        return groupsMessages;
    }

    public void setGroupsMessages(List<Messages> groupsMessages) {
        this.groupsMessages = groupsMessages;
    }

    @Override
    public String toString() {
        return "Group{" +
                "groupName='" + groupName + '\'' +
                '}';
    }


}
