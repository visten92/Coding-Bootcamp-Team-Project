package com.deadnotes.controllers;

import com.deadnotes.email.EmailHelper;
import com.deadnotes.entities.Group;
import com.deadnotes.entities.Task;
import com.deadnotes.entities.User;
import com.deadnotes.repositories.GroupRepository;
import com.deadnotes.repositories.TaskRepository;
import com.deadnotes.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TasksController {

    private UserRepository userRepository;
    private GroupRepository groupRepository;
    private TaskRepository taskRepository;


    public TasksController(UserRepository userRepository, GroupRepository groupRepository, TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.taskRepository = taskRepository;

    }

//    @PostMapping("/ssss")
//    public Long sss() {
//        Date date = new Date(System.currentTimeMillis() - 24 * 3600 * 1000);
//        System.out.println(date.getTime());
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
//
//        try {
//            java.sql.Date currentTime = new java.sql.Date(date.getTime());
//            System.out.println(currentTime);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return date.getTime();
//    }


    @PutMapping("task/completed/{id}")
    public int markAsCompleted(@PathVariable("id") int id) {
        Task task = taskRepository.getOne(id);
        task.setStatus(4);
        taskRepository.save(task);
        return id;
    }

    @DeleteMapping("/task/{id}")
    public int deleteExpireAndCompletedTasks(@PathVariable("id") int id) {

        taskRepository.deleteById(id);

        return id;
    }

    @DeleteMapping("tasks/clear/{id}")
    public int clearTasks(@PathVariable("id") int id) {
        Group group = groupRepository.getOne(id);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis() - 48 * 3600 * 1000);
        Date dateFixed;
        java.sql.Date currentTime = null;
        java.sql.Date fixedTime = null;
        String dateString = "1000-01-01";
        try {
            currentTime = new java.sql.Date(date.getTime());
            dateFixed = formatter.parse(dateString);
            fixedTime = new java.sql.Date(dateFixed.getTime());
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("problem with time formatter");
        }
        List<Task> expired = taskRepository.getAllByTasksGroupAndStatusAndDeadlineBetweenOrderByTimeCreated(
                group, 1, fixedTime, currentTime);
        taskRepository.deleteAll(expired);
        List<Task> completed = taskRepository.getAllByTasksGroupAndStatusOrderByTimeCreated(group, 4);
        taskRepository.deleteAll(completed);
        return id;
    }


    @PostMapping("/tasks")
    public List<Task> fetchTasks(HttpServletRequest request) {
        String username = request.getParameter("username");
        Integer id_group = Integer.parseInt(request.getParameter("id_group"));
        int status = Integer.parseInt(request.getParameter("status"));
        Group group = groupRepository.getOne(id_group);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis() - 48 * 3600 * 1000);
        Date dateFixed;
        java.sql.Date currentTime = null;
        java.sql.Date fixedTime = null;
        String dateString = status == 1 ? "3000-01-01" : "1000-01-01";
        try {
            currentTime = new java.sql.Date(date.getTime());
            dateFixed = formatter.parse(dateString);
            fixedTime = new java.sql.Date(dateFixed.getTime());
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (status == 1) {
            return taskRepository.getAllByTasksGroupAndStatusAndDeadlineGreaterThanOrderByTimeCreated(
                    group, 1, currentTime);
        } else if (status == 2) {
            return taskRepository.getAllByTasksGroupAndStatusOrderByTimeCreated(group, status);
        } else if (status == 3) {
            return taskRepository.getAllByTasksGroupAndStatusAndDeadlineBetweenOrderByTimeCreated(
                    group, 1, fixedTime, currentTime);
        } else if (status == 4) {
            return taskRepository.getAllByTasksGroupAndStatusOrderByTimeCreated(group, status);
        }
        return null;
    }

    @PostMapping("/tasks/assign")
    public List<Task> assignTask(HttpServletRequest request) {
        String username = request.getParameter("username");
        String taskBody = request.getParameter("task");
        String taskTitle = request.getParameter("taskTitle");
        Integer id_group = Integer.parseInt(request.getParameter("id_group"));
        String dateString = request.getParameter("deadline");
        int status = Integer.parseInt(request.getParameter("status"));
        User user = userRepository.findByUsername(username);
        Group group = groupRepository.getOne(id_group);
        User creator = group.getGroupCreator();
        Date date;
        java.sql.Date sqlDate = null;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            date = formatter.parse(dateString);
            sqlDate = new java.sql.Date(date.getTime());
        } catch (Exception e) {
            e.printStackTrace();
        }
        Task task = new Task(taskTitle, taskBody, sqlDate, group, creator, user, status);
        taskRepository.save(task);
        List<Task> tasks = taskRepository.getAllByTasksGroupOrderByTimeCreated(group);

        return tasks;
    }


}
