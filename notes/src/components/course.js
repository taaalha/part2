import React from "react"
import Header from "./header"
import Content from "./content"


const Course = (props) => {
	const individual = props.course.map((content) => (
		<div key = {content.id} >
		<Header name={content.name} />
		<Content parts={content.parts} />
		</div>
	))
	return (
		<div>
			{individual}
		</div>
	)
}


export default Course
