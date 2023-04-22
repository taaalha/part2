import React from "react"

const Part = (props) => { console.log("Part props is",props)
return (
	<div>
		<p> 
		{props.name} {props.exercises}
		</p>
	</div>
)	
}

export default Part