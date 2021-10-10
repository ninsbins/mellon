package net.guides.springboot2.springboot2webappjsp.controllers;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.jwt.JwtUtils;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin(origins="*", maxAge=3600)//to stop the CORS issue on this front-end page(without it, go to Console in Inspections)
@RestController
@RequestMapping("/update") //can test this api point using Postman so e.g. 'http://localhost:8080/api/auth/users/18' NO LONGER
//http://localhost:8080/update/users/18
public class UserControllerTesting {

    //enables you to inject the object dependency implicitly
    @Autowired
    private UserRepository userRepository;

    //get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        System.out.println("Fetching all Users in the DB");
        return userRepository.findAll();
    }

    //Find and GET user object by ID rest api
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        System.out.println("Getting User by their ID.");

        User user = userRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("User does not exist with id:" + id)); //if id not found
        return ResponseEntity.ok(user);
    }

    //Update(PUT) user by ID rest api
    @PutMapping("/users/{id}") //Annotation for mapping HTTP PUT requests onto specific handler methods.
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User userDetails) {

        User user = userRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("User does not exist with id:" + id)); //if id not found
        user.setUsername((userDetails.getUsername()));
        user.setEmail((userDetails.getEmail()));
        user.setPassword((userDetails.getPassword()));
        user.setFirstName((userDetails.getFirstName()));
        user.setLastName((userDetails.getLastName()));

        User updatedUser = userRepository.save(user); //SAVE TO DB
        System.out.println("UPDATED USER OK!");
        return ResponseEntity.ok(updatedUser);
    }

}
