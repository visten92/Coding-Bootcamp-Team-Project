package com.deadnotes.repositories;

import com.deadnotes.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

//@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    User findByUsernameAndPassword (String username, String password);
    User findByUsername(String username);

}
