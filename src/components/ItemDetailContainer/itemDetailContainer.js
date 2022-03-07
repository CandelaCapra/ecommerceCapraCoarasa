import { useState, useEffect } from 'react';
import { ItemDetail } from '../ItemDetail/itemDetail.js';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebase.js';

const ItemDetailContainer = () =>{
    const [product, setProduct]=useState();
    const [loadingPage, setLoadingPage]= useState(true); 
    const {id} = useParams();

    useEffect (() => {
       setLoadingPage(true)
       
       const docRef = doc(db, 'products', id)

       getDoc(docRef).then(querySnapshot=>{
           const product = {id: querySnapshot.id, ...querySnapshot.data()}
           setProduct(product)
       })
        .finally(()=>{
            setLoadingPage(false);
        })
        return (()=>{
            setProduct()
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