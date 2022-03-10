import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { doc, addDoc, collection, Timestamp, writeBatch, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebase";
import swal from 'sweetalert';
import { CartContext } from "../../context/CartContext";
import {  useNavigate } from "react-router-dom";

const CheckoutForm = ()=>{
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
    
    const {cart, cartTotal, clear} = useContext(CartContext);
    const navigate = useNavigate()

    const confirmOrder = (e) =>{
        e.preventDefault()
        
        if (value.name!=="" && value.surname!=="" && value.phone!=="" && value.email!==""){
            setProcessingOrder(true)
            const order = {
                buyer: value,
                items: cart,
                total: cartTotal(),
                date: Timestamp.fromDate(new Date())
            }
            
            const batch = writeBatch(db);
            const noStockAvailable = [];
            
            order.items.forEach(item=> {
                getDoc(doc(db, 'products', item.product.id)).then(response=>{
                    if (response.data().stock>=item.quantity){
                        batch.update(doc(db, 'products', response.id), {
                            stock:response.data().stock-item.quantity
                        })
                    }else{
                        noStockAvailable.push({id: response.id, ...response.data()})
                    }

                    if(noStockAvailable.length===0){
                        addDoc(collection(db, 'orders'), order).then(({id})=>{
                            batch.commit().then(()=>{
                                clear();  
                                swal("Confirmación de la order", `Su compra ha sido confirmada. Su número de seguimiento es ${id}.`, "success") 
                            }) 
                        }).catch(error=>{
                            swal("Lo sentimos", "Se ha producido un error. Prueba a realizar la operación más tarde", "error")
                        }).finally(()=>{
                            setProcessingOrder(false);
                            navigate('/')
                        })
                    }
                })
            })                   
        }else{
            swal("Completá tus datos", "Para continuar debes completar todos los datos del formulario", "warning")
        }
    }

    return (
        <>
            {processingOrder ?
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
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="tel" placeholder="Sólo números. Ej:1100110000" className="border-info" onChange={handleInput} />
                    </Form.Group>
                    <Button variant="info" type="submit" className="mb-4 mt-3 w-100" onClick={confirmOrder}>Finalizar compra</Button>
                </Form>
            </div>
            }
        </>
    )
}

export { CheckoutForm }
