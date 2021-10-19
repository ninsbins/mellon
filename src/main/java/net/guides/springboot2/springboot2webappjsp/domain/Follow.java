package net.guides.springboot2.springboot2webappjsp.domain;

import javax.persistence.*;

@Entity
@Table(name="follows")
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    private User follower;

    @ManyToOne
    private User followed;

    public Follow() {

    }

    public Follow(User follower, User followed) {
        this.follower=follower;
        this.followed=followed;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getFollower() {
        return follower;
    }

    public User getFollowed() {
        return followed;
    }
}
