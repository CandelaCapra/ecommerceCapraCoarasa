import { ItemCount } from '../itemCount/itemCount.js';

const ItemListContainer = ({greeting}) =>{
    const addToCart = (item) => {
        console.log(item)
    }

    return (
        <>
            <p className="fs-1 text-center mt-3">{greeting}</p>
            <ItemCount stock="4" initial="1" onAdd={addToCart}></ItemCount>
        </>
    )
}

export {ItemListContainer};