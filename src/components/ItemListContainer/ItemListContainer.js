import { ItemList} from '../ItemList/itemList.js'
import {retrieveProducts} from '../../mocks/products.js'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ItemListContainer = ({greeting}) =>{
    const [products, setProducts]=useState([]);
    const {categoryId} = useParams();

    useEffect (() => {
        retrieveProducts(categoryId).then((products)=>{
           setProducts(products);
        })  
       return (()=>{
           setProducts([]);
       })
    },[categoryId])
    

    //Dependiendo de la categoría en la que se encuentra se genera el título de la página
    return (
        <>
        {products[0] ? 
            <>
                <p className="fs-1 text-center mt-4">{categoryId===undefined ? greeting : categoryId==="comics" ?  "Cómics" : categoryId==="novelas" ? "Novelas gráficas" : "Manga" }</p>
                <ItemList products={products}></ItemList>
            </> 
            :
                <p className="text-center mt-5 fs-4">Cargando productos ...</p>
        }
        </>
    )
}

export {ItemListContainer};

