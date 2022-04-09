import { Button, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import headerImage from '../images/Picture10.png'
import { IFilter, IProduct, IProductWithCategoriesModel } from '../interfaces/products'
import Filters from '../components/filters'
import ApiServices from '../services/apiServices';
import AddProductModal from '../components/addProductModal'
import ProductCard from '../components/productCard'
import LoginModal from '../components/loginModal'
import { Borrows } from '../components/borrows'
import { generateGUID } from '../services/functions';
import { ErrorNotification } from '../components/errorNotification'

const useStyle = makeStyles(() => ({
    header: {
        width: '100vw',
        height: '15%',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 8px',
    },
    image: {
        width: '100vw',
        height: '15%',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 8px',
    },
    content: {
        display: 'flex',
        width: '70%',
        justifyContent: 'center',
        top: '0px',
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
        marginTop: '0px',
        overflow: 'auto',
        '&::-webkit-scrollbar': { 
            display: 'none'
          }
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
    },
    text: {
        margin: "auto 20px",
        fontWeight: "bold",
    },
    loginLogoutButton: {
        backgroundColor: '#6b705c',
        height: '30px',
        color: 'white',
        margin: 'auto 0'
    }
}))

export default function HomePage() {
    const classes = useStyle();
    const [openAddProductModal, setOpenAddProductModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [filters, setFilters] = useState<IFilter>({Books: true, Magazines: true, CD: true, DVD: true});
    const [products, setProducts] = useState<IProductWithCategoriesModel[]>([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState<number>(1);
    const [refreshList, setRefreshList] = useState("");
    const {getProducts} = ApiServices();

    const getProductsData = async(filter: IFilter) => {
        const response: IProductWithCategoriesModel[] = await getProducts(filter);
        setProducts(response);
    }

    function logout(){
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("auth_token");
        setRefreshList(generateGUID());
        setSelectedMenuItem(1);
    }

    useEffect(() =>
    {
        getProductsData(filters);

    },[filters, refreshList])

  return (
    <div>
        <div className={classes.header}>
            <img src={headerImage} className={classes.image}></img>
        </div>
        <div className={classes.menu}>
            <div className={classes.menuList}>
                <Button onClick={() => setSelectedMenuItem(1)}><b>PRODUCTS</b></Button>
                {
                    localStorage.getItem("isAdmin") == "true" ? <Button onClick={() => setSelectedMenuItem(2)}><b>BORROWS</b></Button> : 
                    (localStorage.getItem("isAdmin") == "false" ? <Button onClick={() => setSelectedMenuItem(3)}><b>HISTORY</b></Button> : <></>)
                }
            </div>
            {
                localStorage.getItem("userEmail") == null ? <Button onClick={() => setOpenLoginModal(true)}><b>LOGIN</b></Button> : 
                <><div className={classes.text}>Log in as {localStorage.getItem("userEmail")}</div> <Button className={classes.loginLogoutButton} onClick={() => logout()}><b>LOGOUT</b></Button></>
            }
            
            <LoginModal refreshList={setRefreshList} open={openLoginModal} setOpen={setOpenLoginModal}/>
        </div>
        <div className={classes.content}>
        {
            (selectedMenuItem === 1 && 
            <>
                <div className={classes.filters}>
                    <Filters filter={filters} setFilter={setFilters}/>
                </div>
                <div className={classes.list}>
                    {
                        localStorage.getItem("isAdmin") == "true" ? <Button className={classes.addProductButton} onClick={() => setOpenAddProductModal(true)}><b>+ Add New Product</b></Button> : <></>
                    }
                    {products.length > 0 && products.map((p) =>
                        <ProductCard refreshList={setRefreshList} product={p}/>
                    )}
                </div>
            </>) ||
            (selectedMenuItem === 2 && <Borrows/>)
        }
        </div>
        <AddProductModal refreshList={setRefreshList} open={openAddProductModal} setOpen={setOpenAddProductModal}/>
    </div>
  )
}
