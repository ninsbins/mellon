package net.guides.springboot2.springboot2webappjsp.services;


import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.domain.UserProfilePicture;
import net.guides.springboot2.springboot2webappjsp.repositories.CommentRepository;
import net.guides.springboot2.springboot2webappjsp.repositories.PostRepository;
import net.guides.springboot2.springboot2webappjsp.repositories.ProfilePictureRepository;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProfilePictureRepository profilePictureRepository;

    public UserProfilePicture store(MultipartFile file, User user) throws Exception {
        String fileName = file.getOriginalFilename();
        String type = file.getContentType();

        if(!profilePictureRepository.existsByUser(user)) {
            UserProfilePicture profilePicture = new UserProfilePicture(fileName, user, file.getBytes(), type);
            return profilePictureRepository.save(profilePicture);
        }

        UserProfilePicture userProfilePicture = profilePictureRepository.findByUser(user);
        userProfilePicture.setData(file.getBytes());
        userProfilePicture.setType(type);

        return userProfilePicture;
    }

    public UserProfilePicture getByUser(User user) {
        if (profilePictureRepository.existsByUser(user)) {
            return profilePictureRepository.findByUser(user);
        }

        return null;
    }
}
