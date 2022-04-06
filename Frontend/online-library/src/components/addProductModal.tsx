
import { makeStyles } from '@material-ui/core';
import { YearPicker } from '@mui/lab';
import { FormControl, InputLabel, MenuItem, Select, Box, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ICategory, IProduct } from '../interfaces/products';
import ApiServices from '../services/apiServices';

interface IProps {
    open: boolean;
    setOpen: any;
}

const useStyle = makeStyles(() => ({
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '500px',
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
        justifyContent: 'center'
    }
}));

const AddProductModal : React.FC<IProps> = ({open, setOpen}) => {
    const classes = useStyle();
    const [form, setForm] = useState<IProduct>({});
    const [cover, setCover] = useState<FileList | null>(null)
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const {getCategories} = ApiServices();
    const years = [];

    for(var i = 2022; i >= 1900; i--)
    {
        years.push(i);
    }

    function setFormData(field: string, data: number | string | boolean){
        setForm({...form, [field] : data});
        console.log(form);
    }

    const getCategoriesData = async() => {
        const result = await getCategories();
        setCategories(result);
        console.log(result);
    }

    const handleChange = (event: { target: { value: any; }; }) => {
        const {
          target: { value },
        } = event;
        setSelectedCategories(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
      };
    
    useEffect(() =>
    {
        getCategoriesData();

    },[])


  return (
    <>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                            sx={{ m: '1%', minWidth: '68%' }}
                            id="name"
                            label="Name"
                            value={form.name}
                            onChange={(e) => setFormData("name", e.target.value)}
                        />
                    </div>
                    <div className={classes.row}>
                        <FormControl sx={{ m: '1%', minWidth: '49%' }}>
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
                                sx={{ m: '1%', minWidth: '49%' }}
                                label="Publish House"
                                value={form.publishHouse}
                                onChange={(e) => setFormData("publishHouse", e.target.value)}/></>}
                        {form.typeId === 3 && <>
                            <TextField 
                                sx={{ m: '1%', minWidth: '49%' }}
                                label="Studio"
                                value={form.studio}
                                onChange={(e) => setFormData("studio", e.target.value)}/></>}
                        {form.typeId === 4 && <>
                            <TextField 
                                sx={{ m: '1%', minWidth: '49%' }}
                                label="Racord Label"
                                value={form.recordLabel}
                                onChange={(e) => setFormData("recordLabel", e.target.value)}/></>}
                    </div>
                    <div className={classes.row}>
                        {form.typeId === 1 && <>
                            <TextField 
                                sx={{ m: '1%', minWidth: '49%' }}
                                label="Author"
                                value={form.author}
                                onChange={(e) => setFormData("author", e.target.value)}/></>}
                        {form.typeId === 3 && <>
                            <TextField 
                                sx={{ m: '1%', minWidth: '49%' }}
                                label="Director"
                                value={form.director}
                                onChange={(e) => setFormData("director", e.target.value)}/></>}
                        {form.typeId === 4 && <>
                            <TextField fullWidth
                                sx={{ m: '1%', minWidth: '49%' }}
                                label="Artist"
                                value={form.artist}
                                onChange={(e) => setFormData("artist", e.target.value)}/></>}
                        {form.typeId === 1 && <>
                            <TextField
                                type="number"
                                sx={{ m: '1%', minWidth: '49%' }}
                                label="Pages"
                                value={form.pages}
                                onChange={(e) => setFormData("pages", e.target.value)}/></>}
                        {form.typeId === 3 && <>
                            <TextField
                                type="number" 
                                sx={{ m: '1%', minWidth: '49%' }}
                                label="Time"
                                value={form.time}
                                onChange={(e) => setFormData("time", e.target.value)}/></>}
                    </div>
                    <div className={classes.row}>
                        {(form.typeId === 3 || form.typeId === 4) && <>
                            <TextField
                                sx={{ m: '1%', minWidth: '49%' }}
                                label="Audio"
                                value={form.audio}
                                onChange={(e) => setFormData("audio", e.target.value)}/>
                            <TextField
                                sx={{ m: '1%', minWidth: '49%' }}
                                label="Suport"
                                value={form.suport}
                                onChange={(e) => setFormData("suport", e.target.value)}/></>}
                    </div>
                    <div className={classes.row}>
                        {form.typeId === 3 && <>
                            <TextField 
                                sx={{ m: '1%', minWidth: '49%' }}
                                label="Country"
                                value={form.country}
                                onChange={(e) => setFormData("country", e.target.value)}/></>}
                        <TextField fullWidth 
                            sx={{ m: '1%', minWidth: '49%' }}
                            label="Language"
                            value={form.language}
                            onChange={(e) => setFormData("language", e.target.value)}/>
                    </div>
                    <div className={classes.row}>
                        <FormControl sx={{ m: '1%', minWidth: '49%' }}>
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
                            onChange={(e) => setFormData("stock", e.target.value)}/>
                        <FormControl sx={{ m: '1%', minWidth: '58%' }}>
                            <input id="files" type="file" name="myImage" onChange={(e) => setCover(e.target.files)} />
                        </FormControl>
                    </div>                           
                </div>
            </Box>
        </Modal>
    </>
  )
}

export default AddProductModal;
