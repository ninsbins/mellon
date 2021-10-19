package net.guides.springboot2.springboot2webappjsp.repositories;

import net.guides.springboot2.springboot2webappjsp.domain.Post;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Integer> {

    List<Post> findPostByUserOrderById(User user);

    List<Post> findAllByOrderByIdDesc();

    Post findPostById(Integer id);
}