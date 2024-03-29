import Header from "../components/Header";
import {Button, Col, Container, Form, Image, Modal, Nav, Row, Tab} from "react-bootstrap";
import PostCard from "../components/PostCard";
import React, {useEffect, useState} from "react";
import axiosConfig from "../services/axiosConfig";
import authService from "../services/authService";
import {Link, useHistory, useParams} from "react-router-dom";
import {useRef} from "react";
import ImageUploader from 'react-images-upload';

import "../styles/Profile.css"
import uploadFileService from "../services/uploadFileService";

const ProfilePage = () => {

    const {id} = useParams();
    let history = useHistory();

    const [loadingState, setLoadingState] = useState(false);

    //current profile variables
    const [posts, setPosts] = useState(null);
    const [musicPosts, setMusicPosts] = useState(null);
    const [playlistPosts, setPlaylistPosts] = useState(null);
    const [moviePosts, setMoviePosts] = useState(null);
    const [recipePosts, setRecipePosts] = useState(null);
    const [profileUsername, setProfileUsername] = useState('');
    const [user, setUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    const [usersFirstName, setUsersFirstName] = useState(""); //for displaying details of other Users
    const [usersLastName, setUsersLastName] = useState("");
    const [usersBio, setUsersBio] = useState("");

    //user variables
    const [thisUsername, setThisUsername] = useState('');

    //modal modal variables
    const [show, setShow] = useState(false);
    const [showing, setShowing] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');

    //following
    const [followingList, setFollowingList] = useState(null);
    const [followerList, setFollowerList] = useState(null);

    //photo upload tings
    const [selectedFile, setSelectedFile] = useState(null);
    const [picture, setPicture] = useState(null);


    useEffect(async () => {
        setLoadingState(true);
        // const url = window.location.pathname; //get the path(minus domain name)
        // //console.log(url);
        // const username = url.split("/").pop();

        //username of the current profile
        const username = id;
        setProfileUsername(username);

        //username of the current user
        const thisUsername = authService.getCurrentUser().username;
        setThisUsername(thisUsername);

        // reset all following and modal stuff
        setShow(false);
        setShowing(null);
        setFollowerList(null);
        setFollowingList(null);

        await getUserInfo({username});
        await getIsFollowing(username);

        //profile picture upload
        await axiosConfig
            .get(`/user/getprofilepicture?username=${username}`)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.data) {
                    const userProfileImageBase64 = response.data.data
                    setPicture(`data:image/jpg;base64, ${userProfileImageBase64}`)
                }

            })
            .catch((err) => {
                console.log(err);
            });


        await getUserInfo({username});

        await axiosConfig.get(`/post/all-user-posts/${username}`)
            .then((res) => {
                // console.log(res.data);
                setPosts(res.data);
                //console.log(posts);

                const musicList = [];
                const playlistList = [];
                const movieList = [];
                const recipeList = [];

                (res.data).map((post) => {
                    switch (post.itemType.toLowerCase()) {
                        // case "music":
                        //     musicList.push(post);
                        //     break;
                        case "song":
                            musicList.push(post);
                            break;
                        case "album":
                            musicList.push(post);
                            break;
                        case "playlist":
                            playlistList.push(post);
                            break;
                        case "movie":
                            movieList.push(post);
                            break;
                        case "recipe":
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

        await axiosConfig.get(`/follow/following?username=${username}`)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setFollowingList(res.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });

        await axiosConfig.get(`/follow/followers?username=${username}`)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setFollowerList(res.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });

        // console.log(user);
        setLoadingState(false);

    }, [id]);

    const chatWithUser = () => {
        try {
            // TODO: create new chat
            window.location.replace("http://localhost:3000/chat")

        } catch (e) {
            console.log(e);
        }
    }

    const getUserInfo = async ({username}) => {

        await axiosConfig.get(`/update/user?username=${username}`)
            .then((res) => {
                // console.log(res);
                setUser(res.data);
                setUsersFirstName(res.data.firstName);
                setUsersLastName(res.data.lastName);
                setUsersBio(res.data.bio);
            }).catch((err) => {
                console.log(err);
            })

    }

    const goToSettings = () => {
        history.push({
            pathname: `/settings`,
        })
    }


    const followUser = async () => {
        console.log(user.username);
        await axiosConfig.post(`/follow/followuser?userToFollow=${profileUsername}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        await getIsFollowing(profileUsername);
    }

    const getIsFollowing = async (username) => {
        await axiosConfig.get(`/follow/isfollowinguser?isFollowingUser=${username}`)
            .then((res) => {
                console.log(res);
                setIsFollowing(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getFollowing = async () => {
        setShowing('following');
        setShow(true);

        await axiosConfig.get(`/follow/following?username=${profileUsername}`)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setFollowingList(res.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const updatePicture = () => {
        console.log("updating profile picture");
        setProfilePicture("true");
        setShow(true);
    }

    const fileSelectedHandler = event => {
        setSelectedFile(event.target.files[0]);
        console.log(selectedFile)
    }

    const fileUploadHandler = async () => {
        console.log(selectedFile)
        let formData = new FormData();

        formData.append("file", selectedFile);

        await axiosConfig
            .post(`/user/upload?username=${user.username}`, formData)
            .then((response) => {
                console.log(response);
                console.log(response.data.data)
                const userProfileImageBase64 = response.data.data
                setPicture(`data:image/jpg;base64, ${userProfileImageBase64}`)
            })
    }

    const getFollowers = async () => {
        setShowing('followers');
        setShow(true);

        await axiosConfig.get(`/follow/followers?username=${profileUsername}`)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setFollowerList(res.data);

                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    let handleClose = () => {
        setShow(false);
        setProfilePicture("false");
    }

    return (
        <div>
            <Header/>
            {!loadingState ? <Container fluid className={"content-body"}>
                    <Container fluid className={"profile-header"}>
                        {
                            profileUsername === thisUsername ? (<Row>
                                <Col sm={10}>
                                    <Row className={"justify-content-start"}>
                                        {picture ?
                                            <div className="fill">
                                                <img src={picture} alt={"Profile Picture"} width="400px"
                                                     onClick={updatePicture}
                                                     className={"rounded-circle"}/>
                                            </div> :
                                            <div className={"fill"}
                                                 onClick={updatePicture}
                                                 style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png`,}}
                                            />}


                                        <Col>
                                            <h2 className={"primary-text"}>Your profile</h2>
                                            <p>{usersBio}</p>
                                            <Row>
                                                <a onClick={getFollowing}
                                                   style={{textDecoration: "underline", padding: "25px 15px"}}>
                                                    {followingList ? followingList.length : ""} Following
                                                </a>
                                                <a onClick={getFollowers}
                                                   style={{textDecoration: "underline", padding: "25px 15px"}}>
                                                    {followerList ? followerList.length : ""} Followers
                                                </a>
                                            </Row>

                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={2}>
                                    <Button variant="primary" className={"purple-btn"} onClick={goToSettings}>
                                        Edit Profile
                                    </Button>
                                </Col>
                            </Row>) : (<Row>
                                <Col sm={10}>
                                    <Row className={"justify-content-start"}>
                                        {picture ?
                                            <div className="fill">
                                                <img src={picture} alt={"Profile Picture"} width="400px"
                                                     onClick={updatePicture}
                                                     className={"rounded-circle"}/>
                                            </div> :
                                            <div className={"fill"}
                                                 onClick={updatePicture}
                                                 style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png`,}}
                                            />}
                                        <Col>
                                            <h2 className={"primary-text"}>
                                                {(usersFirstName) ?
                                                    (usersLastName ? (usersFirstName + " " + usersLastName)
                                                        : usersFirstName)
                                                    : ""}
                                            </h2>
                                            <h2 className={"primary-text"}>@{profileUsername}</h2>
                                            <p>{usersBio}</p>
                                            <Row>
                                                <a onClick={getFollowing}
                                                   style={{textDecoration: "underline", padding: "25px 15px"}}>
                                                    {followingList ? followingList.length : ""} Following
                                                </a>
                                                <a onClick={getFollowers}
                                                   style={{textDecoration: "underline", padding: "25px 15px"}}>
                                                    {followerList ? followerList.length : ""} Followers
                                                </a>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={2}>
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
                                        {isFollowing ? "Unfollow" : "Follow"}
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
                                                    <path d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
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
                                                    <path d="M12 3v10h-1V3h1z"/>
                                                    <path
                                                        d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                                                    <path
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
                                                    : (profileUsername === thisUsername ?
                                                            <Row className={"justify-content-center"}>You have no posts yet.
                                                                Start exploring, and make posts to see them here!</Row> :
                                                            <Row
                                                                className={"justify-content-center"}>{profileUsername} has
                                                                no posts yet.}</Row>
                                                        // <div></div>
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
                                                    : (profileUsername === thisUsername ?
                                                            <Row className={"justify-content-center"}>You have no music
                                                                posts yet.
                                                                Start exploring, and make posts to see them here!</Row> :
                                                            <Row className={"justify-content-center"}>{profileUsername} has
                                                                no music posts yet.</Row>
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
                                                    : (profileUsername === thisUsername ?
                                                            <Row className={"justify-content-center"}>You have no playlist
                                                                posts yet.
                                                                Start exploring, and make posts to see them here!</Row> :
                                                            <Row
                                                                className={"justify-content-center"}>{profileUsername} has
                                                                no playlist posts yet.</Row>
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
                                                    : (profileUsername === thisUsername ?
                                                            <Row className={"justify-content-center"}>You have no movie
                                                                posts yet.
                                                                Start exploring, and make posts to see them here!</Row> :
                                                            <Row
                                                                className={"justify-content-center"}>{profileUsername} has
                                                                no movie posts yet.</Row>
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
                                                    </Row> : (profileUsername === thisUsername ?
                                                            <Row className={"justify-content-center"}>You have no recipe
                                                                posts yet.
                                                                Start exploring, and make posts to see them here!</Row> :
                                                            <Row className={"justify-content-center"}>{profileUsername} has
                                                                no recipe posts yet.</Row>
                                                    )
                                                }
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Container>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                </Container> :
                <Container fluid className={"content-body"}>
                    <Row className={"justify-content-center"}>
                        <Image src={`https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif`}
                               width={40}/>
                    </Row>
                </Container>

            }


            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    {profilePicture === 'true' ? (
                        <div className={"profile-header"}>
                            <Row className={"justify-content-center"}>
                                <h2 className={"primary-text"}>Profile Picture</h2>
                            </Row>

                            <Row className={"justify-content-center"}>
                                {
                                    <Image src={picture ? picture : `url(${process.env.PUBLIC_URL}/assets/logo.png)`}
                                           width="400px"/>
                                }
                            </Row>


                            <div>
                                {profileUsername === thisUsername ? (
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <div className="m-3">
                                            <input type={"file"} name={"file"} onChange={fileSelectedHandler}/>
                                            <Button onClick={fileUploadHandler}>Upload</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{display: 'flex', justifyContent: 'center'}}>

                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            {showing === 'followers' ? (
                                    <div>
                                        <Row className={"justify-content-center"}>
                                            <h2 className={"primary-text"}>Followers</h2>
                                        </Row>
                                        {followerList && followerList.length > 0 ?
                                            (followerList.map((follower) => {
                                                return <Link to={`/profile/${follower.username}`}>
                                                    <Row style={{margin: "10px"}} className={"align-content-center"}>
                                                        {/*{props.pic ?*/}
                                                        {/*    <div className="fill-sm"*/}
                                                        {/*         style={{margin: "0"}}*/}
                                                        {/*    >*/}
                                                        {/*        <img id={"small-img"} src={props.pic} alt={"Profile Picture"}*/}
                                                        {/*             className={"rounded-circle"}/>*/}
                                                        {/*    </div> :*/}

                                                        <div className={"fill-sm"}
                                                             style={{
                                                                 marginRight: "10px",
                                                                 backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png`
                                                             }}
                                                        />
                                                        <div style={{paddingTop: "8px"}}>{follower.username}</div>
                                                    </Row>
                                                </Link>
                                            }))
                                            : (<p>{profileUsername} doesn't have any followers</p>)}
                                    </div>) :
                                (<div>
                                    <Row className={"justify-content-center"}>
                                        <h2 className={"primary-text"}>Following</h2>
                                    </Row>
                                    {followingList && followingList.length > 0 ?
                                        (followingList.map((following) => {
                                            return (

                                                <Link to={`/profile/${following.username}`}>
                                                    <Row style={{margin: "10px"}} className={"align-content-center"}>
                                                        {/*{props.pic ?*/}
                                                        {/*    <div className="fill-sm"*/}
                                                        {/*         style={{margin: "0"}}*/}
                                                        {/*    >*/}
                                                        {/*        <img id={"small-img"} src={props.pic} alt={"Profile Picture"}*/}
                                                        {/*             className={"rounded-circle"}/>*/}
                                                        {/*    </div> :*/}

                                                        <div className={"fill-sm"}
                                                             style={{
                                                                 marginRight: "10px",
                                                                 backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png`
                                                             }}
                                                        />
                                                        <div style={{paddingTop: "8px"}}>{following.username}</div>
                                                    </Row>
                                                </Link>
                                            )
                                        }))
                                        : (<p>{profileUsername} isn't following anyone</p>)}
                                </div>)
                            }
                        </div>
                    )}


                </Modal.Body>
            </Modal>


        </div>
    );
}

export default ProfilePage;