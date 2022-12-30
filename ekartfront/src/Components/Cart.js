import React, { useEffect, useRef } from "react";
import NavBar from "./NavBar";
import { useState } from "react";
import axios from "axios";
import CardList from "./CardList";
import './Cart.css'

const Cart = () => {
    let cartData = useRef({});
    const [data,setData] = useState([])
    const username = window.localStorage.getItem("username")

    useEffect(()=> {
        axios.get(`http://localhost:5000/${username}/cart`).then((res)=> {
            cartData.current = (res.data.message)
            setData(res.data.message)

        }).catch((error)=>{
            console.log(error.message)
        })
    },[])
    console.log(cartData.current)
    return (
        <>
            <div id="cartBody">  
                <NavBar searchChange={null}/>
                {cartData.current.length > 0 
                    ?
                    <CardList allProducts={cartData.current} flag={true}/>
                    :
                    <div className="text-center p-2 d-flex flex-column justify-content-center align-items-center">
                        <img width={"300px"} height="300px" alt="cart" src={process.env.PUBLIC_URL + 'assets/empty-cart.png'}/>
                        <h1 className="fw-bold">Cart is empty add some items</h1>
                    </div>
                }
            </div>
        </>
    )
}

export default Cart