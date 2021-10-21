package net.guides.springboot2.springboot2webappjsp.services;


import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.domain.UserProfilePicture;
import net.guides.springboot2.springboot2webappjsp.repositories.CommentRepository;
import net.guides.springboot2.springboot2webappjsp.repositories.PostRepository;
import net.guides.springboot2.springboot2webappjsp.repositories.ProfilePictureRepository;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import org.apache.commons.codec.binary.Base64;
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
        //byte[] image = Base64.encodeBase64(file.getBytes());
        byte[] image = file.getBytes();

        if(!profilePictureRepository.existsByUser(user)) {

            UserProfilePicture profilePicture = new UserProfilePicture(fileName, user, image, type);
            return profilePictureRepository.save(profilePicture);
        }

        UserProfilePicture userProfilePicture = profilePictureRepository.findByUser(user);
        userProfilePicture.setData(image);
        userProfilePicture.setType(type);

        return profilePictureRepository.save(userProfilePicture);
    }

    public UserProfilePicture getByUser(User user) {
        if (profilePictureRepository.existsByUser(user)) {
            return profilePictureRepository.findByUser(user);
        }

        return null;
    }
}
