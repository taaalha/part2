import React from "react"
import Part from "./part"

const Content = (props) => { 	
	console.log("Content props is",props)

    const singlepart = props.parts.map(
		part => <Part key={part.id} name={part.name} exercises={part.exercises} />
 	)
    // to get the total of all the exercises, we use reduce function.
	const total = props.parts.reduce((acc,parts) => acc + parts.exercises, 0 )

	/*
	In the above code, props.parts is the entire array. when we map it, we target 
	only 1 individual thing from it, and call it part. that's the name on the left side of =>.
	then on the right side of =>, we access individual elements of that. so part.id, part.name etc.
	*/

	return (
	<div>
		{singlepart}
		<strong> Total of {total} exercises </strong>  	
	</div>
	)
}

export default Content