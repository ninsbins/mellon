import axiosConfig from "./axiosConfig";


class UploadFilesService {
    upload(file) {
        let formData = new FormData();

        formData.append("file", file);

        return axiosConfig.post("/user/upload", formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        });
    }

}

export default new UploadFilesService();