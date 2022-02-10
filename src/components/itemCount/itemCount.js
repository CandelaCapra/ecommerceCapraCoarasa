import { useState } from 'react';
import {InputGroup, FormControl, Button, Card} from 'react-bootstrap';
import {Plus, Dash} from 'react-bootstrap-icons'

function ItemCount ({stock=1, initial=1, onAdd}) {
    const [number, setNumber] = useState (parseInt(initial)); 

    function add(){
        if (number<stock){
            setNumber (number+1);
        }else{
            alert("No hay stock")
        }
    }

    function subtract(){
        if (number>initial){
            setNumber (number-1);
        }
    }

    return (
    <div>
        <Card style={{ width: '18rem' }} className="text-center mx-auto">
            <Card.Body>
                <InputGroup className="mb-3">
                    <Button variant="info" onClick={subtract}> 
                        <Dash className="fs-3"></Dash>
                    </Button>
                    <FormControl value={number} className="text-center border-info" readOnly/>
                    <Button variant="info" onClick={add}>
                        <Plus className="fs-3"></Plus>
                    </Button>
                </InputGroup>
                <Button variant="info" onClick={()=> {onAdd(number)}}>Agregar al carrito</Button>
            </Card.Body>
        </Card>    
    </div>
    )
}

export {ItemCount};
