package net.guides.springboot2.springboot2webappjsp.controllers;

import net.guides.springboot2.springboot2webappjsp.domain.Follow;
import net.guides.springboot2.springboot2webappjsp.domain.Post;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.jwt.JwtUtils;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import net.guides.springboot2.springboot2webappjsp.services.FollowService;
import net.guides.springboot2.springboot2webappjsp.services.PostService;
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
    public ResponseEntity<?> followUser(@RequestBody String toFollowUsername, @RequestHeader(name="Authorization") String token) throws Exception {
        String thisUsername=jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
        User thisUser = userRepository.findByUsername(thisUsername).get();
        User followUser = userRepository.findByUsername(toFollowUsername).get();

        Follow savedFollow = followService.saveFollow(thisUser, followUser);
        return ResponseEntity.ok(savedFollow);
    }

    @GetMapping("/getfollowedby")
    public List<User> getFollows(@RequestBody String username) throws Exception {
        User thisUser = userRepository.findByUsername(username).get();
        List<Follow> followList = followService.getUserAsFollowed(thisUser);
        List<User> returnList = new ArrayList<User>();
        for (Follow item: followList) {
            User newUser = item.getFollower();
            returnList.add(newUser);
        }

        return returnList;
    }

    @GetMapping("/getfollowing")
    public List<User> getFollowing(@RequestBody String username) throws Exception {
        User thisUser = userRepository.findByUsername(username).get();
        List<Follow> followingList = followService.getUserAsFollower(thisUser);
        List<User> returnList = new ArrayList<User>();

        for (Follow item: followingList) {
            User newUser = item.getFollowed();
            returnList.add(newUser);
        }
        return returnList;
    }



}
