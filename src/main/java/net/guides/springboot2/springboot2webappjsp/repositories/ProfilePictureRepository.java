package net.guides.springboot2.springboot2webappjsp.repositories;

import net.guides.springboot2.springboot2webappjsp.domain.Comment;
import net.guides.springboot2.springboot2webappjsp.domain.Post;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.domain.UserProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfilePictureRepository extends JpaRepository<UserProfilePicture, Integer> {
    UserProfilePicture findByUser(User user);

    boolean existsByUser(User user);
}
