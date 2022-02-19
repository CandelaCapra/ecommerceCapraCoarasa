import {Card, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Item  = ({product}) => {
    return (
    <div> 
        <Card style={{ width: '18rem' }} className="text-center mx-2 my-3">
            <Card.Img variant="top" src={product.pictureUrl} className="fluid"/>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                    ${product.price} 
                </Card.Text>
               <Link to={`/item/${product.id}`}><Button variant="info">Ver más</Button></Link>
            </Card.Body>
        </Card>
    </div>
    )
}

export {Item};