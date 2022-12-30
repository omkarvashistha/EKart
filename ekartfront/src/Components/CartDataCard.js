import React, { useState } from "react";
import { Fade , Alert } from "react-bootstrap";
import axios from 'axios'

const CartDataCard = ({productPicture,productName,cost,total,deliveryCharge,quantity}) => {
    const [qty , setQty] = useState(quantity)
    const [showAlert,setShowAlert] = useState(false)
    const username = localStorage.getItem("username")

    const deleteItem = () => {
        const requestObj = {
            "flag" : "delete",
            "productName" : productName,
            "quantity" : qty
        }

        axios.post(`http://localhost:5000/${username}/modifycart`,requestObj).then((res)=>{
                alert(res.data.message)
                window.location.reload()
            }).catch((error)=> {
                alert(error.message)
            })
    }

    const updateItem = () => {
        if(qty > 4) {
            setTimeout(() => {
                setShowAlert(false)
            }, 2000);
            setShowAlert(true)
            setQty(4)
        } else {
            const requestObj = {
                "flag" : "update",
                "productName" : productName,
                "quantity" : qty
            }
            axios.post(`http://localhost:5000/${username}/modifycart`,requestObj).then((res)=>{
                alert(res.data.message)
                window.location.reload()
            }).catch((error)=> {
                alert(error.message)
            })
        }
    }

    return(
        <>
            {showAlert === true ?
                    <Fade appear={true} in={showAlert} onExited={showAlert} >
                        <Alert id="example-fade-text" transition="fade" style={{width:"fit-content",position:"fixed",left:"30%",top:"2%",zIndex:"2"}} className="text-center" variant="warning" onClose={() => setShowAlert(false)} dismissible>
                            Selected Quantity is more than 4.<br/>
                            You can only have maximum of 4 items
                        </Alert>
                    </Fade>
                     : null
                }
            <div style={{width:"100%"}} className="bg-light text-dark d-flex justify-content-between  m-2 p-3">
                <div style={{width:"60%"}} className="d-flex ">
                    <img src={productPicture} className="bg-light" width="200px" height="200px" alt="product"/>
                    <div style={{marginLeft:"5%",width:"100%"}} className="display-6">
                        <h5 >{`${productName}`}</h5>
                        <div>
                            <input min={"0"} max="4"  style={{width:"50%",fontSize : "20px"}} type="number" value={qty} 
                                onChange={(e)=>{
                                    setQty(e.target.value)
                                }}
                            />
                            <div>
                                <button style={{marginRight:"2%"}} onClick={deleteItem} className="btn btn-danger">Delete</button>
                                {quantity === qty ?
                                    null:<button className="btn btn-warning" onClick={updateItem}>Update</button> 
                                } 
                                
                            </div>
                        </div>
                        {deliveryCharge > 0 ?
                            <h4 className="mt-2">{`Delivery : ₹${deliveryCharge}`}</h4> : null
                        }
                        <h4 className="fw-light mt-2">{`Price : ₹${cost}`}</h4>
                    </div>
                    
                </div>

                <div className="mt-2 d-flex justify-content-center ">
                    <h3 className="display-6">{`₹${total}`}</h3>
                    
                </div>
                
            </div>
            <div className="border bg-dark" style={{width:"100%",height:"1px"}}></div>
        </>
    )
}

export default CartDataCard