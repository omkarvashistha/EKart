import React from "react";
import { Container } from "./RatingStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


const starArray = [...Array(5).keys()].map(i => i + 1);

const Rate = ({rating}) => {
	return(
		<Container>
			{starArray.map((i) => { // use many times
				return (<FontAwesomeIcon
					key={i}
					icon={faStar}
					color={rating >= i ? "orange" : "lightgrey"}
				/>)
			})}
		</Container>
	)
	
}

export default Rate;
