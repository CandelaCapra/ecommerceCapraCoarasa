import {useState} from 'react';
import {InputGroup, FormControl, Button, Card} from 'react-bootstrap';
import {Plus, Dash} from 'react-bootstrap-icons'

const useCounter = (stock=1, init=1) => {
    const [number, setNumber] = useState (init);
    
    const add = ()=> {
        if (number<stock && number>0){
            setNumber(number +1)
        }else{
            alert(`Solo tenemos ${number} en stock`)
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

const ItemCount = ({stock=1, initial=1, onAdd}) => {
    const counter = useCounter(stock, parseInt(initial));

    return (
    <div>
        <Card style={{ width: '18rem' }} className="border-0 opacity-75 mt-3">
            <Card.Body className="p-0">
                <InputGroup className="mb-3" style={{ width: '8.7rem' }} size="sm">
                    <Button variant="outline-info" onClick={counter.subtract} className="border-secondary"> 
                        <Dash className="fs-4 text-dark"></Dash>
                    </Button>
                    <FormControl value={counter.number} className="text-center border-secondary bg-transparent" readOnly/>
                    <Button variant="outline-info" onClick={counter.add} className="border-secondary">
                        <Plus className="fs-4 text-dark"></Plus>
                    </Button>
                </InputGroup>
                <Button variant="info" onClick={()=> {onAdd(counter.number)}} disabled={counter.number===0} style={{ width: '12rem' }}>Agregar al carrito</Button>
            </Card.Body>
        </Card>    
    </div>
    )
}

export {ItemCount};
