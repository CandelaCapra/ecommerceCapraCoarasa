import {retrieveProduct} from '../../mocks/products.js'
import { useState, useEffect } from 'react';
import { ItemDetail } from '../ItemDetail/itemDetail.js';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () =>{
    const [product, setProduct]=useState();
    const [loadingPage, setLoadingPage]= useState(true); 
    const {id} = useParams();

    useEffect (() => {
        retrieveProduct(id).then((product)=>{
            setProduct(product);
        }) 
        .finally(()=>{
            setLoadingPage(false);
        })
    }, [id])

    return (
        <>
        {loadingPage ? 
            <p className="text-center mt-5 fs-4">Cargando detalles ...</p>
        :
            <ItemDetail key={product.id} product={product}></ItemDetail>
        }
        </>
    )
}

export {ItemDetailContainer};