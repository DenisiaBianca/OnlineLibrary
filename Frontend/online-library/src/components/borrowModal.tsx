import { Box, Button, makeStyles, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import { IProduct } from '../interfaces/products';
import ApiServices from '../services/apiServices';
import { generateGUID } from '../services/functions';

interface IProps {
    open: boolean;
    setOpen: any;
    product: IProduct;
    refreshList: any;
}

const useStyle = makeStyles(() => ({
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '200px',
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        textAlign: 'center'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        height: '120px',
        padding: '40px 50px 40px 50px',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 'auto'
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

const BorrowModal: React.FC<IProps> = ({setOpen, open, product, refreshList}) => {
    const classes = useStyle();
    const [loading, setLoading] = useState(false);
    const {reserveProduct} = ApiServices();

    async function borrowProduct()
    {   
        setOpen(false);
        setLoading(true);
        await reserveProduct(product.id);
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
                    <div>Do you want to borrow the <b>{product.name}</b> product? </div>
                    <div>First of all, you have to reserve it, than pick it up.</div>
                    <div className={classes.buttons}>
                        <Button className={classes.cancelButton} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button className={classes.saveButton} onClick={() => borrowProduct()}>Reserve</Button>
                    </div>  
                </div>
            </Box>
        </Modal>
    </div>
  )
}

export default BorrowModal