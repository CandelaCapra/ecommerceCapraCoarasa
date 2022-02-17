import {retrieveProduct} from '../../mocks/products.js'
import { useState, useEffect } from 'react';
import { ItemDetail } from '../ItemDetail/itemDetail.js';

const ItemDetailContainer = () =>{
    const [product, setProduct]=useState({});
    const [loadPage, setLoadPage]= useState(true); 

    useEffect (() => {
        retrieveProduct().then((product)=>{
            setProduct(product);
        }) 
        .finally(()=>{
            setLoadPage(false);
        })
    }, [])

    return (
        <>
        {loadPage ? (
                <p className="text-center mt-5 fs-4">Cargando detalles ...</p>
        ) :
            <>
                <ItemDetail key={product.id} product={product}></ItemDetail>
            </>
        }
        </>
    )
}

export {ItemDetailContainer};