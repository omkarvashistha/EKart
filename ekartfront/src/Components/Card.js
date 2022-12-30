import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css'
import {  useNavigate } from "react-router-dom";
import Rate from "./Rating";

const Card = ({id,pic,name,manufacturer,cost,rating,discountPercentage}) => {

    const navigate = useNavigate()

    const handleDetail = (event)=>{
        //alert(`name : ${name}`)
        window.localStorage.setItem("productName",name);
        navigate("/productDetails")
    }

    return (
        <>
            <div className="tc bg-dark bg-gradient  text-dark dib br-3 p-3 ma2 grow shadow-5 rounded card border border-dark">
                <img className="mx-auto" alt="product" src={pic} width='250px' height="200px"/>
                <div className="mt-2 d-flex flex-column text-white">       
                    {discountPercentage > 0 ? 
                            <><h4 className="display-6">₹{Math.ceil(cost - (cost * (discountPercentage/100)))}</h4></>
                        :
                        <><h4 className="display-6">₹{cost}</h4></>
                    }           
                    <h5>{name}</h5>
                    
                    <h5 className="fw-light">{`Manufacturer : ${manufacturer}`}</h5>
                    <Rate rating={rating}/>
                    {discountPercentage > 0 ? 
                        <div>
                            <h3 className="rainbow rainbow_text_animated">Deal of the Day</h3>
                            <p>{`Discount : ${discountPercentage}%`}</p>
                        </div> 
                            : 
                        <div className="mt-2">
                            <br/><br/><br/>
                        </div>
                    }
                    <button className="btn btn-warning" onClick={handleDetail}>View Product</button>
                </div>
            </div>
        </>
    )
}

export default Card