package com.urbupdate.repositories;

import com.urbupdate.model.Notification;
import com.urbupdate.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Integer> {
    User findByName(String name);
    User findByEmail(String email);
}
