package net.guides.springboot2.springboot2webappjsp.controllers;

import net.guides.springboot2.springboot2webappjsp.domain.Post;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.jwt.JwtUtils;
import net.guides.springboot2.springboot2webappjsp.repositories.PostRepository;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import net.guides.springboot2.springboot2webappjsp.request.CreatePostRequest;
import net.guides.springboot2.springboot2webappjsp.response.MessageResponse;
import net.guides.springboot2.springboot2webappjsp.services.PostService;
import net.guides.springboot2.springboot2webappjsp.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/post")
public class PostController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostService postService;

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
    public ResponseEntity<?> myPosts(@RequestHeader (name="Authorization") String token) throws NullPointerException {

        String username=jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
        List<Post> postList = postService.getPostsOfUser(username);
        return ResponseEntity.ok(postList);
    }
//
    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts(){
        List<Post> postList = postService.getAllPost();
        return ResponseEntity.ok(postList);
    }
}
