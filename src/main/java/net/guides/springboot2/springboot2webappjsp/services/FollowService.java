package net.guides.springboot2.springboot2webappjsp.services;

import net.guides.springboot2.springboot2webappjsp.domain.Follow;
import net.guides.springboot2.springboot2webappjsp.domain.User;
import net.guides.springboot2.springboot2webappjsp.repositories.FollowRepository;
import net.guides.springboot2.springboot2webappjsp.repositories.PostRepository;
import net.guides.springboot2.springboot2webappjsp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowService {

    @Autowired
    FollowRepository followRepository;

    @Autowired
    UserRepository userRepository;

    public Follow saveFollow(User follower, User followed)throws Exception {
        if (follower.getUsername() == followed.getUsername()) {
            throw new Exception();
        }
        Follow follow = new Follow(follower, followed);
        return followRepository.save(follow);

    }

    public List<Follow> getUserAsFollowed(User user) throws Exception {
        List<Follow> returnList = followRepository.findByFollowed(user);
        return returnList;
    }

    public List<Follow> getUserAsFollower(User user) {
        List<Follow> returnList = followRepository.findByFollower(user);
        return returnList;
    }


}
