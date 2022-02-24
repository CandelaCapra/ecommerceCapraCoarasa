import { useState } from "react";
import { Row, Col, Container, Tabs, Tab, CardImg, Card, Button } from "react-bootstrap";
import { ItemCount } from "../ItemCount/itemCount.js"
import "../ItemDetail/itemDetail.css"
import { Link } from 'react-router-dom'

const ItemDetail = ({product}) => {
    const [quantity, setQuantity] = useState(0); 

    const addToCart = (quantity) =>{
        setQuantity(quantity);
        product.stock = product.stock - quantity;
    }

    return (
        <>
        <Card className="mt-5 mb-3 border-0 px-5 mx-5">
            <Row>
                <Col md={4} className="mx-auto"> 
                    <CardImg className="rounded img-fluid" src={product.pictureUrl}/>
                </Col>
                <Col className="ps-5" md={8}>
                    <Card.Body className="pt-0">
                        <h3>{product.title}</h3>
                        <h6 className="text-muted fw-bold">{product.author} <span className="fst-italic fw-light">(Autor)</span></h6>
                        <p className="fw-light letterSize pt-3">Edición {product.format} | Idioma {product.language} | {product.publisher} | {product.pages} páginas | ISBN:{product.isbn}</p>
                        <h4 className="mt-5 text-info">${product.price},00 <span className="text-dark fw-light fs-6 fst-italic">{product.stock!=0 ? '(Stock disponible)' : '(Sin stock)'}</span></h4>
                        {quantity!=0 ? 
                            <Link to={'/cart'}><Button variant="info" className="opacity-75 mt-3">Finalizar compra</Button></Link>
                        :
                            <ItemCount stock={product.stock} initial="1" addToCart={addToCart}></ItemCount>
                        }                   
                        <p className="mt-4 fw-light align-self-end"><span className="fw-bolder">Categorías:</span> {product.category==="Novelas" ? product.category+" gráficas / Juvenil" : product.category==="Comics" ? "Cómics" : product.category} / {product.title} </p>   
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