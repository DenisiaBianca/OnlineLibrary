import axios, { AxiosResponse } from 'axios'
import { IFilter } from '../interfaces/products';

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

    async function getProducts(filter : IFilter){
        return await axios
            .post(baseUrl + "products/getProducts", filter)
            .then((response: any) => {
                return response.data;
            })
            .catch((error: any) => {
                console.log(error);
            });  
    }

    async function getCategories(){
        return await axios
            .get(baseUrl + "products/getCategories")
            .then((response: any) => {
                return response.data;
            })
            .catch((error: any) => {
                console.log(error);
            });  
    }

    return {
        uploadImage,
        getProducts,
        getCategories
    };
}

export default ApiServices;

