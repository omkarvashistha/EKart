import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Scroll from "./Scroll";
import CardList from "./CardList";
import './Products.css'
import { Navigate, useNavigate } from "react-router-dom";

const Products = () => {

    const navigate = useNavigate()

    useEffect( () => {
        axios.get("http://localhost:5000/products").then( (res)=> {
            setProductsData(res.data.message)
        })

        let isLogged = localStorage.getItem("isLoggedIn")

        if(isLogged === null || isLogged === 'null') {
            navigate('/login')
        }

    },[navigate])

    const [searchField , setSearchField] = useState("")
    const [productsData , setProductsData] = useState([])

    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }

    const filterProductsData = productsData.filter( product => {
        return product.productName.toLowerCase().includes(searchField.toLowerCase())
    });

    return (
        <>
            <div className="" style={{border:"2px solid black"}}>
                <NavBar searchChange={onSearchChange}/>
                <div className="text-center mt-2">
                    {filterProductsData.length === 0 ? 
                        <h1>No Products Available</h1> 
                            : 
                            <CardList allProducts={filterProductsData} flag={false}/>
                    }
                </div>
                
            </div>
            
            

        </>
    )
}

export default Products