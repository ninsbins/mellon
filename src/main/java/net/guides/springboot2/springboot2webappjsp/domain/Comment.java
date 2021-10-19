package net.guides.springboot2.springboot2webappjsp.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="comment",
        schema = "targetSchemaName")
public class Comment {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @Column(name="content", nullable=false)
    private String content;

    @Column(name="created_date", nullable = false)
    private Date createdDate;

    @ManyToOne
    @JoinColumn(name ="username")
    private User user;

    @ManyToOne
    @JoinColumn(name ="postid")
    private Post post;

    public Comment(String content, Date createdDate, User user, Post post) {
        this.content=content;
        this.createdDate=createdDate;
        this.user=user;
        this.post=post;
    }

    public Comment() {

    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public Integer getId() {
        return id;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}