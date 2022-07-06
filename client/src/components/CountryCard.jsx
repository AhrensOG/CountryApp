import React from "react";
import { Link } from "react-router-dom";
import s from './Styles/CountryCard.module.css'

// export default class Card extends React.Component {
//   constructor(props){
//     super(props)
//   }

//   componentDidMount(){
//     console.log('holaaaaaaaaaaaaa')
//   }

//   render(){
//     return (
//       <div className={s.card}>

//       <Link to={`/home/${this.props.id}`} >
//         <img className={s.img} src={this.props.img} alt="not found" />
//       </Link>
//       <div className={s.midDiv}>
//         <Link to={`/home/${this.props.id}`} >
//           <p className={s.p}>Country Name: {this.props.name}</p>
//         </Link>
//         <Link to={`/home/${this.props.id}`} >
//           <p className={s.p2}>Continent: {this.props.continent}</p>
//         </Link>
//       </div>
//     </div>
//     )
//   }
// }

export default function Card({img, name, continent, id}){
  return (
    <div className={s.card}>

      <Link to={`/home/${id}`} >
        <img className={s.img} src={img} alt="not found" />
      </Link>
      <div className={s.midDiv}>
        <Link to={`/home/${id}`} >
          <p className={s.p}>Country Name: {name}</p>
        </Link>
        <Link to={`/home/${id}`} >
          <p className={s.p2}>Continent: {continent}</p>
        </Link>
      </div>

    </div>
  )
};