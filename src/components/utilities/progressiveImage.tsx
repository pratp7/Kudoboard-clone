import './utilities.css'
import {useState, useEffect} from 'react'

interface RestProps {
    alt:string,
    className:any
}

interface Props {
    placeholderSrc: string,
    src: string
}

const ProgressiveImage = ({placeholderSrc,src, ...props}: Props & RestProps) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src)
    const customClass = placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded"
    useEffect(() => {
        const img = new Image()
        img.src = src
        img.onload = () => { 
          setImgSrc(src)
        }
      }, [src])
  return (
    <img
      {...{ src: imgSrc, ...props }}
        alt={props.alt || ''}
        className={`${props.className} ${customClass}`}
    />
  )
}

export default ProgressiveImage