import Header from "../components/Header";
import {Button, Col, Container, Image, Nav, Row, Tab} from "react-bootstrap";
import PostCard from "../components/PostCard";
import React, {useEffect, useState} from "react";
import axiosConfig from "../services/axiosConfig";
import authService from "../services/authService";
import {Link, useHistory, useParams} from "react-router-dom";

import "../styles/Profile.css"

const ProfilePage = () => {

    const {id} = useParams();
    let history = useHistory();

    const [posts, setPosts] = useState(null);
    const [musicPosts, setMusicPosts] = useState(null);
    const [playlistPosts, setPlaylistPosts] = useState(null);
    const [moviePosts, setMoviePosts] = useState(null);
    const [recipePosts, setRecipePosts] = useState(null);
    const [profileUsername, setProfileUsername] = useState('');
    const [thisUsername, setThisUsername] = useState('');
    const [user, setUser] = useState(null);

    useEffect(async () => {
        // const url = window.location.pathname; //get the path(minus domain name)
        // //console.log(url);
        // const username = url.split("/").pop();
        const username = id;
        const thisUsername = authService.getCurrentUser().username;
        setProfileUsername(username);
        setThisUsername(thisUsername);

        await axiosConfig.get(`/post/myposts?username=${username}`)
            .then((res) => {
                // console.log(res);
                setPosts(res.data);
                //console.log(posts);

                const musicList = [];
                const playlistList = [];
                const movieList = [];
                const recipeList = [];

                (res.data).map((post) => {
                    switch (post.itemType) {
                        case "Music":
                            musicList.push(post);
                            break;
                        case "Playlist":
                            playlistList.push(post);
                            break;
                        case "Movie":
                            movieList.push(post);
                            break;
                        case "Recipe":
                            recipeList.push(post);
                            break;
                    }
                })

                setMusicPosts(musicList);
                setPlaylistPosts(playlistList);
                setMoviePosts(movieList);
                setRecipePosts(recipeList);
            })
            .catch((err) => {
                console.log(err);
            })


        getUserInfo({username});

    }, [id]);

    const chatWithUser = () => {
        try {
            // TODO: create new chat
            window.location.replace("http://localhost:3000/chat")

        } catch (e) {
            console.log(e);
        }
    }

    const followUser = () => {

    }

    const getUserInfo = async ({username}) => {
        try {
            console.log(username)
            const res = await axiosConfig.get(`/update/user?username=${username}`)
            setUser(res.data);
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    const goToSettings = () => {
        history.push({
            pathname: `/settings`,
        })
    }

    return (
        <div>
            <Header/>
            <Container fluid className={"content-body"}>
                <Container fluid className={"profile-header"}>
                    {
                        profileUsername === thisUsername ? (<Row>
                            <Col sm={10}>
                                <Row className={"justify-content-start"} style={{paddingLeft: "40px"}}>
                                    <div className={"profile-pic"}
                                         style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png`,}}
                                    />
                                    <h2 className={"primary-text"}>Your profile</h2>
                                </Row>
                            </Col>
                            <Col sm={2}>
                                <Button onClick={goToSettings}>
                                    Edit Profile
                                </Button>
                            </Col>
                        </Row>) : (<Row>
                            <Col sm={10}>
                                <Row>
                                    <div className={"profile-pic"}
                                         style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png`,}}
                                    />
                                    <Col>
                                        <h2 className={"primary-text"}>
                                            {user.firstName ? (user.lastName ? (user.firstName + " " + user.lastName) : user.firstName) : ""}
                                        </h2>
                                        <h2 className={"primary-text"}>@{profileUsername}</h2>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={2}>
                                {/*<Button variant={"outline-primary"}>*/}
                                {/*    <Link to={"/settings"}>*/}
                                {/*        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                                {/*             className="bi bi-gear-fill" viewBox="0 0 16 16">*/}
                                {/*            <path*/}
                                {/*                d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>*/}
                                {/*        </svg></Link>*/}
                                {/*</Button>*/}
                                <Button
                                    style={{
                                        background: "#1ed760",
                                        borderRadius: "20px",
                                        margin: "5px",
                                    }}
                                    onClick={chatWithUser}>
                                    Message
                                </Button>
                                <Button
                                    style={{
                                        borderRadius: "20px",
                                        margin: "5px",
                                    }}
                                    onClick={followUser}>
                                    Follow
                                </Button>
                            </Col>
                        </Row>)
                    }
                </Container>
                <div>
                    <Tab.Container defaultActiveKey={"recent"}>
                        <Row className={"justify-content-center"}>
                            <Col className={"justify-content-end"}>
                                <Nav variant={"pills"} className={"flex-column"}>
                                    <Nav.Item>
                                        <Nav.Link eventKey={"recent"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 style={{marginRight: "15px"}}
                                                 fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                                <path
                                                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                            </svg>
                                            Recent
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey={"music"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 style={{marginRight: "15px"}}
                                                 fill="currentColor" className="bi bi-music-note-beamed"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                                <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
                                                <path
                                                    d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
                                            </svg>
                                            Music
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey={"playlists"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 style={{marginRight: "15px"}}
                                                 fill="currentColor" className="bi bi-music-note-list"
                                                 viewBox="0 0 16 16">
                                                <path
                                                    d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                                <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
                                                <path
                                                    d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                                                <path fill-rule="evenodd"
                                                      d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                                            </svg>
                                            Playlists
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey={"movies"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 style={{marginRight: "15px"}}
                                                 fill="currentColor"
                                                 className="bi bi-film" viewBox="0 0 16 16">
                                                <path
                                                    d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
                                            </svg>
                                            Movies
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey={"recipes"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 style={{marginRight: "15px"}}
                                                 fill="currentColor"
                                                 className="bi bi-egg-fried" viewBox="0 0 16 16">
                                                <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                                <path
                                                    d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z"/>
                                            </svg>
                                            Recipes
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={10}>
                                <Container fluid className={"rounded-card"}>
                                    <Tab.Content style={{padding: "15px"}}>
                                        <Tab.Pane eventKey={"recent"}>
                                            {/*map card grid*/}
                                            <h3 className={"secondary-text"}>Recent</h3>

                                            {posts ?
                                                <Row xs={2} sm={3} md={4} className="grid">
                                                    {(posts.slice(0, 4).map((post) => (
                                                        <Col>
                                                            <PostCard
                                                                title={post.itemTitle}
                                                                image={post.imageUrl}
                                                                id={post.id}
                                                            />

                                                        </Col>
                                                    )))}
                                                </Row>
                                                : (
                                                    <Row className={"justify-content-center"}>You have no posts
                                                        yet.
                                                        Start exploring, and make posts to see them here!</Row>
                                                )
                                            }
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={"music"}>
                                            {/*map card grid*/}
                                            <h3 className={"secondary-text"}>Music</h3>

                                            {musicPosts && musicPosts.length > 0 ?
                                                <Row xs={2} sm={3} md={4} className="grid">
                                                    {(musicPosts.map((post) => (
                                                            <Col>
                                                                <PostCard
                                                                    title={post.itemTitle}
                                                                    image={post.imageUrl}
                                                                    id={post.id}
                                                                />
                                                            </Col>
                                                        ))
                                                    )}
                                                </Row>
                                                : (
                                                    <Row className={"justify-content-center"}>You have no music
                                                        posts.</Row>
                                                )
                                            }
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={"playlists"}>
                                            {/*map card grid*/}
                                            <h3 className={"secondary-text"}>Playlists</h3>

                                            {playlistPosts && playlistPosts.length > 0 ?
                                                <Row xs={2} sm={3} md={4} className="grid">
                                                    {(playlistPosts.map((post) => (
                                                            <Col>
                                                                <PostCard
                                                                    title={post.itemTitle}
                                                                    image={post.imageUrl}
                                                                    id={post.id}
                                                                />
                                                            </Col>
                                                        ))
                                                    )}
                                                </Row>
                                                : (
                                                    <Row className={"justify-content-center"}>You have no playlist
                                                        posts.</Row>

                                                )
                                            }
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={"movies"}>
                                            {/*map card grid*/}
                                            <h3 className={"secondary-text"}>Movies</h3>
                                            {moviePosts && moviePosts.length > 0 ?
                                                (<Row xs={2} sm={3} md={4} className="grid">
                                                    {(moviePosts.map((post) => (
                                                        <Col>
                                                            <PostCard
                                                                title={post.itemTitle}
                                                                image={post.imageUrl}
                                                                id={post.id}
                                                            />
                                                        </Col>
                                                    )))}
                                                </Row>)
                                                : (
                                                    <Row className={"justify-content-center"}>You have no movie
                                                        posts.</Row>
                                                )
                                            }
                                        </Tab.Pane>
                                        <Tab.Pane eventKey={"recipes"}>
                                            {/*map card grid*/}
                                            <h3 className={"secondary-text"}>Recipes</h3>
                                            {recipePosts && recipePosts.length > 0 ?
                                                <Row xs={2} sm={3} md={4} className="grid">
                                                    {(recipePosts.map((post) => (
                                                        <Col>
                                                            <PostCard
                                                                title={post.itemTitle}
                                                                image={post.imageUrl}
                                                                id={post.id}
                                                            />
                                                        </Col>
                                                    )))}
                                                </Row> : (
                                                    <Row className={"justify-content-center"}>You have no recipe
                                                        posts.</Row>
                                                )
                                            }
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Container>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </Container>

        </div>
    );
}

export default ProfilePage;