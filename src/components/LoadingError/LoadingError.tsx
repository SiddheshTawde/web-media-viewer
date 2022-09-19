import React from 'react'
import './LoadingError.css'

const LoadingError = () => {
	return (
		<div className='error-container'>
			<h3>Cannot Load Media</h3>
			<h5>There was some error loading this media</h5>
		</div>
	)
}

export default LoadingError