import { Button, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import headerImage from '../images/Picture10.png'
import { IFilter, IProduct, IProductWithCategoriesModel } from '../interfaces/products'
import Filters from '../components/filters'
import ApiServices from '../services/apiServices';
import MainPage from './mainPage'
import AddProductModal from '../components/addProductModal'
import ProductCard from '../components/productCard'

const useStyle = makeStyles(() => ({
    header: {
        width: '100vw',
        height: '15vh',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 8px',
    },
    image: {
        width: '100vw',
        height: '15vh',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 8px',
    },
    content: {
        display: 'flex',
        width: '70vw',
        alignItems: 'center',
        margin: '0px 15vw',
        height: '90vh',
        paddingTop: '30px'
    },
    filters: {
        textAlign: 'left',
        width: '10vw',
        height: '100%',
    },
    list: {
        textAlign: 'left',
        width: '60vw',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '0px'
    },
    menu: {
        width: '100vw',
        backgroundColor: '#b7b7a4',
        height: '5vh',
        alignItems: 'left',
        justifyContent: 'center',
        display: 'flex',
    },
    logo: {
        width: '230px',
        marginLeft: '50px',
        marginTop: '-60px',
        marginRight: 'auto'     
    },
    menuList: {
        width: '60vw',
        display: 'flex',
        alignItems: 'center',
    },
    addProductButton: {
        backgroundColor: '#b7b7a4',
        height: '25px'
    }
}))

export default function HomePage() {
    const classes = useStyle();
    const [openAddProductModal, setOpenAddProductModal] = useState(false);
    const [filters, setFilters] = useState<IFilter>({Books: true, Magazines: true, CD: true, DVD: true});
    const [products, setProducts] = useState<IProductWithCategoriesModel[]>([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState<number>(1);
    const {getProducts} = ApiServices();

    const getProductsData = async(filter: IFilter) => {
        const response: IProductWithCategoriesModel[] = await getProducts(filter);
        setProducts(response);
    }

    useEffect(() =>
    {
        console.log("UseEffects:");
        console.log(filters);
        getProductsData(filters);

    },[filters])

  return (
    <div>
        <div className={classes.header}>
            <img src={headerImage} className={classes.image}></img>
        </div>
        <div className={classes.menu}>
            <div className={classes.menuList}>
                <Button onClick={() => setSelectedMenuItem(1)}><b>PRODUCTS</b></Button>
                <Button onClick={() => setSelectedMenuItem(2)}><b>BORROWS</b></Button>
                <Button onClick={() => setSelectedMenuItem(3)}><b>HISTORY</b></Button>
            </div>
        </div>
        <div className={classes.content}>
        {
            (selectedMenuItem === 1 && 
            <>
                <div className={classes.filters}>
                    <Filters filter={filters} setFilter={setFilters}/>
                </div>
                <div className={classes.list}>
                    <Button className={classes.addProductButton} onClick={() => setOpenAddProductModal(true)}><b>+ Add New Product</b></Button>
                    {products.length > 0 && products.map((p) =>
                        <ProductCard product={p}/>
                    )}
                </div>
            </>) ||
            (selectedMenuItem === 2 && 
            <>
                <MainPage/>
            </>)
        }
        </div>
        <AddProductModal open={openAddProductModal} setOpen={setOpenAddProductModal}/>
    </div>
  )
}
