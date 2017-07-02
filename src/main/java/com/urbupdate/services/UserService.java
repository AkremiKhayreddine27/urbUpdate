package com.urbupdate.services;

import com.urbupdate.model.User;

public interface UserService {
    public void save(User user);
    public User findByName(String name);
    public User findByEmail(String email);

}
