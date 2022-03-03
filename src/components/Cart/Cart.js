import { useContext } from 'react';
import { CartContext } from '../../context/CartContext.js';
import {ItemCart} from '../ItemCart/ItemCart.js'
import {Button, Table} from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Cart = () => {
    const {cart, cartTotal} = useContext(CartContext);
    return (
        <>
        <p className="fs-1 text-center mt-4">Carrito</p>
        {cart.length===0 ? 
            (<div className='text-center mt-5'>
                <p className='mb-5'>El carrito está vacío</p>
                <Link to={'/'}><Button variant="info">Volver al inicio</Button></Link>
            </div>)
        : 
            (<Table className='w-75 mx-auto text-info text-center mt-5'>
                <thead className="text-dark">
                    <tr>
                        <th></th>
                        <th>Título</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item=><ItemCart key={item.product.id} item={item}></ItemCart>)}
                    <tr className="border-2 border-info border-start-0 border-end-0">
                        <td className='text-start text-dark'>Total a pagar:</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="fw-bolder fs-5 text-info">${cartTotal()},00</td>
                    </tr>
                </tbody>
            </Table>)
        }
        </>
    )
}

export {Cart};