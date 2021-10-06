package net.guides.springboot2.springboot2webappjsp.request;

import net.guides.springboot2.springboot2webappjsp.domain.User;

import javax.validation.constraints.NotBlank;

public class CreatePostRequest {
    @NotBlank
    private String content;

    @NotBlank
    private User user;

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

    //what to do about the user?
}
