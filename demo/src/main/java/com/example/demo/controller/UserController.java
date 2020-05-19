package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.entity.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@RestController
@RequestMapping(path="/")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/signup")
    public @ResponseBody String addNewUser( @RequestParam String email, @RequestParam String password){
        User n = new User(email,password);
        userRepository.save(n);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }


    @GetMapping(path="/users")
    public @ResponseBody
    ModelAndView actions( Model model) throws IOException {
        model.addAttribute("users", userRepository.findAll());

        return new ModelAndView("/users.html");
    }

    @PostMapping(path="/user")
    public @ResponseBody
    String getUser(@RequestParam String email, @RequestParam String password, Model model) throws IOException{
        User u = userRepository.findUserByEmailAndPassword(email, password);
        model.addAttribute("user", u);

        return "Welcome User " + u.getId();
    }

}
