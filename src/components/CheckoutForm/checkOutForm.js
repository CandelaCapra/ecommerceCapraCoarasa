import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Timestamp, writeBatch, where, addDoc, collection, getDocs, query, documentId } from 'firebase/firestore';
import { db } from '../../services/firebase/firebase.js'
import swal from 'sweetalert';
import { CartContext } from "../../context/CartContext";
import {  useNavigate, Link } from "react-router-dom";

const CheckOutForm = ()=>{
    const [processingOrder, setProcessingOrder] = useState (false);
    const [value, setValue] = useState({
        name:"",
        surname:"",
        email:"",
        phone:""
    })

    const handleInput = (e) =>{
        setValue ( {
            ...value, 
            [e.target.id] : e.target.value   
        })   
    }
    
    const emailValidation = (value) =>{
        if (value.email!=="" && value.emailRepeat!==""){
            const regExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            
            if (value.email===value.emailRepeat && regExp.test(value.email)){
               return true
            }
        }else{
           return false
        }
    }
    
    const dataValidation = (value) => {
        if (value.name!=="" && value.surname!=="" && value.phone!==""){
            const regExpNumber= /^[0-9]*$/;
            const regExpLetter=/^[a-zA-Z\u00C0-\u017F\s]+$/;
            
            if(regExpLetter.test(value.name) && regExpLetter.test(value.surname) && regExpNumber.test(value.phone)){
                return true
            }
        }else{
            return false
        }
    }

    const {cart, cartTotal, clear} = useContext(CartContext);
    const navigate = useNavigate()

    const confirmOrder = (e) =>{
        e.preventDefault()

        const order = {
            buyer: value,
            items: cart,
            total: cartTotal(),
            date: Timestamp.fromDate(new Date())
        }

        if (dataValidation(value) && emailValidation(value)){
            setProcessingOrder(true)
            
            const batch = writeBatch(db);
            const noStockAvailable = [];
            const ids = order.items.map(i=>i.product.id);

            getDocs(query(collection(db,'products'), where(documentId(), 'in', ids)))
            .then(response=>{
                response.docs.forEach((docSnapshot)=> {
                    if(docSnapshot.data().stock >= order.items.find(prod=>prod.product.id === docSnapshot.id).quantity) {
                        batch.update(docSnapshot.ref, { stock: docSnapshot.data().stock - order.items.find(prod=>prod.product.id===docSnapshot.id).quantity})
                    }else{
                        noStockAvailable.push({id: docSnapshot.id, ...docSnapshot.data()})
                    }
                })
            }).then(()=>{
                if(noStockAvailable.length === 0){
                    addDoc(collection(db, 'orders'), order).then(({id})=>{
                        batch.commit()
                            clear()
                            swal("Confirmación de la order", `Su compra ha sido confirmada. Su número de seguimiento es ${id}.`, "success")     
                        }).catch(()=>{
                            swal("Lo sentimos", "Ha ocurrido un error. Intentá completar la compra más tarde", "error")
                        }).finally(()=>{
                            setProcessingOrder(false)
                            navigate('/')
                        })
                }else{
                    noStockAvailable.forEach(elem=>{
                        swal("Lo sentimos", `No tenemos stock de este producto: ${elem.title}`, "error")
                    })
                    clear()
                    setProcessingOrder(false)
                    navigate('/')
                }
            })

        }else if (dataValidation(value) && !emailValidation(value)){
            swal("Lo sentimos", "Los emails ingresados no coinciden", "error")
        }else{
            swal("Completá tus datos", "Alguno de los datos ingresados no es correcto. Para continuar debes completar todos los campos del formulario", "warning")
        }
    }

    return (
        <>
            {cart.length===0 && !processingOrder ?
                <div className='text-center mt-5'>
                    <p className='mb-5'>Antes de comprar tenés que agregar productos al carrito</p>
                    <Link to={'/'}><Button variant="info">Volver al inicio</Button></Link>
                </div>
            :
            processingOrder ?
            <>
                <h1 className="text-center mt-4 mb-5">Checkout</h1>
                <p className='text-center'>Procesando la orden de compra ...</p>
            </>
            :
            <div className="rounded shadow bg-white w-50 mx-auto mt-5">
                <h1 className="text-center fw-bold pt-4">Ingresá tus datos:</h1>
                <Form className="px-4">
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" className="border-info" onChange={handleInput}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="surname">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" className="border-info" onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"  className="border-info" onChange={handleInput}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="emailRepeat">
                        <Form.Label>Repetir email</Form.Label>
                        <Form.Control type="email"  className="border-info" onChange={handleInput}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="tel" placeholder="Sólo números. Ej:1100110000" className="border-info" onChange={handleInput}/>
                    </Form.Group>
                    <Button variant="info" type="submit" className="mb-4 mt-3 w-100" onClick={confirmOrder}>Finalizar compra</Button>
                </Form>
            </div>
            }
        </>
    )
}

export { CheckOutForm }
