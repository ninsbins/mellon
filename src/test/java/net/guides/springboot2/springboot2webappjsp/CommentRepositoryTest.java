package net.guides.springboot2.springboot2webappjsp;

import net.guides.springboot2.springboot2webappjsp.domain.Comment;
import net.guides.springboot2.springboot2webappjsp.domain.Post;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class CommentRepositoryTest {

//    @Autowired
//    private CommentRepository commentRepository;
//    @Autowired
//    private UserRepository userRepository;
//    @Autowired
//    private PostRepository postRepository;

    @Test
    public void emptyTest () {

    }
//    @Test
//    public void findCommentByUserTest() {
//        User user1 = new User("metee", "met@gmail.com", "met");
//        userRepository.save(user1);
//        Post post1 = new Post("test",user1,"test","book", new Date(System.currentTimeMillis()),
//                "Tin Tin");
//        postRepository.save(post1);
//
//        List<Comment> result = commentRepository.findCommentByUserOrderByIdDesc(user1);
//        assertTrue(result.size()==0);
//
//        Comment comment1 = new Comment ("agreed!", new Date(System.currentTimeMillis()), user1, post1);
//        commentRepository.save(comment1);
//        result = commentRepository.findCommentByUserOrderByIdDesc(user1);
//        assertTrue(result.size()==1);
//        assertTrue(result.contains(comment1));
//
//        Comment comment2 = new Comment ("yesss!", new Date(System.currentTimeMillis()), user1, post1);
//        commentRepository.save(comment2);
//        result = commentRepository.findCommentByUserOrderByIdDesc(user1);
//        assertTrue(result.size()==2);
//        assertTrue(result.contains(comment1));
//        assertTrue(result.contains(comment2));
//
//        commentRepository.delete(comment1);
//        commentRepository.delete(comment2);
//        postRepository.delete(post1);
//        userRepository.delete(user1);
//    }
//
//    @Test
//    public void findCommentByPostTest() {
//        User user1 = new User("metee", "met@gmail.com", "met");
//        userRepository.save(user1);
//        Post post1 = new Post("test",user1,"test","book", new Date(System.currentTimeMillis()),
//                "Tin Tin");
//        postRepository.save(post1);
//
//        List<Comment> result = commentRepository.findCommentByPostOrderByIdDesc(post1);
//        assertTrue(result.size()==0);
//
//        Comment comment1 = new Comment ("agreed!", new Date(System.currentTimeMillis()), user1, post1);
//        commentRepository.save(comment1);
//        result = commentRepository.findCommentByPostOrderByIdDesc(post1);
//        assertTrue(result.size()==1);
//        assertTrue(result.contains(comment1));
//        Comment comment2 = new Comment ("yesss!", new Date(System.currentTimeMillis()), user1, post1);
//        commentRepository.save(comment2);
//        result = commentRepository.findCommentByPostOrderByIdDesc(post1);
//        assertTrue(result.size()==2);
//        assertTrue(result.contains(comment1));
//        assertTrue(result.contains(comment2));
//
//        commentRepository.delete(comment2);
//        commentRepository.delete(comment1);
//        postRepository.delete(post1);
//        userRepository.delete(user1);
//    }
//
//    @Test
//    public void findAllCommentsTest () {
//        List<Comment> result = commentRepository.findAllByOrderByIdDesc();
//        assertTrue(result.size()==19);
//    }
}
