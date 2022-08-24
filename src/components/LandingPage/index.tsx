import React from 'react'
import Header from '../utilities/Header'
import Createkudoboard from '../utilities/create-kudoboard'
import classes from './index.module.css'
import '../utilities/utilities.css'
import cardArray from '../../images/landing-page-card'
import Card from '../utilities/card'
const index = () => {
    const specificClass = (id: number) => id%2 !== 0 ? 'card-section-even' : ''
  return (
    <div>
        <Header/>
        <section className='common-layout'>
            <section className='heading-info'>
                <h1>Kudoboard is the Perfect Group Card for Special Occasions</h1>
                <p>Celebrate someone with an online group card filled with messages, GIFs, photos, & videos!</p>
                <Createkudoboard/>
            </section>
            <section className='card-section'>
                {cardArray.map((item, id) => {
                   return <Card image={item.image} title={item.title} name={item.from} idx ={item.idx} key={item.idx} className={specificClass(id)} />
                })}
            </section>
            
        </section>
    </div>
  )
}

export default index