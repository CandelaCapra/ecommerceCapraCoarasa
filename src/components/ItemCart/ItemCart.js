import { CardImg, Button } from 'react-bootstrap'
import { X } from 'react-bootstrap-icons'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'

const ItemCart = ({item}) =>{
    const {removeItem} = useContext(CartContext)

    const removeFromCart = () =>{
        item.product.stock=item.product.stock+item.quantity;
        removeItem(item.product.id)
    }

    return (
        <tr className="text-dark align-middle">
            <td className='text-start'><CardImg className="rounded img-fluid w-auto" style={{maxHeight: '150px'}} src={item.product.pictureUrl}/></td>
            <td className="fw-bold">{item.product.title}</td>
            <td className="text-muted">{item.quantity}</td>
            <td>${item.product.price*item.quantity},00</td>
            <td>
                <Button onClick={removeFromCart} className="border-0 bg-transparent">
                    <X className='fs-4 mb-1 text-dark'/>
                </Button>
            </td>
        </tr>
    )
}

export {ItemCart}