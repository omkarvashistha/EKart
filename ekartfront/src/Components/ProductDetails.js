import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import { Fade, ToastContainer } from "react-bootstrap";
import Rate from "./Rating";
import './Products.css'

const ProductDetails = () => {
    const productName = localStorage.getItem("productName")
    const [qty,setQty] = useState(1)
    const username = localStorage.getItem("username")
    const [message , setMessage] = useState("")
    const [show, setShow] = useState(false);
    const [showAlert , setShowAlert] = useState(false)
    const [productDetail , setproductDetail] = useState({
        "productPicture" : "",
        "productName" : "",
        "description" : "",
        "manufacturer" : "",
        "cost" : 0,
        "rating" : "",
        "colors" : [],
        "discountPercentage" : 0,
        "deliveryCharge" : 0,
        "avgRating" : {
            "reviews" : []
        }
    })



    const handleClick = (event)=>{

        if(qty > 4) {
            setShowAlert(true)
            setQty(4)
        } else {
            const itemsData = {                     
                "productName" : productDetail.productName,
                "quantity" : qty
            }
            axios.post(`http://localhost:5000/${username}/addtocart`,itemsData).then((res)=>{
                setMessage(res.data.message)
                setShow(true)
                setShowAlert(false)
            })
        }       
    }

    useEffect( () => {
        axios.get(`http://localhost:5000/${productName}/details`).then( (res)=>{
            setproductDetail(res.data.message[0])
            console.log(productDetail)
        })
    },[])

    return (
        <>
            <div>
                {showAlert === true ?
                    <Fade appear={true} in={showAlert} onExited={showAlert} >
                        <Alert id="example-fade-text" transition="fade" style={{width:"fit-content",position:"fixed",left:"35%",top:"2%",zIndex:"2"}} className="text-center" variant="warning" onClose={() => setShowAlert(false)} dismissible>
                            Selected Quantity is more than 4.<br/>
                            You can only have maximum of 4 items
                        </Alert>
                    </Fade>
                     : null
                }
                <NavBar searchChange={null}/>
                {
                    <div className="card rounded border m-3 p-2">
                        <div className="d-flex flex-row justify-content-between p-2">
                            <div>                        
                                <img alt="product" src={productDetail.productPicture} width="450px" height="450px"/>
                            </div>
                            <div className="mt-2 d-flex flex-column justify-content-start align-items-start" style={{width:"55%"}}>                                                
                                <h3  className="display-6 test">{`${productDetail.productName}`}</h3>
                                <div className="d-flex justify-content-start align-items-center " style={{width:"100%"}}>
                                    <Rate rating={productDetail.rating}/>
                                    <span className="" style={{"font-size" : "24px","margin-left" : "3%",width:"90%"}}>{`${productDetail.avgRating.reviews.length} ratings`}</span>
                                </div>
                                <div className="border bg-dark" style={{width:"100%",height:"1px"}}></div>
                                <div style={{width:"100%"}}>
                                    { productDetail.discountPercentage > 0 ? 
                                         <div className="" >
                                            <span className="text-danger" ><h2 className="fw-bold">Deal</h2></span>
                                            <span className="d-flex align-items-center" style={{width:"100%"}}>
                                                <h2 className="text-danger" style={{marginDown : "-2%"}}>
                                                    {`-${productDetail.discountPercentage}% `}
                                                </h2>
                                                <h3 style={{marginLeft : "3%"}}>
                                                    {`₹${Math.ceil(productDetail.cost - (productDetail.cost * (productDetail.discountPercentage/100)))}`}
                                                </h3>
                                            </span>
                                            
                                        </div>  
                                        :
                                        <h2>{`₹${productDetail.cost}`}</h2>
                                    }
                                </div>
                                <div>
                                    <span className="fw-bold" style={{fontSize:"25px"}}>About this item :</span>
                                    <h4 className="fw-light" style={{fontfamily : "Times new Roman"}}>{`• ${productDetail.description}`}</h4>
                                </div>
                                
                                <h3 className="">{`Colors Available : ${productDetail.colors}`}</h3>
                                <div className="d-flex flex-row  align-items-center  p-2" style={{width:"100%"}}>
                                    <button id="liveToastBtn" className="btn btn-success mt-1 fw-bold" style={{width:"60%",marginRight : "2%"}}
                                        onClick={handleClick}
                                        aria-controls="example-fade-text"
                                        aria-expanded={showAlert}
                                    >Add to cart</button>
                                    <input  
                                        style={{width:"15%"}}
                                        value={qty} type="number" placeholder="Enter Quantity" className="p-2 rounded"
                                        max={4}
                                        onChange={(e)=>{
                                        setQty(e.target.value)  
                                        }}
                                    />
                                </div>
                            
                            </div>
                            
                        </div>
                        <hr/>
                        <div className="text-center">
                            <h1 className="display-2"> Reviews</h1>
                            <div>
                                {productDetail.avgRating.reviews.map((review) => {
                                    return (
                                        <div>
                                            <Rate rating={review.rating}/>
                                            <p>{review.reviewComments}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            
                        </div>
                    </div>
                }

                {/* TOAST HERE */}

                <ToastContainer className="p-2" position="bottom-center">
                    {message === "Item already in cart" ? 
                        <Toast bg="danger" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                            <Toast.Header>
                                <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                                />
                                <strong className="me-auto">EKart</strong>
                                
                            </Toast.Header>
                            <Toast.Body className="text-center">{message}</Toast.Body>
                        </Toast> 
                        
                        :

                        <Toast bg="success" onClose={() => setShow(false)} show={show} delay={3000} autohide>
                            <Toast.Header>
                                <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                                />
                                <strong className="me-auto">EKart</strong>
                                
                            </Toast.Header>
                            <Toast.Body className="text-center">{message}</Toast.Body>
                        </Toast>
                    }
                </ToastContainer>
                
            </div>
            
        </>
    )

}

export default ProductDetails