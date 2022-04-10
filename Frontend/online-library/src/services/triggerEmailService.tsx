import axios, { AxiosResponse } from 'axios'

export const TriggerEmailService = () => {
    
    async function sendReservedProductEmail(email : string  | null, product: string | undefined){
        if(email != null && product != undefined){
            return await axios
                .post("https://prod-09.northcentralus.logic.azure.com:443/workflows/a98a9e2c760545a4b73c52be18b68cb6/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=p2UTpyNY27mX5N5ojuKYalE4wMg7ri7Fc07Hoyf_LJc",
                {emailAddress: email, productName: product})
                .then((response) => {return response.data})
                .catch((error) => {console.log(error)});
        }
    }

    return {
        sendReservedProductEmail
    };
}

export default TriggerEmailService;