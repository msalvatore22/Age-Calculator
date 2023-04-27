import { useState } from 'react'
import './App.css'
import moment from 'moment';
import Form from './Components/form/Form'
import AgeDetail from './Components/detail/AgeDetail'


function App() {
  const [ageCalculation, setAgeCalculation] = useState(['-- years', '-- months', '-- days'])

  const calculateAge = (year, month, day) => {
    console.log("calculating age")
    const today = moment(new Date())
    const bday = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD')
    
    let yearDiff = today.diff(bday, 'year')
    bday.add(yearDiff, 'years')

    let monthDiff = today.diff(bday, 'months')
    bday.add(monthDiff, 'months')

    let dayDiff = today.diff(bday, 'days')
    
    let newAgeCalculation = [`${yearDiff} years`, `${monthDiff} months`, `${dayDiff} days`]
    setAgeCalculation([...newAgeCalculation])
  }

  return (
    <div className="app-container">
      <div className='age-card'>
        <Form calculateAge={calculateAge} />
        <AgeDetail ageCalculation={ageCalculation} />
      </div>
    </div>
  )
}

export default App
