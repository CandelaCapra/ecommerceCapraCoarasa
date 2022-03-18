import { Navbar, Container, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
import { CartWidget } from '../CartWidget/CartWidget.js'
import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { retrieveCategory } from '../../services/firebase/firebase.js'

const Navbarcustom = () => {
    const [category, setCategory]= useState([]);

    useEffect (() => {
        retrieveCategory().then((resolve)=>{
            setCategory(resolve)
        })
    }, [])

    return (
        <Navbar expand="lg" variant="dark" bg="dark">
            <Container>
                <div>
                    <Link to='/' className="text-decoration-none my-2"><h3 className='text-white'>The BookShop</h3></Link>
                </div>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2">
                        {category.map(cat => <NavLink key={cat.id} to={`/category/${cat.id}`} className={(navData) => navData.isActive ? "mx-2 link-info" : "mx-2 text-decoration-none link-info" }>{cat.catName}</NavLink>)}
                    </ButtonGroup>
                </ButtonToolbar>
                <CartWidget />
            </Container>    
        </Navbar>
    )
}

export {Navbarcustom};