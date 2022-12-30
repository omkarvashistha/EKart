import React from "react";


const Scroll =  (props) => {
    return (
        <>
            <div className="d-flex flex-wrap justify-content-between">
                {props.children}
            </div>
        </>
    )
}

export default Scroll