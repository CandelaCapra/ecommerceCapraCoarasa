import { Item } from "../Item/item";
import {CardGroup} from "react-bootstrap"

function ItemList ({products}){
    return (
        <div>
           <CardGroup className="justify-content-md-center">
                   {products.map(product => {return <Item key={product.id} product={product}></Item>})}
            </CardGroup>
        </div>
    )
}

export {ItemList}