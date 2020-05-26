package com.example.demo.controller;

import com.example.demo.entity.Bookmark;
import com.example.demo.entity.BookmarkRepository;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;


@RestController
@RequestMapping(path="/")
public class UserController implements ErrorController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookmarkRepository bookmarkRepository;

    /*
    * Sign up New User
    * */
    @PostMapping(value = "/newuser")
    public ResponseEntity addNewUser(@ModelAttribute("user") User u) {
        try {
            userRepository.save(u);
            return new ResponseEntity("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Fail", HttpStatus.BAD_REQUEST);
        }

    }

    /*
    * Change path (remove '.html')
    * */
    @GetMapping(value="/user")
    public @ResponseBody ModelAndView index_login(){ return new ModelAndView("/index_login.html"); }

    @GetMapping(value="/signup")
    public @ResponseBody ModelAndView signup(){
        return new ModelAndView("../static/signup.html");
    }

    @GetMapping(value="/login")
    public @ResponseBody ModelAndView login(){
        return new ModelAndView("../static/login.html");
    }

    @GetMapping(value="/logout")
    public @ResponseBody ModelAndView logout(HttpSession session){
        session.invalidate();
        return new ModelAndView("../static/login.html");
    }
    /*****************************/

    /*
    * Log in User
    * */
    @PostMapping(path="/user", produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView setBookmarks(@ModelAttribute("user") User u, HttpServletRequest request, HttpSession session){
        session.invalidate();

        HttpSession newSession = request.getSession(); // create session
        User newu = userRepository.findUserByEmailAndPassword(u.getEmail(), u.getPassword());
        
        newSession.setAttribute("user", newu);//in Session attribute I save the user for the future

        return new ModelAndView("/index_login.html");

    }

    /*
    * Go to Bookmarks Page
    * */
    @GetMapping(path="/user/bookmarks", produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getBookmarks(Model model , HttpServletRequest request, HttpSession session){
        HttpSession newSession = request.getSession(); // create session
        User u = (User) newSession.getAttribute("user");
        User newu = userRepository.findUserByEmailAndPassword(u.getEmail(), u.getPassword());
        List<Bookmark> bookmarks=bookmarkRepository.findBookmarksByUserid(newu.getId());
        System.out.println(bookmarks.toString());
        model.addAttribute("user", newu);
        model.addAttribute("bookmarks",bookmarks);
        return new ModelAndView("/bookmarks.html");

    }

    /*
    * Save Movie to Bookmarks page
    * */
    @PostMapping(path="/user/bookmark/{code}")
    public ResponseEntity<String> saveBookmarkByTitle(@ModelAttribute("title") String title, @PathVariable("code") String code, HttpServletRequest request){

            HttpSession session = request.getSession();
            System.out.println(session.getAttribute("user"));
            User u = (User) session.getAttribute("user");
            if(u!=null) {
                Bookmark b = bookmarkRepository.findBookmarksByUseridAndTitle(u.getId(), title);
                if (b == null){
                    bookmarkRepository.save(new Bookmark(u.getId(), title, code));

                    return new ResponseEntity("Success!", HttpStatus.OK);
                }else{
                    return new ResponseEntity("Already exist!", HttpStatus.OK);
                }
            }else{
                return new ResponseEntity("Fail. You should login first!", HttpStatus.BAD_REQUEST);
            }

    }

    @DeleteMapping(path="/user/bookmark/{code}")
    public ResponseEntity<String> deleteBookmarkByTitle(@ModelAttribute("title") String title, @PathVariable("code") String code, HttpServletRequest request){
        HttpSession session = request.getSession();
        System.out.println(session.getAttribute("user"));
        User u = (User) session.getAttribute("user");
        if(u!=null) {
            Bookmark b = bookmarkRepository.findBookmarksByUseridAndTitle(u.getId(), title);
            if (b != null){
                bookmarkRepository.delete(new Bookmark(u.getId(), title, code));
                return new ResponseEntity("Success", HttpStatus.OK);
            }else{
                return new ResponseEntity("Already deleted", HttpStatus.OK);
            }
        }else{
            return new ResponseEntity("Fail", HttpStatus.BAD_REQUEST);
        }
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
