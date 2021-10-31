package net.guides.springboot2.springboot2webappjsp;

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
public class PostRepositoryTest {
//    @Autowired
//    private PostRepository postRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
    @Test
    public void emptyTest () {

    }
//    @Test
//    public void findPostByUserTest() {
//
//        User user1 = new User("me10", "me10@gmail.com", "meme10");
//        userRepository.save(user1);
//
//        Post post1 = new Post("test content 10", user1, "test url", "movie",
//                new Date(System.currentTimeMillis()), "Run All Night");
//        Post post2 = new Post("test content 12", user1, "test url 2", "book",
//                new Date(System.currentTimeMillis()), "Tin Tin");
//
//        List<Post> result = postRepository.findPostByUserOrderById(user1);
//        assertTrue(result.size()==0);
//        postRepository.save(post1);
//        result = postRepository.findPostByUserOrderById(user1);
//        assertTrue(result.size()==1);
//        postRepository.save(post2);
//        result = postRepository.findPostByUserOrderById(user1);
//        assertTrue(result.size()==2);
//        assertTrue(result.contains(post1));
//        assertTrue(result.contains(post2));
//
//        postRepository.delete(post1);
//        postRepository.delete(post2);
//        userRepository.delete(user1); //delete the record in db because of unique constraints
//    }
//
//    @Test
//    public void findAllPostsTest () {
//        List<Post> result = postRepository.findAllByOrderByIdDesc();
//        assertTrue(result.size()==45);
//    }
//
//    @Test
//    public void findPostById () {
//        Post result = postRepository.findPostById(6);
//        assertNotNull(result);
//        assertTrue(result.getContent().equals("what a classic!!!!"));
//        assertTrue(result.getItemTitle().equals("Mr Bean"));
//        assertTrue(result.getItemType().equals("Movie"));
//        assertTrue(result.getImageUrl().equals("https://m.media-amazon.com/images/M/MV5BOGNjZTRlNDctNGI0Yi00YmFkLTljMmQt" +
//                "MjQ1ZjdiNmU5YTc0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"));
//    }
}