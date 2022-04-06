import React, { useState } from 'react'
import ImageUploader from 'react-images-upload';
import ProductsList from '../components/productsList';
import { IProduct } from '../interfaces/products';
import ApiServices from '../services/apiServices';


function MainPage() {
    const [img, setImg] = useState("");
    const {uploadImage} = ApiServices();
    let fileReader: FileReader;

    function onImageUpload(file : FileList | null ){
        if(file && file[0])
        {
            setImg(URL.createObjectURL(file[0]));
            console.log(file);
            var formdata = new FormData();
            formdata.append("file", file[0]);
            uploadImage(formdata);
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(file[0]);

        }
    }

    const handleFileRead = () => {
        const content = fileReader.result;
        console.log(content);
    }

  return (
    <div>
        UPLOAD
        <input type="file" name="myImage" onChange={(e) => onImageUpload(e.target.files)} />
        <img src={img} />
    </div>
  )
}

export default MainPage
