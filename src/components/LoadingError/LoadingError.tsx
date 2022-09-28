import React, { FunctionComponent, PropsWithChildren } from 'react'
import { TiWarningOutline } from 'react-icons/ti'
import './LoadingError.css'

const LoadingError: FunctionComponent<PropsWithChildren> = ({ children }) => {
	return (
		<div className='error-container'>
			<TiWarningOutline fontSize={72} />
			<h3>Cannot Load Media</h3>
			<h5>There was some error loading this media</h5>
			<div className='divider' />
			{children}
		</div>
	)
}

export default LoadingError