import {Navbar, Container, Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap'
import { CartWidget } from '../CartWidget/CartWidget.js'

const Navbarcustom = () => {
    return (
        <Navbar expand="lg" variant="dark" bg="dark">
            <Container>
                <div>
                    <h3 className='text-white'>The BookShop</h3>
                </div>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2">
                        <Button variant='outline-info' className="border-0">Novelas gráficas</Button> 
                        <Button variant='outline-info' className="border-0">Cómics</Button> 
                        <Button variant='outline-info' className="border-0">Manga</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                <CartWidget />
            </Container>    
        </Navbar>
    )
}

export {Navbarcustom};