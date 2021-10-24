package net.guides.springboot2.springboot2webappjsp.controllers;

import net.guides.springboot2.springboot2webappjsp.domain.Follow;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.jwt.JwtUtils;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import net.guides.springboot2.springboot2webappjsp.services.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/follow")
public class FollowController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    FollowService followService;

    @PostMapping("/followuser")
    public ResponseEntity<?> followUser(@RequestParam("userToFollow") String userToFollow, @RequestHeader(name = "Authorization") String token) throws Exception {
        String thisUsername = jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
        User thisUser = userRepository.findByUsername(thisUsername).get();
        User followUser = userRepository.findByUsername(userToFollow).get();
        System.out.println(thisUsername);
        System.out.println(followUser);

        Follow savedFollow = followService.saveFollow(thisUser, followUser);
        return ResponseEntity.ok(savedFollow);
    }

    @GetMapping("/followers")
    public List<User> getFollows(String username) throws Exception {
        System.out.println("USERNAME: " + username);

        User thisUser = userRepository.findByUsername(username).get();
        List<Follow> followList = followService.getUserAsFollowed(thisUser);

        List<User> returnList = new ArrayList<User>();
        for (Follow item : followList) {
            User newUser = item.getFollower();
            returnList.add(newUser);
        }

        return returnList;
    }

    @GetMapping("/following")
    public List<User> getFollowing(String username) throws Exception {
        System.out.println("USERNAME: " + username);

        User thisUser = userRepository.findByUsername(username).get();
        List<Follow> followingList = followService.getUserAsFollower(thisUser);
        List<User> returnList = new ArrayList<User>();

        for (Follow item : followingList) {
            User newUser = item.getFollowed();
            System.out.println(newUser);

            returnList.add(newUser);
        }
        return returnList;
    }

    @GetMapping("/isfollowinguser")
    public boolean isFollowUser(@RequestParam("isFollowingUser") String isFollowingUser, @RequestHeader(name = "Authorization") String token) throws Exception {
        String thisUsername = jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
        User thisUser = userRepository.findByUsername(thisUsername).get();
        User otherUser = userRepository.findByUsername(isFollowingUser).get();

        if (followService.isFollowingUser(thisUser, otherUser)) {
            System.out.println("is following");
            return true;
        } else {
            System.out.println("is not following");
            return false;
        }


    }


}
