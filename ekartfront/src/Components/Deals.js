import React from "react";
import CardList from "./CardList";
import NavBar from "./NavBar";
import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Deals = () => {

    const navigate = useNavigate()

    useEffect( () => {
        axios.get("http://localhost:5000/deals").then( (res)=> {
            setProductsData(res.data.message)
        })
        
        let isLogged = localStorage.getItem("isLoggedIn")

        if(isLogged === null || isLogged === 'null') {
            navigate('/login')
        }
    },[])

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
            <div className="tc">
                <NavBar searchChange={onSearchChange}/>
                <h3 className="display-3">Today's Deals</h3>
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

export default Deals