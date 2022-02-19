import {Navbar, Container, Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap'
import { CartWidget } from '../CartWidget/CartWidget.js'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { retrieveCategories } from '../../mocks/products.js'

const Navbarcustom = () => {
    const [category, setCategory]= useState([]);

    useEffect (() => {
        retrieveCategories().then(category=>{
            setCategory(category);   
        })
    }, [])
    
    return (
        <Navbar expand="lg" variant="dark" bg="dark">
            <Container>
                <div>
                    <Link to='/' className="text-decoration-none"><h3 className='text-white'>The BookShop</h3></Link>
                </div>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2">
                        {category.map(cat => <Link key={cat.id} to={`/category/${cat.id}`}><Button variant='outline-info' className="border-0">{cat.catName}</Button></Link>)}
                    </ButtonGroup>
                </ButtonToolbar>
                <CartWidget />
            </Container>    
        </Navbar>
    )
}

export {Navbarcustom};