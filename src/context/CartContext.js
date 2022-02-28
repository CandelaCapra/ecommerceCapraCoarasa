import { createContext, useState } from "react";

const CartContext = createContext();

const CartContextProvider = ({children})=>{
    const [cart, setCart] = useState([]);

    const addItem = (product, quantity) =>{
        if (isInCart(product.id)) {
            const modifiedCart = cart.map(elem=>{
                if(elem.product.id===product.id){
                    elem.quantity = elem.quantity+quantity;
                }
                return elem;
            })
            setCart(modifiedCart)
        } else {
            const newObj = {product: product, quantity:quantity}
            setCart([...cart, newObj]);
        }
    }

    const removeItem = (productId) =>{
        const filteredCart = cart.filter(elem=>elem.product.id!==productId);
        setCart(filteredCart)
    }

    const clear = () =>{
        setCart([]);
    }

    const isInCart = (productId) =>{
        return cart.some(elem=> elem.product.id===productId);
    }

    return (
        <CartContext.Provider value={{
            cart,
            addItem,
            removeItem,
            clear,
            isInCart
        }}>
            {children};
        </CartContext.Provider>
    )
}

export {CartContext, CartContextProvider}