package net.guides.springboot2.springboot2webappjsp.controllers;

import net.guides.springboot2.springboot2webappjsp.domain.Post;
import net.guides.springboot2.springboot2webappjsp.repositories.PostRepository;
import net.guides.springboot2.springboot2webappjsp.request.CreatePostRequest;
import net.guides.springboot2.springboot2webappjsp.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Controller
public class PostController {

    @Autowired
    PostRepository postRepository;

    @GetMapping("/post")
    public String showCreatePostForm(Model model) {
        model.addAttribute("post", new Post());

        return "posts";
    }

    //end point?
    @PostMapping("/create")
    public ResponseEntity<?> submitPost(@Valid @RequestBody CreatePostRequest createPost) {

        Post post = new Post(createPost.getContent(), createPost.getUser(), createPost.getImageUrl(),
                createPost.getItemType(),createPost.getDateCreated(),createPost.getItemType());

        postRepository.save(post);

        return ResponseEntity.ok(new MessageResponse("Post created successfully!"));

    }
}
