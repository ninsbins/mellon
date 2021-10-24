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
            // check whether the logged in user is already following the current user

        } if (isFollowingUser(follower, followed)) {
            // user is already following, so unfollow
            // get following list
            List<Follow> followingList = followRepository.findByFollower(follower);
            // get entry to delete
            for (Follow item : followingList) {
                if (item.getFollowed() == followed) {
                    followRepository.delete(item);
                }
            }
        } else {
            // follow user
            Follow follow = new Follow(follower, followed);
            return followRepository.save(follow);
        }

        return null;

    }

    public List<Follow> getUserAsFollowed(User user) throws Exception {
        List<Follow> returnList = followRepository.findByFollowed(user);
        return returnList;
    }

    public List<Follow> getUserAsFollower(User user) {
        List<Follow> returnList = followRepository.findByFollower(user);
        return returnList;
    }

    public boolean isFollowingUser(User thisUser, User queryUser) {
        return followRepository.existsByFollowerAndFollowed(thisUser, queryUser);
    }


}
