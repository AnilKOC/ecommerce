import React, {useState, useEffect} from 'react'
import { Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { useNavigate } from 'react-router-dom'

function PaymentScreen() {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    let navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState()

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group> 
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type = 'radio'
                            label = 'PayPal'
                            id = 'paypal'
                            name = 'paymentMethod'
                            value = 'PayPal'
                            onChange = {(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>

                    <Col>
                        <Form.Check
                            type = 'radio'
                            label = 'Credit Card'
                            id = 'creditCard'
                            name = 'paymentMethod'
                            value = 'Credit Card'
                            onChange = {(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen