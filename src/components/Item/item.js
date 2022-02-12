import {Card, Button} from 'react-bootstrap'

function Item ({product}){
    return (
    <div> 
        <Card style={{ width: '18rem' }} className="text-center mx-2 my-5">
            <Card.Img variant="top" src={product.pictureUrl} className="fluid"/>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                    ${product.price} 
                </Card.Text>
               <Button variant="info">Ver más</Button>
            </Card.Body>
        </Card>
    </div>
    )
}

export {Item};