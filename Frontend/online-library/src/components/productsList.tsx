import React from 'react'
import { makeStyles } from '@material-ui/core';
import { IProduct } from '../interfaces/products';
import ProductCard from './productCard';

interface IProps {
    products: IProduct[];
}

const useStyle = makeStyles(() => ({
    tabel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%'
    },
}))

const ProductsList: React.FC<IProps> = ({products}) => {

    const classes = useStyle();

  return (
    <div>
        {products.length > 0 && products.map((p) =>
            <ProductCard product={p}/>
        )}
    </div>
  )
}

export default ProductsList;


