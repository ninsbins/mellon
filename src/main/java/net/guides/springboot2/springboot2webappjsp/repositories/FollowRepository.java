package net.guides.springboot2.springboot2webappjsp.repositories;

import net.guides.springboot2.springboot2webappjsp.domain.Follow;
import net.guides.springboot2.springboot2webappjsp.domain.Post;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow,Integer> {

    List<Follow> findByFollower(User user);
    List<Follow> findByFollowed(User user);
}