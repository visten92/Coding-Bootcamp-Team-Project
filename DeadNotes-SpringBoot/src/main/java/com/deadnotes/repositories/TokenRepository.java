package com.deadnotes.repositories;

import com.deadnotes.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token,String> {

}
