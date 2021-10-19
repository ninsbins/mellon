package net.guides.springboot2.springboot2webappjsp.controllers;

import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(Map<String, String> payload) throws IOException {
        String username = payload.get("username");
        User thisUser = userRepository.findByUsername(username).get();

        if(payload.containsKey("firstName")) {
            // TODO: edit first name
            thisUser.setFirstName(payload.get("firstName"));
        }

        if(payload.containsKey("lastName")) {
            // TODO: edit last name
            thisUser.setLastName(payload.get("lastName"));
        }

        if(payload.containsKey("username")) {
            // TODO: edit email
            //
            if(!userRepository.existsByUsername(payload.get("username"))) {
                thisUser.setEmail(payload.get("username"));
            } else {
                return (ResponseEntity<?>) ResponseEntity.badRequest();
            }
        }

        if(payload.containsKey("email")) {
            // TODO: edit email
            //
            if(!userRepository.existsByEmail(payload.get("email"))) {
                thisUser.setEmail(payload.get("email"));
            } else {
                return (ResponseEntity<?>) ResponseEntity.badRequest();
            }
        }

        if(payload.containsKey("bio")) {
            // TODO: edit bio
            thisUser.setBio(payload.get("bio"));
        }

        if(payload.containsKey("image")) {
            // TODO: edit profile pic
            thisUser.setImage(payload.get("image"));
        }

        userRepository.save(thisUser);
        return ResponseEntity.ok(thisUser);
    }

}
