import {Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

{showing === 'followers' ? (
        <div>
            <Row className={"justify-content-center"}>
                <h2 className={"primary-text"}>Followers</h2>
            </Row>
            {followerList && followerList.length > 0 ?
                (followerList.map((follower) => {
                    return <Row style={{margin: "10px"}}>
                        <Link to={`/profile/${follower.username}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                 style={{marginRight: "15px"}} fill="currentColor"
                                 className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                            {follower.username}</Link>
                    </Row>
                }))
                : (<p>{profileUsername} doesn't have any followers</p>)}
        </div>) :
    (<div>
        <Row className={"justify-content-center"}>
            <h2 className={"primary-text"}>Following</h2>
        </Row>
        {followingList && followingList.length > 0 ?
            (followingList.map((following) => {
                return <Row style={{margin: "10px"}}>
                    <Link to={`/profile/${following.username}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                             style={{marginRight: "15px"}} fill="currentColor"
                             className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                        {following.username}</Link>
                </Row>
            }))
            : (<p>{profileUsername} isn't following anyone</p>)}
    </div>)
}