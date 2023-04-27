import React from 'react'
import './ageDetail.css';

const AgeDetail = ({ageCalculation}) => {
  return (
    <div className='age-detail-container'>
      {
        ageCalculation.map((d, i)=> {
          let purpleText = d.split(" ")[0]
          if(purpleText == "--"){
            purpleText = "- -"
          }
          return <h1 key={i} className="age-detail"><span>{purpleText}</span> {d.split(" ")[1]}</h1>
        })
      }
    </div>
  )
}

export default AgeDetail