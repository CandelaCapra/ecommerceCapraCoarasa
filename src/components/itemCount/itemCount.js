import {useState} from 'react';
import {InputGroup, FormControl, Button, Card} from 'react-bootstrap';
import {Plus, Dash} from 'react-bootstrap-icons'
import swal from 'sweetalert'

const useCounter = (stock=1, init=1) => {
    const [number, setNumber] = useState (init);

    const add = ()=> { 
        if (number<stock){
            setNumber(number +1)
        }else{
            swal("Lo sentimos",`Solo tenemos ${number} en stock`)
        }
    }
    
    const subtract = () => {
        if(number>0){
            setNumber(number -1)
        }else{
            setNumber(0);
        }
    }

    return {
        number, 
        add, 
        subtract
    }
}

const ItemCount = ({stock=1, initial=1, addToCart}) => {
    const counter = useCounter(stock, parseInt(initial));
    
    return (
    <div>
        <Card style={{ width: '18rem' }} className="border-0 mt-3">
            <Card.Body className="p-0">
                <InputGroup className="mb-3" style={{ width: '8.7rem' }} size="sm">
                    <Button variant="outline-info" onClick={counter.subtract} className="border-secondary" disabled={stock===0&& "disabled"}> 
                        <Dash className="fs-4 text-dark"></Dash>
                    </Button>
                    <FormControl value={counter.number} className="text-center border-secondary bg-transparent" readOnly/>
                    <Button variant="outline-info" onClick={counter.add} className="border-secondary" disabled={stock===0&& "disabled"}>
                        <Plus className="fs-4 text-dark"></Plus>
                    </Button>
                </InputGroup>
                <Button variant="info" onClick={()=>addToCart(counter.number)} style={{ width: '12rem' }} disabled={stock===0&& "disabled"}>Agregar al carrito</Button>
            </Card.Body>
        </Card>    
    </div>
    )
}

export {ItemCount};
