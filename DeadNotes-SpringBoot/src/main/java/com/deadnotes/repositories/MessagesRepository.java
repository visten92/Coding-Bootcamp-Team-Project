package com.deadnotes.repositories;

import com.deadnotes.entities.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessagesRepository extends JpaRepository<Messages,Integer> {

}
