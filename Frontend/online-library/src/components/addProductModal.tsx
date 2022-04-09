
import { Button, makeStyles } from '@material-ui/core';
import { YearPicker } from '@mui/lab';
import { FormControl, InputLabel, MenuItem, Select, Box, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ICategory, IProduct, IProductWithCategoriesModel, ISaveProduct } from '../interfaces/products';
import ApiServices from '../services/apiServices';
import { generateGUID, wait } from '../services/functions';
import { ErrorNotification } from './errorNotification';

interface IProps {
    open: boolean;
    setOpen: any;
    refreshList: any;
}

const useStyle = makeStyles(() => ({
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: 'auto',
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        textAlign: 'center',
        padding: '15px'
    },
    content: {
        textAlign: 'left',
        padding: '20px',
        fontWeight: 'bold'
    },
    row: {
        display: 'flex',
        justifyContent: 'left',

    },
    buttons: {
        margin: '60px 40px 10px 40px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: '#9a8c98',
        width: '200px',
        color: 'white'
    },
    saveButton: {
        backgroundColor: '#6b705c',
        width: '200px',
        color: 'white'
    }
}));

const AddProductModal : React.FC<IProps> = ({open, setOpen, refreshList}) => {
    const classes = useStyle();
    const [form, setForm] = useState<ISaveProduct>({});
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [allcategories, setAllCategories] = useState<ICategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [file, setFile] = useState<FormData | undefined>();
    const {getCategories, saveProduct, uploadFileToStorage} = ApiServices();
    const [loading, setLoading] = useState(false);
    const [tryToSave, setTryToSave] = useState(false);
    const years = [];

    for(var i = 2022; i >= 1900; i--)
    {
        years.push(i);
    }

    function setFormData(field: string, data: number | string | boolean | undefined){
        setForm({...form, [field] : data});
        if(field == "typeId"){
            setCategories(allcategories.filter(c => c.productTypeId == data));
            setSelectedCategories([]);
        }
    }

    function setCover(files : FileList | null){
        if(files && files[0]){
            const covername = generateGUID() + ".jpg";
            setFormData("cover", covername);

            var fileToFormData = new FormData();
            fileToFormData.append("file", files[0]);
            setFile(fileToFormData);
        }
    }

    const getCategoriesData = async() => {
        const result = await getCategories();
        setAllCategories(result);
    }

    const handleChange = (event: { target: { value: any; }; }) => {
        const { target: { value },} = event;
        setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
        setForm({...form, categories : value});
    };

    async function saveProductData()
    {
        setTryToSave(true);
        if(verifyFields())
        {
            setOpen(false);
            setLoading(true);
            await saveProduct(form);
            await uploadFileToStorage(file, form.cover);
            refreshList(generateGUID());
            setLoading(false);
        }

        setTimeout(() => setTryToSave(false), 4000);
    }

    
    useEffect(() =>
    {
        getCategoriesData();
    },[])

    const verifyFields = () => {
        if(form.typeId == 1 && form.name != null && form.publishYear != null && form.publishHouse != null && form.language != null && form.stock != null && form.cover != null && selectedCategories != null){
            return true           
        }
        if(form.typeId == 3 && form.name != null && form.publishYear != null && form.studio != null && form.director != null && form.time != null && form.audio != null && form.suport != null && form.country != null && form.language != null && form.stock != null && form.cover != null && selectedCategories != null){
            return true           
        }
        if(form.typeId == 2 && form.name != null && form.publishYear != null && form.publishHouse != null && form.language != null && form.stock != null && form.cover != null && selectedCategories != null){
            return true           
        }
        if(form.typeId == 4 && form.name != null && form.publishYear != null && form.recordLabel != null && form.artist != null && form.audio != null && form.suport != null && form.language != null && form.stock != null && form.cover != null && selectedCategories != null){
            return true           
        }
        
        return false;
    }

  return (
    <>
        {loading ? <div className="loader"></div> : <></>}
        {tryToSave && !verifyFields() && <ErrorNotification message="You mush complete all the fields!"/>}
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box className={classes.box}>
                <h2>Add new Product</h2>
                <br/>
                <div className={classes.content}> 
                    <div className={classes.row}>
                        <FormControl sx={{ m: '1%', minWidth: '30%'}}>
                            <InputLabel id="product-type">Product type</InputLabel>
                            <Select
                                labelId="product-type"
                                id="product-type"
                                value={form?.typeId}
                                onChange={(e) => setFormData("typeId", e.target.value)}
                                label="Product type"
                            >
                                <MenuItem value={1}>Book</MenuItem>
                                <MenuItem value={2}>Magazine</MenuItem>
                                <MenuItem value={3}>DVD</MenuItem>
                                <MenuItem value={4}>CD</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField 
                            sx={{ m: '1%', minWidth: '66%' }}
                            required
                            id="name"
                            label="Name"
                            value={form.name}
                            onChange={(e) => setFormData("name", e.target.value)}
                        />
                    </div>
                    <div className={classes.row}>
                        <FormControl sx={{ m: '1%', minWidth: '48%' }}>
                            <InputLabel id="publish-date">Publish year</InputLabel>
                            <Select
                                labelId="publish-date"
                                value={form?.publishYear}
                                onChange={(e) => setFormData("publishYear", e.target.value)}
                                label="Publish Year">
                                {years.map((y) => <MenuItem value={y}>{y}</MenuItem>)}
                            </Select>
                        </FormControl>
                        {(form.typeId === 1 || form.typeId === 2) && <>
                            <TextField 
                                sx={{ m: '1%', minWidth: '48%' }}
                                label="Publish House"
                                value={form.publishHouse}
                                onChange={(e) => setFormData("publishHouse", e.target.value)}/></>}
                        {form.typeId === 3 && <>
                            <TextField 
                                sx={{ m: '1%', minWidth: '48%' }}
                                label="Studio"
                                value={form.studio}
                                onChange={(e) => setFormData("studio", e.target.value)}/></>}
                        {form.typeId === 4 && <>
                            <TextField 
                                sx={{ m: '1%', minWidth: '48%' }}
                                label="Racord Label"
                                value={form.recordLabel}
                                onChange={(e) => setFormData("recordLabel", e.target.value)}/></>}
                    </div>
                    <div className={classes.row}>
                        {form.typeId === 1 && <>
                            <TextField 
                                sx={{ m: '1%', minWidth: '48%' }}
                                label="Author"
                                value={form.author}
                                onChange={(e) => setFormData("author", e.target.value)}/></>}
                        {form.typeId === 3 && <>
                            <TextField 
                                sx={{ m: '1%', minWidth: '48%' }}
                                label="Director"
                                value={form.director}
                                onChange={(e) => setFormData("director", e.target.value)}/></>}
                        {form.typeId === 4 && <>
                            <TextField fullWidth
                                sx={{ m: '1%', minWidth: '48%' }}
                                label="Artist"
                                value={form.artist}
                                onChange={(e) => setFormData("artist", e.target.value)}/></>}
                        {form.typeId === 1 && <>
                            <TextField
                                type="number"
                                sx={{ m: '1%', minWidth: '48%' }}
                                label="Pages"
                                value={form.pages}
                                onChange={(e) => setFormData("pages", Number(e.target.value))}/></>}
                        {form.typeId === 3 && <>
                            <TextField
                                type="number" 
                                sx={{ m: '1%', minWidth: '48%' }}
                                label="Time"
                                value={form.time}
                                onChange={(e) => setFormData("time", Number(e.target.value))}/></>}
                    </div>
                    <div className={classes.row}>
                        {(form.typeId === 3 || form.typeId === 4) && <>
                            <TextField
                                sx={{ m: '1%', minWidth: '48%' }}
                                label="Audio"
                                value={form.audio}
                                onChange={(e) => setFormData("audio", e.target.value)}/>
                            <TextField
                                sx={{ m: '1%', minWidth: '48%' }}
                                label="Suport"
                                value={form.suport}
                                onChange={(e) => setFormData("suport", e.target.value)}/></>}
                    </div>
                    <div className={classes.row}>
                        {form.typeId === 3 && <>
                            <TextField 
                                sx={{ m: '1%', minWidth: '48%' }}
                                label="Country"
                                value={form.country}
                                onChange={(e) => setFormData("country", e.target.value)}/></>}
                        <TextField fullWidth 
                            sx={{ m: '1%', minWidth: '48%' }}
                            label="Language"
                            value={form.language}
                            onChange={(e) => setFormData("language", e.target.value)}/>
                    </div>
                    <div className={classes.row}>
                        <FormControl fullWidth sx={{ m: '1%', minWidth: '48%' }}>
                            <InputLabel id="categories">Categories</InputLabel>
                            <Select
                                labelId="categories"
                                value={selectedCategories}
                                multiple
                                onChange={handleChange}
                                label="Categories">
                                {categories.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.row}>
                        <TextField
                            type="number" 
                            sx={{ m: '1%', minWidth: '40%' }}
                            label="Stock"
                            value={form.stock}
                            onChange={(e) => setFormData("stock", Number(e.target.value))}/>
                        <FormControl sx={{ m: '1%', minWidth: '58%' }}>
                            <input id="files" type="file" name="myImage" onChange={(e) => setCover(e.target.files)} />
                        </FormControl>
                    </div>
                    <div className={classes.buttons}>
                        <Button className={classes.cancelButton} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button className={classes.saveButton} onClick={() => saveProductData()}>Save product</Button>
                    </div>                           
                </div>
            </Box>
        </Modal>
    </>
  )
}

export default AddProductModal;

