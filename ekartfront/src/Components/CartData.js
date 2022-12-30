import axios from "axios";
import React, { useState } from "react";
import CartDataCard from "./CartDataCard";
import Scroll from "./Scroll";
import { Fade , Alert } from "react-bootstrap";

const CardData = ({username,grandTotal,items,totalDeliveryCharge,totalPrice}) => {

    const [showAlert , setShowAlert] = useState(false)
    const [message , setMessage] = useState("")

    const placeOrder = (event) => {
        const ordersBody = {
            "username" : username,
            "dateOfOrder" : new Date(),
            "totalPrice" : totalPrice,
            "totalDeliveryCharge" : totalDeliveryCharge,
            "grandTotal" : grandTotal,
            "items" : items
        }
        axios.post(`http://localhost:5000/${username}/orders`,ordersBody).then((res)=>{
            setShowAlert(true)
            setMessage(res.data.message)
            setTimeout(() => {
                window.location.reload()
            }, 3000);
            
        }).catch((error)=>{
            alert(error.message)
        })
    }

    return (
        <>            
            {showAlert === true ?
                    <Fade appear={true} in={showAlert} onExited={showAlert} >
                        <Alert id="example-fade-text" transition="fade" style={{width:"fit-content",position:"fixed",left:"35%",top:"2%",zIndex:"2"}} className="text-center" variant="success" onClose={() => setShowAlert(false)} dismissible>
                            {message}
                        </Alert>
                    </Fade>
                     : null
            }
            <div className="d-flex flex-row justify-content-between mt-3 m-2 p-2" style={{width:"100%"}}>
                <div style={{width:"72%"}} className="bg-light p-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="display-6">Shopping Cart</h3>
                        <h3 className="fw-light text-green m-3" >Total Price</h3>
                        
                    </div>
                    <hr/>
                    <Scroll>
                        {items.map((item)=>{
                            return(
                            <CartDataCard
                                productPicture = {item.productPicture}
                                productName={item.productName}
                                cost = {item.cost}
                                total = {item.total}
                                deliveryCharge = {item.deliveryCharge}
                                quantity = {item.quantity}
                            />)
                        })}
                        
                    </Scroll>
                </div>
                <div style={{width:"25%" ,height:"fit-content"}} className="bg-light p-2">
                    <h5 className="m-2 fw-bold">{`Subtotal : ₹${grandTotal}`}</h5>
                    <button onClick={placeOrder} className="m-2 btn btn-warning fw-bold p-2 sticky-nav" style={{width:"90%"}}>Place order for {"("}{items.length} items{")"}</button>
                </div>
            </div>
        </>
    )
}

export default CardData