package net.guides.springboot2.springboot2webappjsp.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="post",
        schema = "targetSchemaName")
public class Post
{
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @Column(name="content", nullable=false)
    private String content;

    @ManyToOne
    @JoinColumn(name ="username")
    private User user;

    @Column(name="created_date", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdDate;

    @Column(name="item_type", nullable = false)
    private String itemType;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="item_title",nullable = false)
    private String itemTitle;

    public Post(String content, User user, String url, String itemType, Date date, String itemTitle) {
        this.content=content;
        this.user=user;
        this.imageUrl=url;
        this.itemType=itemType;
        this.createdDate=date;
        this.itemTitle=itemTitle;
    }

    public Post() {

    }

    public Integer getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public User getUser() {
        return user;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getItemType() {
        return itemType;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getItemTitle() {
        return itemTitle;
    }

    public void setItemTitle(String itemTitle) {
        this.itemTitle = itemTitle;
    }
}
