package net.guides.springboot2.springboot2webappjsp.controllers;

import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.domain.UserProfilePicture;
import net.guides.springboot2.springboot2webappjsp.jwt.JwtUtils;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import net.guides.springboot2.springboot2webappjsp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

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

    @PostMapping("/upload")
    public UserProfilePicture uploadProfilePicture(@RequestParam("file") MultipartFile file, String username) throws Exception, IOException{
        User user = userRepository.findByUsername(username).get();
        return userService.store(file, user);

    }

   @GetMapping("/getprofilepicture")
    public UserProfilePicture getProfilePicture(@RequestParam("username") String username) throws Exception {
       User user = userRepository.findByUsername(username).get();

       return userService.getByUser(user);
   }

   @GetMapping("/getuser")
    public User getUserDetails(@RequestHeader (name="Authorization") String token) {
       String username=jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
       User thisUser = userRepository.findByUsername(username).get();
       return thisUser;
   }

   @PostMapping("/setupuser")
    public ResponseEntity<?> setUpUser(@RequestParam("username") String username, @RequestParam("name") String name, @RequestParam("bio") String bio) {
        System.out.println("i love beans");
       User thisUser = userRepository.findByUsername(username).get();
       thisUser.setFirstName(name);
       thisUser.setBio(bio);


       return ResponseEntity.ok(userRepository.save(thisUser));
   }


    @PostMapping("/changeusername")
    public User changeUsername(String newUsername, @RequestHeader (name="Authorization") String token) {
        String username=jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
        User thisUser = userRepository.findByUsername(username).get();

        if(!userRepository.existsByUsername(newUsername)) {
            thisUser.setUsername(newUsername);
            return userRepository.save(thisUser);
        }

        return null;
    }

    @PostMapping("/changeemail")
    public User changeEmail(String newEmail, @RequestHeader (name="Authorization") String token) {
        String username=jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
        User thisUser = userRepository.findByUsername(username).get();

        if(!userRepository.existsByEmail(newEmail)) {
            thisUser.setEmail(newEmail);
            return userRepository.save(thisUser);
        }

        return null;
    }

    @PostMapping("/changename")
    public User changeName(@RequestParam("newName") String newName, @RequestHeader (name="Authorization") String token) {
        System.out.println(newName);
        String username=jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
        User thisUser = userRepository.findByUsername(username).get();

        thisUser.setFirstName(newName);
        return userRepository.save(thisUser);

    }

    @PostMapping("/changebio")
    public User changeBio(@RequestParam("newBio") String newBio, @RequestHeader (name="Authorization") String token) {
        String username=jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
        User thisUser = userRepository.findByUsername(username).get();


        thisUser.setBio(newBio);
        return userRepository.save(thisUser);

    }

}
