import { ItemList} from '../ItemList/ItemList.js'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { retrieveProducts } from '../../services/firebase/firebase.js'
import swal from 'sweetalert'

const ItemListContainer = ({greeting}) =>{
    const [products, setProducts]=useState([]);
    const {categoryId} = useParams();

    useEffect (() => {
        retrieveProducts(categoryId).then((response)=>{
           setProducts(response)
        }).catch((error)=>{
            swal("Lo sentimos", error, "error")
        })
        
        return (()=>{
            setProducts([]);
        })
    },[categoryId])
    
    return (
        <>
        {products[0] ? 
            <>
                <h1 className="text-center mt-4">
                    {categoryId===undefined ? greeting : categoryId==="comics" ?  "Cómics" : categoryId==="novelas" ? "Novelas gráficas" : "Manga" }
                </h1>
                <ItemList products={products}></ItemList>
            </> 
            :
                <p className="text-center mt-5 fs-4">Cargando productos ...</p>
        }
        </>
    )
}

export {ItemListContainer}

