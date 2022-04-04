import React, { useState } from 'react'
import ImageUploader from 'react-images-upload';
import ProductsList from '../components/productsList';
import { Product } from '../interfaces/products';
import ApiServices from '../services/apiServices';

const products : Product[] = [
    {
        Artist: "artist",
        Audio: "audio",
        Author: "autor",
        Categories: ["c", "a"],
        Country: "count",
        Cover: "https://denisia.blob.core.windows.net/covers/1041632-0-240.jpeg",
        Director: "dir",
        Id: 33,
        Language: "",
        Name: "It Ends With Us",
        Pages: 66,
        PublishHouse: "ff",
        PublishYear: 1800,
        RecordLabel: "f",
        Stock:300,
        Studio: "",
        Suport: "",
        Time: 120,
        TypeId: 1
    },
    {
        Artist: "artist",
        Audio: "audio",
        Author: "autor",
        Categories: ["c", "a"],
        Country: "count",
        Cover: "https://denisia.blob.core.windows.net/covers/1041632-0-240.jpeg",
        Director: "dir",
        Id: 33,
        Language: "",
        Name: "name",
        Pages: 66,
        PublishHouse: "ff",
        PublishYear: 1800,
        RecordLabel: "f",
        Stock:300,
        Studio: "",
        Suport: "",
        Time: 120,
        TypeId: 2
    }
]

function MainPage() {
    const [img, setImg] = useState("");
    const [pic, setPic] = useState("");
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
        <ProductsList products={products}/>
    </div>
  )
}

export default MainPage
