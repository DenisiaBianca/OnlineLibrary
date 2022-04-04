import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Product } from '../interfaces/products';
import Book from './products/book';
import Magazine from './products/magazine';

interface IProps {
    products: Product[];
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
        <h4>List</h4>
        {products.map((p) =>
            (p.TypeId === 1 && <Book product={p}/>) || (p.TypeId === 2 && <Magazine/> )
        )}
    </div>
  )
}

export default ProductsList;


