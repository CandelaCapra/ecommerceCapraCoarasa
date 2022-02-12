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

function ItemCount ({stock=1, initial=1, onAdd}) {
    const counter = useCounter(stock, parseInt(initial));

    return (
    <div>
        <Card style={{ width: '18rem' }} className="text-center mx-auto">
            <Card.Body>
                <InputGroup className="mb-3">
                    <Button variant="info" onClick={counter.subtract}> 
                        <Dash className="fs-3"></Dash>
                    </Button>
                    <FormControl value={counter.number} className="text-center border-info bg-transparent" readOnly/>
                    <Button variant="info" onClick={counter.add}>
                        <Plus className="fs-3"></Plus>
                    </Button>
                </InputGroup>
                <Button variant="info" onClick={()=> {onAdd(counter.number)}} disabled={counter.number===0}>Agregar al carrito</Button>
            </Card.Body>
        </Card>    
    </div>
    )
}

export {ItemCount};
