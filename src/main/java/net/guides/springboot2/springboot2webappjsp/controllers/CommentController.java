package net.guides.springboot2.springboot2webappjsp.controllers;

import net.guides.springboot2.springboot2webappjsp.domain.Comment;
import net.guides.springboot2.springboot2webappjsp.jwt.JwtUtils;
import net.guides.springboot2.springboot2webappjsp.repositories.PostRepository;
import net.guides.springboot2.springboot2webappjsp.request.CreateCommentRequest;
import net.guides.springboot2.springboot2webappjsp.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/post")
public class CommentController {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentService commentService;

    @Autowired
    private JwtUtils jwtUtils;

    //adds comment to a specific post
    @PostMapping("/{postid}/addcomment")
    public ResponseEntity<?> addComment(@RequestBody CreateCommentRequest createCommentRequest,@RequestHeader
            (name="Authorization") String token, @PathVariable Integer postid) throws NullPointerException {
        String username=jwtUtils.getUserNameFromJwtToken(token.split(" ")[1]);
        Comment savedComment = commentService.saveComment(username, postid,
                createCommentRequest.getContent(),createCommentRequest.getCreatedDate());
        Map<String, Object> response = new HashMap<>();
        response.put("id",savedComment.getId());
        response.put("content",savedComment.getContent());
        response.put("createdDate",savedComment.getCreatedDate());
        Map<String,Object> userValues = new HashMap<>();
        userValues.put("username",savedComment.getUser().getUsername());
        response.put("user",userValues);
        return ResponseEntity.ok(response);
    }

    //gets all the comments for a specific post
    @GetMapping("/{postid}/comments")
    public ResponseEntity<?> getAllComments(@PathVariable Integer postid){
        List<Comment> commentList = commentService.getCommentsOfPost(postid);
        List<Map> response = new ArrayList<>();
        for (Comment c:commentList) {
            Map<String, Object> values = new HashMap<>();
            values.put("id",c.getId());
            values.put("content",c.getContent());
            values.put("createdDate",c.getCreatedDate());
            Map<String,Object> userValues = new HashMap<>();
            userValues.put("username",c.getUser().getUsername());
            values.put("user",userValues);
            response.add(values);
        }
        return ResponseEntity.ok(response);
    }

    //returns comment by id
    @GetMapping("/comments/{commentid}")
    public ResponseEntity<?> getCommentId(@PathVariable Integer commentid) {
        Comment savedComment = commentService.getCommentById(commentid);
        Map<String, Object> response = new HashMap<>();
        response.put("id",savedComment.getId());
        response.put("content",savedComment.getContent());
        response.put("createdDate",savedComment.getCreatedDate());
        Map<String,Object> userValues = new HashMap<>();
        userValues.put("username",savedComment.getUser().getUsername());
        response.put("user",userValues);
        return ResponseEntity.ok(response);
    }

}