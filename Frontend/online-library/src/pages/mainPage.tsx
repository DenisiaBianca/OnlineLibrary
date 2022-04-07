import React, { useState } from 'react'
import ApiServices from '../services/apiServices';


function MainPage() {
    const [img, setImg] = useState("");
    const {uploadFileToStorage} = ApiServices();
    let fileReader: FileReader;

    function onImageUpload(file : FileList | null ){
        if(file && file[0])
        {
            setImg(URL.createObjectURL(file[0]));
            console.log(file);
            var formdata = new FormData();
            formdata.append("file", file[0]);
            uploadFileToStorage(formdata, "ceva");
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
