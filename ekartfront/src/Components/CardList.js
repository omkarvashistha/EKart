import React from "react";
import Card from "./Card";
import CartData from "./CartData";
const CardList = (({allProducts,flag}) => {
    return (
        <>
            {flag === false 
                ?
                <div className="d-flex flex-wrap justify-content-evenly">
                    {
                        allProducts.map((product,i) => {
                            return (
                                <Card
                                    key={i}
                                    id = {allProducts[i]._id}
                                    pic = {allProducts[i].productPicture}     
                                    name = {allProducts[i].productName} 
                                    manufacturer = {allProducts[i].manufacturer} 
                                    cost = {allProducts[i].cost}    
                                    rating = {allProducts[i].rating}          
                                    discountPercentage = {allProducts[i].discountPercentage}                            
                                />
                            )
                        })
                    }
                </div>
                :
                <div style={{width:"99%"}}>
                    {                        
                        allProducts.map((product,i) => {                                                      
                            return (
                                <CartData
                                    key={i}
                                    username = {product.username}
                                    grandTotal = {product.grandTotal}
                                    items = {product.items}
                                    totalDeliveryCharge = {product.totalDeliveryCharge}
                                    totalPrice = {product.totalPrice}
                                />
                            )
                        })
                    }
                </div>
            }

            
        </>
    )
})

export default CardList