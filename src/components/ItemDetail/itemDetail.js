import { useContext, useState } from "react";
import { Row, Col, Container, Tabs, Tab, CardImg, Card, Button } from "react-bootstrap";
import { ItemCount } from "../ItemCount/itemCount.js"
import "../ItemDetail/itemDetail.css"
import { Link } from 'react-router-dom'
import { CartContext } from "../../context/CartContext.js";

const ItemDetail = ({product}) => {
    const [quantity, setQuantity] = useState(0); 
    const {addItem, retrieveItemQty} = useContext(CartContext);
    const [stock, setStock] = useState(product.stock-retrieveItemQty(product.id))
      
    const addToCart = (quantity) =>{
        if (quantity>0 && quantity<=stock){
            const newStock = stock-quantity;
            setStock(newStock);
            setQuantity(quantity);
            addItem(product, quantity);
        }
    }
  
    return (
        <>
        <Card className="mt-5 mb-3 border-0 px-5 mx-5">
            <Row>
                <Col md={4} className="mx-auto"> 
                    <CardImg className="rounded img-fluid shadow" src={product.pictureUrl}/>
                </Col>
                <Col className="ps-5" md={8}>
                    <Card.Body className="pt-0">
                        <h3>{product.title}</h3>
                        <h6 className="text-muted fw-bold">{product.author} <span className="fst-italic fw-light">(Autor)</span></h6>
                        <p className="fw-light letterSize pt-3">Edición {product.format} | Idioma {product.language} | {product.publisher} | {product.pages} páginas | ISBN:{product.isbn}</p>
                        <h4 className="mt-5 text-info">${product.price},00 <span className="text-dark fw-light fs-6 fst-italic">{product.stock>0 ? '(Stock disponible)' : '(Sin stock)'}</span></h4>
                        {quantity>0 ? 
                            <Link to={'/cart'}><Button variant="info" className="mt-3">Finalizar compra</Button></Link>
                        :
                            <ItemCount stock={stock} initial={stock>0 ? 1 : 0} addToCart={addToCart}></ItemCount>
                        }                   
                        <p className="mt-4 fw-light align-self-end"><span className="fw-bolder">Categorías:</span> {product.category==="novelas" ? product.category+" gráficas / Juvenil" : product.category==="comics" ? "Cómics" : "Manga"} / {product.title} </p>   
                    </Card.Body>
                </Col>
            </Row>
        </Card>
        <Container className="mb-5">
        <Tabs defaultActiveKey="sinopsis" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="sinopsis" title="Sinopsis" tabClassName="text-info fw-bolder">
                <p className="px-3">{product.plotSummary}</p>
            </Tab>
        </Tabs>
        </Container>
        </>
    )
}

export {ItemDetail};