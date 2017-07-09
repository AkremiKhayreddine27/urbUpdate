package com.urbupdate.controllers.api;

import com.urbupdate.forms.Register;
import com.urbupdate.model.Claim;
import com.urbupdate.model.Role;
import com.urbupdate.model.User;
import com.urbupdate.repositories.RoleRepository;
import com.urbupdate.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UsersApiController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<User> index() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/{user}", method = RequestMethod.GET)
    public User show(@PathVariable Integer user) {
        return userRepository.findOne(user);
    }


    @RequestMapping("/{user}/claims")
    public Collection<Claim> listClaims(@PathVariable Integer user) {
        User user1 = userRepository.findOne(user);
        return user1.getClaims();
    }

    @RequestMapping(value = "/{user}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Integer user) {
        userRepository.delete(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
    public void edit(@PathVariable Integer id, @RequestBody User user) {
        User user1 = userRepository.findOne(id);
        user.setPassword(user1.getPassword());
        user.setRoles(user1.getRoles());
        userRepository.save(user);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<?> store(@Valid @RequestBody Register user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(bindingResult.getAllErrors());
        } else {
            User newUser = new User();
            newUser.setName(user.getName());
            newUser.setEmail(user.getEmail());
            newUser.setPassword(user.getPassword());
            newUser.setRoles(user.getRoles());
            User u = userRepository.save(newUser);
            return ResponseEntity.ok(u);
        }
    }

    @RequestMapping(value = "/{user}/assignRole", method = RequestMethod.POST)
    public void assignRole(@PathVariable Integer user, @RequestBody Integer[] roles) {
        Set<Role> roles1 = new HashSet<Role>();
        for (Integer i : roles) {
            roles1.add(roleRepository.findOne((long) i));
        }
        User user1 = userRepository.findOne(user);
        user1.setRoles(roles1);
        userRepository.save(user1);
    }
}
