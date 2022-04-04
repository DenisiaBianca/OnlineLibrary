import axios, { AxiosResponse } from 'axios'

const baseUrl = "https://localhost:44311/api/";

export const ApiServices = () => {

    async function uploadImage(file : FormData){
        return await axios
            .post(baseUrl + "products/UploadImage", file)
            .then((response: any) => {
                console.log(response);
            })
            .catch((error: any) => {
                console.log(error);
            });  
    }

    return {
        uploadImage
    };
}

export default ApiServices;

