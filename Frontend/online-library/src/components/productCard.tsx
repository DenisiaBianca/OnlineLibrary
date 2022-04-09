import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { IProduct, IProductWithCategoriesModel } from '../interfaces/products';
import apiServices from '../services/apiServices';
import { generateGUID } from '../services/functions';
import AddProductModal from './addProductModal';
import BorrowModal from './borrowModal';
import EditProductModal from './editProductModal';

interface IProps {
    product: IProductWithCategoriesModel;
    refreshList: any;
}

const useStyle = makeStyles(() => ({
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '15px 15px',
        alignItems: 'center',
        height: '220px',
        width: '70%',
        margin: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 8px',
        '&:hover': {
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        },   
    },
    cover: {
        height: '200px',
        width: '140px',
        objectFit: 'cover',
        objectPosition: 'center',
        marginRight: '30px'
    },
    details: {
       width: "60%",
       height: '100%',
       textAlign: 'left',
       marginTop: '15px',
       fontSize: '13px' 
    },
    details2: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        width: "100px",
        alignItems: 'end',
        textAlign: 'right'
    },
    borrowButton: {
        backgroundColor: '#6b705c',
        width: '160px',
        color: 'white',
        height: '25px'
    },
    editButton:{
        backgroundColor: '#f4a261',
        width: '160px',
        color: 'white',
        height: '25px'
    },
    deleteButton:{
        backgroundColor: '#bb3e03',
        width: '160px',
        color: 'white',
        marginTop: '10px',
        height: '25px'
    },
    text: {
        color: '#bb3e03',
        fontSize: '18px'
    }
}))

const ProductCard: React.FC<IProps> = ({product, refreshList}) => {
    const classes = useStyle();
    const [borrowModal, openBorrowModal] = useState(false);
    const [editOpenModal, setEditOpenModal] = useState(false);
    const {deleteProduct} = apiServices();

    async function deleteProductData(){
        await deleteProduct(product.product.id);
        refreshList(generateGUID());
    }
    
  return (
    <div className={classes.card}>
        <img className={classes.cover} src={product.product.cover} alt={product.product.name}></img>
        <div className ={classes.details}>
            <h2>{product.product.name}</h2>
            
            <span>Language: </span> {product.product.language}<br/>
            <span>Publication Year: </span> {product.product.publishYear}<br/>
            <span>Categories: </span> {product.categories != undefined && product.categories.map((c) => <>{c.name}, </>)}<br/>

            {/* Book details */}
            {product.product.typeId === 1 && 
                <><span>Author: {product.product.author} <br/> </span>
                <span>Pages: {product.product.pages}<br/></span></>}

            {/* Book - Magazine details */}
            {(product.product.typeId === 1 || product.product.typeId === 2) &&
                <span>Publish House: {product.product.publishHouse}<br/></span>}

            {/* DVD details */}
            {product.product.typeId === 3 &&
                <><span>Director: {product.product.director}<br/></span>
                <span>Studio: {product.product.studio}<br/></span>
                <span>Time: {product.product.time} min<br/></span>
                <span>Country: {product.product.country}<br/></span></>}

            {/* CD details */}
            {product.product.typeId === 4 &&
                <><span>Artist: {product.product.artist}<br/></span>
                <span>RecordLabel: {product.product.recordLabel}<br/></span></>}

            {/* DVD - CD details */}
            {(product.product.typeId === 3 || product.product.typeId === 4) &&
                <><span>Suport: {product.product.suport}<br/></span>
                <span>Audio: {product.product.audio}<br/></span></>}

        </div>
        <div className={classes.details2}>
            <span>Stock: {product.product.stock}</span>
            {
                localStorage.getItem("isAdmin") == "false" ?              
                    (product.status == 0 && <Button className={classes.borrowButton} onClick={() => openBorrowModal(true)}>BORROW</Button> ) ||
                    (product.status == 1 && <div className={classes.text} >RESERVED</div> ) ||
                    (product.status == 2 && <div className={classes.text} >BORROWED</div> ) ||
                    (product.status == 3 && <Button className={classes.borrowButton} onClick={() => openBorrowModal(true)}>BORROW AGAIN</Button> )
                : 
                (
                    localStorage.getItem("isAdmin") == "true" ?
                    <div>
                        <Button className={classes.editButton} onClick= {() => setEditOpenModal(true)}>EDIT</Button>
                        <Button className={classes.deleteButton} onClick={() => deleteProductData()}>DELETE</Button>
                    </div> : <></>
                ) 
            } 
        </div>
        <BorrowModal refreshList={refreshList} product={product.product} open={borrowModal} setOpen={openBorrowModal}/>
        <EditProductModal refreshList={refreshList} product={product.product} open={editOpenModal} setOpen={setEditOpenModal}/>
    </div>
  )
}

export default ProductCard;
