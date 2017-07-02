package com.urbupdate.controllers;

import com.urbupdate.model.Notification;
import com.urbupdate.model.User;
import com.urbupdate.repositories.ClaimsRepository;
import com.urbupdate.repositories.NotificationsRepository;
import com.urbupdate.repositories.PhotosRepository;
import com.urbupdate.repositories.UserRepository;
import com.urbupdate.services.UserService;
import com.urbupdate.storage.StorageService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import java.util.ArrayList;
import java.util.List;


@Controller
public class UsersController {


    @Autowired
    private UserService userService;


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PhotosRepository photosRepository;

    @Autowired
    private NotificationsRepository notificationsRepository;

    @Autowired
    private ClaimsRepository claimsRepository;

    private final StorageService storageService;

    @Autowired
    public UsersController(StorageService storageService, ServletContext context) {
        this.storageService = storageService;
    }


    @RequestMapping("/auth")
    @ResponseBody
    public User auth() {
        String userName = getPrincipal();
        User user = userService.findByName(userName);
        return user;
    }

    @RequestMapping("users/{user}/claims")
    public String claims(ModelMap model) {
        model.addAttribute("claims", claimsRepository.findAll());
        return "claims";
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/myspace")
    public String myspace(ModelMap model) {
        model.addAttribute("user", userRepository.findByEmail(getPrincipal()));
        return "myspace";
    }

    @RequestMapping("/getUserNotifications/{user}")
    @ResponseBody
    public List<Notification> getUserNotifications(@PathVariable Integer user) {
        User user1 = userRepository.findOne(user);
        List<Notification> notifications = user1.getNotifications();
        return notifications;
    }

    public String getPrincipal() {
        String userName = null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            userName = ((UserDetails) principal).getUsername();
        } else {
            userName = principal.toString();
        }
        return userName;
    }
}
