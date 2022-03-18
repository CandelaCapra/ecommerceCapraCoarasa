import { useContext } from 'react';
import { CartContext } from '../../context/CartContext.js';
import {ItemCart} from '../ItemCart/ItemCart.js'
import {Button, Table} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Cart = () => {
    const {cart, cartTotal, clear} = useContext(CartContext);

    return (
        <>
        <h1 className=" text-center mt-4">Carrito</h1>
        {cart.length===0 ?
            <div className='text-center mt-5'>
                <p className='mb-5'>El carrito está vacío</p>
                <Link to={'/'}><Button variant="info">Volver al inicio</Button></Link>
            </div>
        :<>
            <Table className='w-75 mx-auto text-info text-center mt-5'>
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
            </Table>
            <div className='text-center'>
                <Button variant="outline-info" className='mx-auto text-dark border-2 me-2' onClick={clear}>Vaciar carrito</Button>
                <Link to={'/checkout'}>
                    <Button variant="info" className='mx-auto'>Confirmar compra</Button>
                </Link>
            </div>
        </>
        }
        </>
    )
}

export {Cart};