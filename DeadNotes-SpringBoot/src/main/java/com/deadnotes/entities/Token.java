package com.deadnotes.entities;


import javax.persistence.*;

@Entity
@Table(name = "token")
public class Token {

    @Id
    private String uuid;

    private int user_id;

    public Token() {
    }

    public Token(String uuid, int user_id) {
        this.uuid = uuid;
        this.user_id = user_id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
