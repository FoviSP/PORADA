import React, {useState} from 'react'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import { useSearchParams } from "react-router-dom";


const Selector = ({buttons, components}) => {
	const [searchParams,setSearchParams] = useSearchParams();
  	const [selectedIndex, setSelectedIndex] = useState(searchParams.get('directs') ? 1 : 0);

	return (
		<>
		<ButtonGroup className="mb-2">
		{buttons.map((elem, index) => {
			return(
				<Button
					key={index}
		            variant={selectedIndex === index ? "primary" : "outline-primary"}
		            onClick={(e) => setSelectedIndex(index)}
	         	>
		         	{elem}
				</Button>
			)
		})
		}
		</ButtonGroup>
		<Card body>
			{components[selectedIndex]}
		</Card>
		</>
	)
}

export default Selector