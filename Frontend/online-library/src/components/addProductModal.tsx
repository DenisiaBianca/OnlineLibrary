
import { makeStyles } from '@material-ui/core';
import { YearPicker } from '@mui/lab';
import { FormControl, InputLabel, MenuItem, Select, Box, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import { IProduct } from '../interfaces/products';

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
        justifyContent: 'space-between'
    }
}));

const AddProductModal : React.FC<IProps> = ({open, setOpen}) => {
    const classes = useStyle();
    const [form, setForm] = useState<IProduct>({});
    const years = [];

    for(var i = 2022; i >= 1900; i--)
    {
        years.push(i);
    }

    function setFormData(field: string, data: number | string | boolean){
        setForm({...form, [field] : data});
        console.log(form);
    }


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
                                onChange={(e) => setFormData("TypeId", e.target.value)}
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
                            onChange={(e) => setFormData("Name", e.target.value)}
                        />
                    </div>
                    <div className={classes.row}>
                        <FormControl sx={{ m: '1%', minWidth: '36%' }}>
                            <InputLabel id="publish-date">Publish year</InputLabel>
                            <Select
                                labelId="publish-date"
                                id="publish-date"
                                value={form?.publishYear}
                                onChange={(e) => setFormData("PublishYear", e.target.value)}
                                label="Publish Year"
                            >
                                {years.map((y) => <MenuItem value={y}>{y}</MenuItem>)}
                            </Select>
                        </FormControl> 
                    </div>                          
                </div>
            </Box>
        </Modal>
    </>
  )
}

export default AddProductModal;
