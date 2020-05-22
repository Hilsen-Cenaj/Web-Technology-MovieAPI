package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;


@RestController
@RequestMapping(path="/")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(value="/signup")
    public ResponseEntity addNewUser( @ModelAttribute("user") User u){
        try {
            userRepository.save(u);
            return new ResponseEntity("Success", HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity("Fail",HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping(path="/users")
    public @ResponseBody
    ModelAndView actions( Model model) throws IOException {
        model.addAttribute("users", userRepository.findAll());
        return new ModelAndView("/users.html");
    }

}
