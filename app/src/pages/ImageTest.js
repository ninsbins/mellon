import axiosConfig from "../services/axiosConfig";
import {useEffect, useState} from "react";

const Imagetest = () => {

    const [profilepicture, setProfilePicture] = useState(null);

    useEffect (async() => {
        await axiosConfig
            .get(`/user/getprofilepicture`)
            .then((response) => {
                console.log(response.data.data)
                const userProfileImageBase64 = response.data.data
                setProfilePicture(`data:image/jpg;base64, ${userProfileImageBase64}`)
            })
            .catch((err) => {
                console.log(err);
            });
    })

    return (
        <div>
            <img src={profilepicture} alt ={'no image'} />
        </div>
    );
}
export default Imagetest;