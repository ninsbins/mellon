package net.guides.springboot2.springboot2webappjsp.controllers;

import net.guides.springboot2.springboot2webappjsp.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;

@Controller
public class UserController {
	@Autowired
	UserRepository userRepo;

//	CORS
	//@CrossOrigin(origins="http://localhost:8080")
	///@GetMapping("/users")
	 ///String home(Model model) {
		//model.addAttribute("users", userRepo.findAll());
		//return "users";
	//}*/

    // When user clicks "Sign Up" navigate to sign up registration form
    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());

        return "users";
    }







	

}
