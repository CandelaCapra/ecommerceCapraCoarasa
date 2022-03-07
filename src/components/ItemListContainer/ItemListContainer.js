import { ItemList} from '../ItemList/itemList.js'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase/firebase.js'

const ItemListContainer = ({greeting}) =>{
    const [products, setProducts]=useState([]);
    const {categoryId} = useParams();

    useEffect (() => {
        const collectionRef = categoryId ?
            query(collection(db, 'products'), where('category', '==', categoryId)) :
            collection(db, 'products')
        getDocs(collectionRef).then(QuerySnapshot=>{
            const products = QuerySnapshot.docs.map(doc=>{
                return {id: doc.id, ...doc.data()}
            }) 
            setProducts(products)
        })
    
        return (()=>{
            setProducts([]);
        })
    },[categoryId])
    
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

