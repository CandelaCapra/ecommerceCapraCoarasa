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

    const cartQuantity = () =>{
        let total = 0;
        if (cart.length>0){
            cart.forEach(elem=>{
                total=elem.quantity+total;
            })
        }
        return total;
    }
    
    const cartTotal = () =>{
        let total= 0;
        if (cart.length>0){
            cart.forEach(elem=>{
                total=elem.quantity*elem.product.price+total;
            })
        }
        return total;
    }
    
    const retrieveItemQty = (productId) =>{
        if(isInCart(productId)){
            return  cart.find(elem=>elem.product.id===productId).quantity
        }else{
            return 0; 
        }
    }

    return (
        <CartContext.Provider value={{
            cart,
            addItem,
            removeItem,
            clear,
            cartQuantity, 
            cartTotal,
            retrieveItemQty
        }}>
            {children}
        </CartContext.Provider>
    )
}

export {CartContext, CartContextProvider}