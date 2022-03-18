import {Cart4} from 'react-bootstrap-icons'
import {Button} from 'react-bootstrap'
import { CartContext } from "../../context/CartContext.js"
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const CartWidget = () =>{
    const {cartQuantity} = useContext(CartContext);

    return (
        <div>
            <Link to={`/cart/`}>
                <Button variant="outline-info" className={`${cartQuantity()===0 && 'd-none' } border-0 text-white mt-1`}>
                    <Cart4 className='fs-4 mb-1' /> 
                    {cartQuantity()}
                </Button>
            </Link>
        </div>
    )
}

export {CartWidget};

