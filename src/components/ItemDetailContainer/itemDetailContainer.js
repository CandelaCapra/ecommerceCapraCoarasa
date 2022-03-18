import { useState, useEffect } from 'react'
import { ItemDetail } from '../ItemDetail/ItemDetail.js'
import { useParams, Link } from 'react-router-dom'
import { retrieveProduct } from '../../services/firebase/firebase.js'
import swal from 'sweetalert'
import { Button } from 'react-bootstrap'

const ItemDetailContainer = () =>{
    const [product, setProduct]=useState();
    const [loadingPage, setLoadingPage]= useState(true); 
    const {id} = useParams();

    useEffect (() => {
        setLoadingPage(true)
        retrieveProduct(id).then((resolve)=>{
            setProduct(resolve)
        }).catch(error=>{
            swal("Lo sentimos", error, "error")
        }).finally(()=>{
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
        : product.title === undefined ? 
            <div className='text-center'>
                <p className="mt-5 fs-4">El producto buscado no existe</p>
                <Link to={'/'}><Button variant="info">Volver al inicio</Button></Link>
            </div>
        :
            <ItemDetail key={product.id} product={product}></ItemDetail>
        }
        </>
    )
}

export {ItemDetailContainer};