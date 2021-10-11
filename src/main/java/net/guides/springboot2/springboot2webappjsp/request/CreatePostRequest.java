package net.guides.springboot2.springboot2webappjsp.request;

import net.guides.springboot2.springboot2webappjsp.domain.User;

import javax.validation.constraints.NotBlank;
import java.util.Date;

public class CreatePostRequest {
    @NotBlank
    private String content;

    @NotBlank
    private User user;

    @NotBlank
    private String itemType;

    @NotBlank
    private Date dateCreated;

    private String imageUrl;

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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    //what to do about the user?
}
