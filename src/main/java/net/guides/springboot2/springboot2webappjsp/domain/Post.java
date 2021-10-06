package net.guides.springboot2.springboot2webappjsp.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="post")
public class Post
{
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @Column(name="content", nullable=false)
    private String content;

    @ManyToOne
    @JoinColumn(name ="FK_user_id", referencedColumnName = "username")
    private User user;

    @Column(name="createdDate", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdDate;

    public Post(String content, User user) {
        this.content=content;
        this.user=user;
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
}
