import { ItemCount } from '../ItemCount/itemCount.js';
import { ItemList} from '../ItemList/itemList.js'
import {retrieveProducts} from '../../mocks/products.js'
import { useState, useEffect } from 'react';

const ItemListContainer = ({greeting}) =>{
    const [products, setProducts]=useState([]);
    const [loadPage, setLoadPage]= useState(true); 

    const addToCart = (item) => {
        console.log(item)
    }

    useEffect (() => {
        retrieveProducts().then((products)=>{
            setProducts(products);
        })
        .finally(()=>{
            setLoadPage(false);
        })
    }, [])

    return (
        <>
        {loadPage ? (
                <p className="text-center mt-5 fs-4">Cargando productos ...</p>
        ) :
            <>
                <p className="fs-1 text-center mt-5">{greeting}</p>
                <ItemList products={products}></ItemList>
                <ItemCount stock="4" initial="1" onAdd={addToCart}></ItemCount> 
            </>
        }
        </>
    )
}

export {ItemListContainer};

