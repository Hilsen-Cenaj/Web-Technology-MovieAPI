package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path="/")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/signup")
    public @ResponseBody String addNewUser(@RequestParam String email, @RequestParam String password){
        User n = new User(email,password);
        userRepository.save(n);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }


}
