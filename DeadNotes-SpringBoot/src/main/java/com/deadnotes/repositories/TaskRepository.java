package com.deadnotes.repositories;


import com.deadnotes.entities.Group;
import com.deadnotes.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Integer> {

    List<Task> getAllByTasksGroup (Group group);
    List<Task> getAllByTasksGroupOrderByTimeCreated(Group group);

    List<Task> getAllByTasksGroupAndStatusOrderByTimeCreated(Group group, int status);

    List<Task> getAllByTasksGroupAndStatusAndDeadlineBetweenOrderByTimeCreated(
            Group group, int status, Date current , Date expired);

    List<Task> getAllByTasksGroupAndStatusAndDeadlineGreaterThanOrderByTimeCreated(
            Group group , int status , Date date);


}
