package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;


@RestController
@RequestMapping(path="/")
public class UserController implements ErrorController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/signup")
    public ResponseEntity addNewUser(@ModelAttribute("user") User u) {
        try {
            userRepository.save(u);
            return new ResponseEntity("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Fail", HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping(path = "/users")
    public
    ModelAndView actions(Model model) throws IOException {
        model.addAttribute("users", userRepository.findAll());
        return new ModelAndView("/users.html");
    }

    @PostMapping(path = "/login")
    public ResponseEntity getUser(@ModelAttribute("user") User u, HttpSession session) {
        try {
            User found = userRepository.findUserByEmailAndPassword(u.getEmail(), u.getPassword());
            if (found != null) {
                session.setAttribute("user", found);

                return new ResponseEntity("Success", HttpStatus.OK);
            }
                return new ResponseEntity("Not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity("Fail", HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping(path="/user/bookmarks", produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getBookmarks(@ModelAttribute("user") User u ,Model model ,HttpSession session){

            User newu = userRepository.findUserByEmailAndPassword(u.getEmail(), u.getPassword());
                model.addAttribute("user", newu);
                session.setAttribute("user", newu);//in Session attribute I save the user for the future
            return new ModelAndView("/bookmarks.html");

    }

//Building custom error page

    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public ModelAndView error(Model model, HttpServletResponse r) {
        model.addAttribute("status", r.getStatus());
        return new ModelAndView("/errorpage.html");
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }

}
