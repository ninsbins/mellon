import Header from "../components/Header";
import {Button, Container, FormControl} from "react-bootstrap";
import {Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import authService from "../services/authService";
import {useLocation} from "react-router-dom";
import axiosConfig from "../services/axiosConfig";


const ProfileSetUp = () => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [picture, setPicture] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUpload, setFileUpload] = useState(false);

    let location = useLocation();
    let username = location.state.username;
    let password = location.state.password;
    let email = location.state.email;


    useEffect(() => {
    }, [location]);

    const handleClick = async () => {
        console.log("clicked")
        await axiosConfig
            .post(`/api/auth/login`, {
                username,
                password
            })
            .then(async response => {
                console.log(response);
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                    console.log(response);
                }

                console.log(name);
                console.log(bio);
                await axiosConfig
                    .post(`/user/setupuser?username=${username}&name=${name}&bio=${bio}`)
                    .then((response) => {
                        console.log(response);
                        window.location.replace('http://localhost:3000/profile')

                    }).catch((err) => {
                        console.log(err);
                    })

            }).catch((err) => {
                console.log(err);
            })
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
            .post(`/user/upload?username=${username}`, formData)
            .then((response) => {
                console.log(response);
                console.log(response.data.data)
                const userProfileImageBase64 = response.data.data
                setPicture(`data:image/jpg;base64, ${userProfileImageBase64}`)
                setFileUpload(true);
            })
    }



    return (
        <div>
            <Header />
            <Container className={"content-body"}>
                <Container fluid className={"rounded-card"} style={{
                    width:"60%",
                    justifyContent:'center',
                }}>
                    <Row className={"justify-content-center"}>
                        <h2 className={"primary-text"}>Setup Mellon Profile</h2>
                    </Row>

                    <h2 className={"settings-text"}> Name </h2>
                    <Row className={"justify-content-center"}>
                    <div className="input-group mb-3" style={{
                        display:"flex",
                        width:"90%",
                        justifyContent:'center',
                        borderRadius:'20px',
                        align:'center'
                    }}>
                        <FormControl
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder={"Name"}/>
                    </div>
                    </Row>
                    <h2 className={"settings-text"}> Bio </h2>
                    <Row className={"justify-content-center"}>
                    <div className="input-group mb-3" style={{
                        display:"flex",
                        width:"90%",
                        justifyContent:'center',
                        borderRadius:'20px',
                        align:'center'
                    }}>
                        <FormControl
                            as={"textarea"}
                            rows={3}
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
                            placeholder={"Bio"}/>
                    </div>
                    </Row>

                    <h2 className={"settings-text"}> Profile Picture </h2>

                    <Row className={"justify-content-center"}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <div className="m-3">
                                <input type={"file"} name={"file"} onChange={fileSelectedHandler}/>
                                <Button onClick={fileUploadHandler}>Upload</Button>
                            </div>
                        </div>
                    </Row>

                    {!fileUpload ? (
                        <div style={{display: 'flex', justifyContent: 'center', padding: '30px'}}>
                            <div>
                                <div className={"profile-pic__large"}
                                     style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo.png`,}}
                                />
                            </div>
                        </div>
                    ) : (
                        <div style={{display: 'flex', justifyContent: 'center', padding: '30px'}}>
                        <img src={picture} alt={"no image"} width="400px"
                             />
                        </div>
                    )}



                    <Row className={"justify-content-center"}>
                        <Button style={{
                            marginTop: "20px",
                            background: "#471a66",
                            borderColor: "white",
                            borderRadius: "20px",
                        }}
                        onClick={handleClick}>
                            Join Mellon!
                        </Button>
                    </Row>


                </Container>
            </Container>
        </div>
    )
}

export default ProfileSetUp;