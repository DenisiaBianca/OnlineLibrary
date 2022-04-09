import { Button, makeStyles } from '@material-ui/core';
import { Box, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { IProduct } from '../interfaces/products';
import ApiServices from '../services/apiServices';
import { generateGUID } from '../services/functions';

interface IProps {
    open: boolean;
    setOpen: any;
    refreshList: any;
    product: IProduct;
}

const useStyle = makeStyles(() => ({
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '250px',
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        textAlign: 'center'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        height: '70%',
        padding: '10%'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: 'auto'
    },
    cancelButton: {
        backgroundColor: '#9a8c98',
        width: '160px',
        color: 'white'
    },
    saveButton: {
        backgroundColor: '#6b705c',
        width: '160px',
        color: 'white'
    }
}));

const EditProductModal : React.FC<IProps> = ({open, setOpen, refreshList, product}) => {

    const classes = useStyle();
    const [stock, setStock] = useState(product.stock);
    const {updateProductStock} = ApiServices();
    const [loading, setLoading] = useState(false);

    async function updateProductData(){
        setOpen(false);
        setLoading(true);
        await updateProductStock(product.id, stock);
        refreshList(generateGUID());
        setLoading(false);
    }

  return (
    <div>
        {loading ? <div className="loader"></div> : <></>}
        <Modal
            open={open}
            onClose={() => setOpen(false)}>
            <Box className={classes.box}>
                <div className={classes.content}>
                    <div>Update the stock for the <b>{product.name}</b> product:</div><br/>
                    <TextField 
                        sx={{ m: '1%', minWidth: '300px' }}
                        label="Stock"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}/>
                    <div className={classes.buttons}>
                        <Button className={classes.cancelButton} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button className={classes.saveButton} onClick={() => updateProductData()}>Save</Button>
                    </div>  
                </div>
            </Box>
        </Modal>
    </div>
  )
}

export default EditProductModal