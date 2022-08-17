import React from 'react'
import s from './Styles/Loader.module.css'
const Loader = () => {
  return (
    <div className={s.div}>
        <span className={s.loader}></span>
    </div>
  )
}

export default Loader