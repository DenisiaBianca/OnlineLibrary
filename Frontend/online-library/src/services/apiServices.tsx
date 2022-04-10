import axios, { AxiosResponse } from 'axios'
import { IFilter, ISaveProduct } from '../interfaces/products';

//const baseUrl = "https://localhost:44311/api/";
const baseUrl = "https://onlinelibrary20220409223203.azurewebsites.net/api/";

export function getToken(){
    return localStorage.getItem("auth_token");
}

// axios.interceptors.request.use((req) => {
//     if(req.headers != undefined)
//     {
//         req.headers['Authorization'] = "Bearer " + getToken();
//         return req;
//     }
// });


export const ApiServices = () => {

    async function uploadFileToStorage(file : FormData | undefined, name : string | undefined){
        return await axios
            .post(baseUrl + "products/UploadImage?name=" + name, file, {headers: {'Authorization': 'Bearer ' + getToken()}})        
            .then((response: any) => {console.log(response);})
            .catch((error: any) => {console.log(error);}); 
             
    }

    async function getProducts(filter : IFilter){
        return await axios
            .post(baseUrl + "products/getProducts", filter, {headers: {'Authorization': 'Bearer ' + getToken()}})
            .then((response: any) => {return response.data;})
            .catch((error: any) => {console.log(error);});  
    }

    async function getCategories(){
        return await axios
            .get(baseUrl + "products/getCategories", {headers: {'Authorization': 'Bearer ' + getToken()}})
            .then((response: any) => {return response.data;})
            .catch((error: any) => {console.log(error);});  
    }

    async function saveProduct(product : ISaveProduct){
        return await axios
            .post(baseUrl + "products/SaveProduct", product, {headers: {'Authorization': 'Bearer ' + getToken()}})
            .then((response: any) => {return response.data;})
            .catch((error: any) => {console.log(error);});  
    }

    async function login(email:string, password:string){
        return await axios
            .post(baseUrl + "auth/login", {email:email, password:password}, {headers: {'Authorization': 'Bearer ' + getToken()}})
            .then((response: any) => {
                localStorage.setItem("auth_token", response.data.token);
                localStorage.setItem("isAdmin", response.data.isAdmin);
                localStorage.setItem("userEmail", response.data.userEmail);
                return "logged";
            })
            .catch((error: any) => {return "error"});
    }

    async function reserveProduct(productId : number | undefined){
        return await axios
            .post(baseUrl + "products/ReserveProduct?productId=" + productId, null , {headers: {'Authorization': 'Bearer ' + getToken()}})
            .then((response: any) => {return response.data})
            .catch((error: any) => {console.log(error)});
    }

    async function getAllBorrows(){
        return await axios
            .get(baseUrl + "products/getAllBorrows", {headers: {'Authorization': 'Bearer ' + getToken()}})
            .then((response: any) => {return response.data})
            .catch((error: any) => {console.log(error)});
    }

    async function updateBorrow(id: number, type: string){
        return await axios
            .post(baseUrl + "products/updateBorrow?id=" + id + "&type=" + type, null, {headers: {'Authorization': 'Bearer ' + getToken()}})
            .then((response: any) => {return response.data})
            .catch((error: any) => {console.log(error)});
    }

    async function deleteProduct(id: number | undefined){
        return await axios
            .delete(baseUrl + "products/DeleteProduct?id=" + id, {headers: {'Authorization': 'Bearer ' + getToken()}})
            .then((response: any) => {return response.data})
            .catch((error: any) => {console.log(error)});
    }

    async function updateProductStock(id: number | undefined, stock: number | undefined){
        return await axios
            .put(baseUrl + "products/UpdateProductStock?id=" + id + "&stock=" + stock, null, {headers: {'Authorization': 'Bearer ' + getToken()}})
            .then((response: any) => {return response.data})
            .catch((error: any) => {console.log(error)});
    }

    return {
        uploadFileToStorage,
        getProducts,
        getCategories,
        saveProduct,
        login,
        reserveProduct,
        getAllBorrows,
        updateBorrow,
        deleteProduct,
        updateProductStock
    };
}

export default ApiServices;

