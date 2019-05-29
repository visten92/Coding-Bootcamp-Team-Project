package com.deadnotes.repositories;

import com.deadnotes.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;

//@Repository
public interface GroupRepository extends JpaRepository<Group,Integer> {

    Group getByGroupName(String groupName);
    Group getFirstByGroupName(String groupName);

}
