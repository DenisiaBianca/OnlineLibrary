import axios, { AxiosResponse } from 'axios'
import { IFilter, ISaveProduct } from '../interfaces/products';

const baseUrl = "https://localhost:44311/api/";

export const ApiServices = () => {

    async function uploadFileToStorage(file : FormData | undefined, name : string | undefined){
        return await axios
            .post(baseUrl + "products/UploadImage?name=" + name, file)
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

    async function saveProduct(product : ISaveProduct){
        console.log(product);
        return await axios
            .post(baseUrl + "products/SaveProduct", product)
            .then((response: any) => {
                return response.data;
            })
            .catch((error: any) => {
                console.log(error);
            });  
    }


    return {
        uploadFileToStorage,
        getProducts,
        getCategories,
        saveProduct
    };
}

export default ApiServices;

