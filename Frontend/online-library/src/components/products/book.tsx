import { makeStyles } from '@material-ui/core';
import React from 'react'
import { Product } from '../../interfaces/products';

interface IProps {
    product: Product;
}

const useStyle = makeStyles(() => ({
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '240px',
        width: '50vw',
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
       width: "30vw",
       height: '200px',
       textAlign: 'left' 
    }
}))

const Book: React.FC<IProps> = ({product}) => {
    const classes = useStyle();
    
  return (
    <div className={classes.card}>
        <img className={classes.cover} src={product.Cover} alt={product.Name}></img>
        <div className ={classes.details}>
            <h2>{product.Name}</h2>
            <span>Author: </span> {product.Author}<br/>
            <span>Language: </span> {product.Language}<br/>
            <span>Publish House: </span> {product.PublishHouse}<br/>
            <span>Pages: </span> {product.Pages}<br/>
            <span>Publication Year: </span> {product.PublishYear}<br/>
            <span>Categories: </span> {product.Categories.map((c) => <>{c}, </>)}<br/>
        </div>
    </div>
  )
}

export default Book;
