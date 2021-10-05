package net.guides.springboot2.springboot2webappjsp.controllers;

import net.guides.springboot2.springboot2webappjsp.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;

import java.util.List;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserRepository userRepo;


    // When user clicks "Sign Up" navigate to sign up registration form
    @GetMapping("/list")
    public @ResponseBody List<User> getAllUsers() {
        return userRepo.findAll();
    }


}
