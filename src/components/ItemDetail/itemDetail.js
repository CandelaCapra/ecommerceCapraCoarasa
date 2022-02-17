import { Row, Col, Image, Container, Tabs, Tab } from "react-bootstrap";
import { ItemCount } from "../ItemCount/itemCount.js"
import "../ItemDetail/itemDetail.css"

const ItemDetail = ({product}) => {
    return (
        <>
        <Container className="mt-5">
            <Row>
                <Col md="auto"> 
                    <Image className="rounded fluid ms-3" src={product.pictureUrl}/>
                </Col>
                <Col className="ms-3 mt-4">
                    <h3>{product.title}</h3>
                    <h6 className="text-muted fw-bold">{product.author} <span className="fst-italic fw-light">(Autor)</span></h6>
                    <p className="fw-light letterSize pt-3">Edición {product.format} | Idioma {product.language} | {product.publisher} | {product.pages} páginas | ISBN:{product.isbn}</p>
                    <h4 className="mt-5 text-info">${product.price},00 <span className="text-dark fw-light fs-6 fst-italic">(Stock disponible)</span></h4>
                    <ItemCount stock="4" initial="1"></ItemCount>
                    <p className="mt-4 fw-light align-self-end"><span className="fw-bolder">Categorías:</span> {product.category} / {product.title} </p>   
                </Col>
            </Row>
        </Container>
        <Container className="my-5">
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