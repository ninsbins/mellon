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
@RequestMapping("/post")
public class PostController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private FollowService followService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/addpost")
    public ResponseEntity<?> addPost(@RequestBody Post post,@RequestHeader (name="Authorization") String token) throws NullPointerException {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String token = authentication.getName();
//        String username=jwtUtils.getUserNameFromJwtToken(token);
        String username=jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
        Post savedPost = postService.savePost(username, post.getContent(),post.getCreatedDate(),post.getImageUrl(),
                post.getItemType(),post.getItemTitle());
        return ResponseEntity.ok(savedPost);
    }

    @GetMapping("/myposts")
    public ResponseEntity<?> myPosts(String username) throws NullPointerException {

        List<Post> postList = postService.getPostsOfUser(username);
        return ResponseEntity.ok(postList);
    }
    //
    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts(){
        List<Post> postList = postService.getAllPost();
        return ResponseEntity.ok(postList);
    }

    @GetMapping("/followingposts")
    public ResponseEntity<List<Post>> getFollowPosts(@RequestHeader (name="Authorization") String token) {
        String username=jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
        User thisUser = userRepository.findByUsername(username).get();

        List<Follow> followingList = followService.getUserAsFollower(thisUser);
        List<User> followUserList = new ArrayList<User>();

        for (Follow item: followingList) {
            User newUser = item.getFollowed();
            followUserList.add(newUser);
        }

        List<Post> followingPost = new ArrayList<Post>();

        for (User user: followUserList) {
            List<Post> postList = postService.getPostsOfUser(user.getUsername());
            followingPost.addAll(postList);
        }

        return ResponseEntity.ok(followingPost);


    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostId(@PathVariable Integer id, @RequestHeader (name="Authorization") String token) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    }

    //For getting all posts by a User's username
    //e.g., in Postman -> http://localhost:8080/post/all-user-posts/jess
    @GetMapping("/all-user-posts/{username}")
    public ResponseEntity<List<Post>> getAllUsersPosts(@PathVariable String username, @RequestHeader (name="Authorization") String token) {
        System.out.println("Getting all the User's Posts by their USERNAME.");

        List<Post> postList = postService.getPostsOfUser(username);
        System.out.println("No. of Post items: " + postList.size());
        return ResponseEntity.ok(postList);
    }
}