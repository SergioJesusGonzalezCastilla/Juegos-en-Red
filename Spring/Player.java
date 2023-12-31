package com.example.demo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Player {
    private String userId;

    public Player(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }
}
