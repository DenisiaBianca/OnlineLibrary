import { Button, makeStyles } from '@material-ui/core';
import React from 'react'
import { IProduct, IProductWithCategoriesModel } from '../interfaces/products';

interface IProps {
    product: IProductWithCategoriesModel;
}

const useStyle = makeStyles(() => ({
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0px 15px',
        alignItems: 'center',
        height: '250px',
        width: '70%',
        margin: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 8px',
        '&:hover': {
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        },   
    },
    cover: {
        height: '200px',
    },
    details: {
       width: "60%",
       height: '100%',
       textAlign: 'left',
       marginTop: '15px' 
    },
    details2: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '180px',
        width: "100px",
        alignItems: 'end',
        textAlign: 'right'
    },
    borrowButton: {
        backgroundColor: '#6b705c',
        width: '180px',
        color: 'white'
    }
}))

const ProductCard: React.FC<IProps> = ({product}) => {
    const classes = useStyle();
    
  return (
    <div className={classes.card}>
        <img className={classes.cover} src={product.product.cover} alt={product.product.name}></img>
        <div className ={classes.details}>
            <h2>{product.product.name}</h2>
            
            <span>Language: </span> {product.product.language}<br/>
            <span>Publication Year: </span> {product.product.publishYear}<br/>
            <span>Categories: </span> {product.categories != undefined && product.categories.map((c) => <>{c}, </>)}<br/>

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
            <br/>
            <Button className={classes.borrowButton}>BORROW</Button> 
        </div>
    </div>
  )
}

export default ProductCard;
