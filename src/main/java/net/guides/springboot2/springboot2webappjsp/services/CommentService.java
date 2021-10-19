package net.guides.springboot2.springboot2webappjsp.services;

import net.guides.springboot2.springboot2webappjsp.domain.Comment;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.repositories.CommentRepository;
import net.guides.springboot2.springboot2webappjsp.repositories.PostRepository;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    public Comment saveComment(String username, Integer postId ,String content, Date createdDate) {
        Comment comment = new Comment();
        Optional<User> user = userRepository.findByUsername(username);
        comment.setUser(user.get());
        comment.setContent(content);
        comment.setCreatedDate(createdDate);
        comment.setPost(postRepository.findPostById(postId));
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsOfPost (Integer postId){
        List<Comment> commentList= commentRepository.findCommentByPostOrderByIdDesc(postRepository.findPostById(postId));
        return commentList;
    }

    public List<Comment> getCommentsOfUser (String username){
        List<Comment> commentList = commentRepository.findCommentByUserOrderByIdDesc(
                userRepository.findByUsername(username).get());
        return commentList;
    }

    public Comment getCommentById (Integer id) {
        return commentRepository.findById(id).get();
    }

    public List<Comment> getAllComment(){
        return commentRepository.findAllByOrderByIdDesc();
    }
}