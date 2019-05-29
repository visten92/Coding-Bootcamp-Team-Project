package com.deadnotes.controllers;

import com.deadnotes.entities.Group;
import com.deadnotes.entities.User;
import com.deadnotes.repositories.GroupRepository;
import com.deadnotes.repositories.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class GroupsController {

    private UserRepository userRepository;
    private GroupRepository groupRepository;

    public GroupsController(UserRepository userRepository, GroupRepository groupRepository) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
    }

    @PostMapping("/groups")
    public List<Group> fetchGroups(HttpServletRequest request) {
        String username = request.getParameter("username");
        User user = userRepository.findByUsername(username);
        List<Group> groupList = user.getUserGroups();
        return groupList;
    }

    @PostMapping("/groupsCreated")
    public List<Group> fetchCreatedGroups(HttpServletRequest request) {
        String username = request.getParameter("username");
        User user = userRepository.findByUsername(username);
        return user.getGroupsCreated();
    }


    @PostMapping("/group/save")
    public List<Group> saveGroup(HttpServletRequest request) {
        String username = request.getParameter("username");
        String groupName = request.getParameter("groupName");
        User user = userRepository.findByUsername(username);
        List<Group> groupList = user.getUserGroups();
        for (Group group : groupList) {
            if (group.getGroupName().equals(groupName)) {
                return null;
            }
        }
        List<User> users = new ArrayList<>();
        users.add(user);
        groupRepository.save(new Group(groupName, user, users));
        user = userRepository.findByUsername(username);
        return user.getUserGroups();
    }

    @PostMapping("/group/delete")
    public List<Group> deleteCreated(HttpServletRequest request) {
        String username = request.getParameter("username");
        Integer id_group = Integer.parseInt(request.getParameter("id_group"));
        User user = userRepository.findByUsername(username);
        List<Group> groupList = user.getGroupsCreated();
        for (Group group : groupList) {
            if (group.getId_group().equals(id_group)) {
                groupRepository.delete(group);
                groupList.remove(group);
                return groupList;
            }
        }
        return null;
    }

    @PostMapping("/group/users")
    public Map<String, Object> fetchGroupsUsers(HttpServletRequest request) {
        String username = request.getParameter("username");
        Integer id_group = Integer.parseInt(request.getParameter("id_group"));
        Map<String, Object> map = new HashMap<>();
        User user = userRepository.findByUsername(username);
        Group group = groupRepository.getOne(id_group);
        List<User> userList = group.getGroupUsers();
//        userList.remove(user);
        map.put("userList", userList);
        map.put("creator", group.getGroupCreator().getUsername());
        return map;
    }


    @PostMapping("/group/addUser")
    public List<User> addUserToGroup(HttpServletRequest request) {
        String username = request.getParameter("username");
        Integer id_group = Integer.parseInt(request.getParameter("id_group"));
        User user = userRepository.findByUsername(username);
        Group group = groupRepository.getOne(id_group);

        if (user != null && !group.getGroupUsers().contains(user)) {
            List<User> userList = group.getGroupUsers();
            userList.add(user);
            group.setGroupUsers(userList);
            groupRepository.save(group);
//            userList.remove(group.getGroupCreator());
            return userList;
        }
        return null;
    }

    @PostMapping("/group/dismissUser")
    public List<User> dismissUserFromGroup(HttpServletRequest request) {
        String username = request.getParameter("username");
        Integer id_group = Integer.parseInt(request.getParameter("id_group"));
        User user = userRepository.findByUsername(username);
        Group group = groupRepository.getOne(id_group);
        if (user != null && group.getGroupUsers().contains(user)
                && !group.getGroupCreator().equals(user)) {
            List<User> userList = group.getGroupUsers();
            userList.remove(user);
            group.setGroupUsers(userList);
            groupRepository.save(group);
//            userList.remove(group.getGroupCreator());
            return userList;
        }
        return null;
    }

}
