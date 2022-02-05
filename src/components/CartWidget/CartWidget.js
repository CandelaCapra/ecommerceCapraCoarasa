import {Cart4} from 'react-bootstrap-icons'
import {Button} from 'react-bootstrap'

const CartWidget = () =>{
    return (
        <div>
            <Button variant="outline-info" className='border-0 text-white mt-1'>
                <Cart4 className='fs-4 mb-1' /> 
                0
            </Button>
        </div>
    )
}

export {CartWidget};