import { Button, makeStyles } from '@material-ui/core';
import React from 'react'
import { IProduct } from '../interfaces/products';

interface IProps {
    product: IProduct;
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
        <img className={classes.cover} src={product.cover} alt={product.name}></img>
        <div className ={classes.details}>
            <h2>{product.name}</h2>
            
            <span>Language: </span> {product.language}<br/>
            <span>Publication Year: </span> {product.publishYear}<br/>
            {/* <span>Categories: </span> {product.Categories.map((c) => <>{c}, </>)}<br/> */}

            {/* Book details */}
            {product.typeId === 1 && 
                <span>Author: {product.author} <br/> </span>}

            {/* Book - Magazine details */}
            {(product.typeId === 1 || product.typeId === 2) &&
                <><span>Publish House: {product.publishHouse}<br/></span>
                <span>Pages: {product.pages}<br/></span></>}

            {/* DVD details */}
            {product.typeId === 3 &&
                <><span>Director: {product.director}<br/></span>
                <span>Studio: {product.studio}<br/></span>
                <span>Time: {product.time} min<br/></span>
                <span>Country: {product.country}<br/></span></>}

            {/* CD details */}
            {product.typeId === 4 &&
                <><span>Artist: {product.artist}<br/></span>
                <span>RecordLabel: {product.recordLabel}<br/></span></>}

            {/* DVD - CD details */}
            {(product.typeId === 3 || product.typeId === 4) &&
                <><span>Suport: {product.suport}<br/></span>
                <span>Audio: {product.audio}<br/></span></>}

        </div>
        <div className={classes.details2}>
            <span>Stock: {product.stock}</span>
            <br/>
            <Button className={classes.borrowButton}>BORROW</Button> 
        </div>
    </div>
  )
}

export default ProductCard;
