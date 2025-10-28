package com.yassin.hotelManager.service;

import java.util.List;

import com.yassin.hotelManager.model.User;



public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
}
