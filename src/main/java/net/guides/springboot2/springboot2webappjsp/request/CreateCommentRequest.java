package net.guides.springboot2.springboot2webappjsp.request;

import net.guides.springboot2.springboot2webappjsp.domain.Post;
import net.guides.springboot2.springboot2webappjsp.domain.User;

import javax.validation.constraints.NotBlank;
import java.util.Date;

public class CreateCommentRequest {

    @NotBlank
    private String content;

    @NotBlank
    private User user;

    @NotBlank
    private Post post;

    @NotBlank
    private Date createdDate;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content=content;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
}