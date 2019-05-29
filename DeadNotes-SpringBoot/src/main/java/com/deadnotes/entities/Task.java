package com.deadnotes.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_task;
    @Column(name = "task_title")
    private String taskTitle;
    private String task;
    @Column(name = "time_created",  columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP",insertable = false, updatable = false)
    private Timestamp timeCreated;
    private Date deadline;
    @Column(name = "id_status")
    private int status;
    @Column(name = "id_priority")
    private int priority;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="id_group")
    private Group tasksGroup;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="delegator_user")
    private User delegator;

//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="assigned_user")
    private User assignedUser;

    public Task() {
    }

    public Task(String taskTitle, String task, Date deadline, Group tasksGroup, User delegator, User assignedUser , int status) {
        this.taskTitle = taskTitle;
        this.task = task;
        this.deadline = deadline;
        this.tasksGroup = tasksGroup;
        this.delegator = delegator;
        this.assignedUser = assignedUser;
        this.priority = 1;
        this.status = status;
    }

    public int getId_task() {
        return id_task;
    }

    public void setId_task(int id_task) {
        this.id_task = id_task;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public Timestamp getTimeCreated() {
        return timeCreated;
    }

    public void setTimeCreated(Timestamp timeCreated) {
        this.timeCreated = timeCreated;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public Group getTasksGroup() {
        return tasksGroup;
    }

    public void setTasksGroup(Group tasksGroup) {
        this.tasksGroup = tasksGroup;
    }

    public User getDelegator() {
        return delegator;
    }

    public void setDelegator(User delegator) {
        this.delegator = delegator;
    }

    public User getAssignedUser() {
        return assignedUser;
    }

    public void setAssignedUser(User assignedUser) {
        this.assignedUser = assignedUser;
    }

    @Override
    public String toString() {
        return "Task{" +
                "taskTitle='" + taskTitle + '\'' +
                ", task='" + task + '\'' +
                ", timeCreated=" + timeCreated +
                ", deadline=" + deadline +
                ", status=" + status +
                ", assignedUser=" + assignedUser +
                '}';
    }
}
