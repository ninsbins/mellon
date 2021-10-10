package net.guides.springboot2.springboot2webappjsp.services;

import net.guides.springboot2.springboot2webappjsp.domain.Post;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.repositories.PostRepository;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    public Post savePost(String username, String content, Date createdDate, String imageUrl, String itemType,
                         String itemTitle){
        Post post = new Post();
        Optional<User> user = userRepository.findByUsername(username);
        post.setUser(user.get());
        post.setContent(content);
        post.setItemType(itemType);
        post.setCreatedDate(createdDate);
        post.setImageUrl(imageUrl);
        post.setItemTitle(itemTitle);
        return postRepository.save(post);
    }

    public List<Post> getPostsOfUser(String username){
        List<Post> postList= postRepository.findPostByUserOrderById(userRepository.findByUsername(username).get());
        return postList;
    }

    public List<Post> getAllPost(){
        return postRepository.findAllByOrderByIdDesc();
    }

    public Post getPostById (Integer id) {
        return postRepository.findById(id).get();
    }
}