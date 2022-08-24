import React from 'react'
import './utilities.css'
type Props = {
    image: string,
    title: string,
    name: string,
    idx: number,
    className?: string
}

const Card = ({image, title, name, idx, className}: Props) => {
  return (
    <div className={`card-layout ${className}`}>
        <img src={image} alt={`image ${idx}`} />
        <p className='text'>{title}</p>
        <p className='text username'>From {name}</p>
    </div>
  )
}



export default Card