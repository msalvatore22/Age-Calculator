import { useState } from 'react';
import './form.css';
import moment from 'moment';
import '../../assets/icon-arrow.svg'

const Form = ({calculateAge}) => {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [invalidDay, setInvalidDay] = useState(false)
  const [invalidMonth, setInvalidMonth] = useState(false)
  const [invalidYear, setInvalidYear] = useState(false)
  const [emptyDay, setEmptyDay] = useState(false)
  const [emptyMonth, setEmptyMonth] = useState(false)
  const [emptyYear, setEmptyYear] = useState(false)
  const [invalidForm, setInvalidForm] = useState(false)

  const currentYear = moment().year()
  const requiredMessage = "This field is required"
  const ininvalidFormMessage = "Must be a valid date"

  const inputs = [
    {
      "label": "DAY",
      "placeholder": "DD",
      "value": day,
      "minLength": 1,
      "maxLength": 2,
      "invalidText": "Must be a valid day",
      "invalid": invalidDay,
      "empty": emptyDay
    },
    {
      "label": "MONTH",
      "placeholder": "MM",
      "value": month,
      "minLength": 1,
      "maxLength": 2,
      "invalidText": "Must be a valid month",
      "invalid": invalidMonth,
      "empty": emptyMonth
    },
    {
      "label": "YEAR",
      "placeholder": "YYYY",
      "value": year,
      "minLength": 4,
      "maxLength": 4,
      "invalidText": "Must be a year in the past",
      "invalid": invalidYear,
      "empty": emptyYear
    }
  ]

  const numbersOnly = (str) => {
    return /^[0-9]+$/.test(str)
  }

  const isValidDay = (day) => {
    if(day == ""){
      setInvalidDay(false)
      return
    }
    if(!numbersOnly(day)){
      setInvalidDay(true)
      return
    }
    let dayNumber = parseInt(day)
    if(dayNumber>0 && dayNumber<32){
      setInvalidDay(false)
    } else {
      setInvalidDay(true)
    }
  }

  const isValidMonth = (month) => {
    if(month == ""){
      setInvalidMonth(false)
      return
    }
    if(!numbersOnly(month)){
      setInvalidMonth(true)
      return
    }
    let monthNumber = parseInt(month)
    if(monthNumber>0 && monthNumber<13){
      setInvalidMonth(false)
    } else {1
      setInvalidMonth(true)
    }
  }

  const isValidYear = (year) => {
    if(year == ""){
      setInvalidYear(false)
      return
    }
    if(!numbersOnly(year)){
      setInvalidYear(true)
      return
    }
    if(year.length == 4){
      let yearNumber = parseInt(year)
      if(yearNumber>1900 && yearNumber<=currentYear){
        setInvalidYear(false)
      } else {
        setInvalidYear(true)
      }
    }
  }

  const handleChange = (inputText, label) => {
    if(label == "DAY"){
      setDay(inputText)
      setEmptyDay(false)
      isValidDay(inputText)
    }
    if(label == "MONTH"){
      setMonth(inputText)
      setEmptyMonth(false)
      isValidMonth(inputText)
    }
    if(label == "YEAR"){
      setYear(inputText)
      setEmptyYear(false)
      isValidYear(inputText)
    }
    setInvalidForm(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(year == ""){
      setEmptyYear(true)
    } else {
      setEmptyYear(false)
    }
    if(month == ""){
      setEmptyMonth(true)
    } else {
      setEmptyMonth(false)
    }
    if(day == ""){
      setEmptyDay(true)
    } else {
      setEmptyDay(false)
    }

    if(day.length>0 && month.length>0 && year.length>0){
      let validDate = moment(`${year}-${month}-${day}`, 'YYYY-M-D', true)._isValid
      setInvalidForm(!validDate)

      if(!invalidYear && !invalidMonth && !invalidDay && validDate){
        calculateAge(year, month, day)
      }
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className='inputs'>
        {inputs.map((input)=>{
          let inputStyle = {
            border: input.invalid || input.empty ? '1px solid hsl(0, 100%, 67%)' : '1px solid hsl(0, 0%, 86%)'
          }

          let labelStyle = {
            color: input.invalid || input.empty ? 'hsl(0, 100%, 67%)' : 'hsl(0, 1%, 44%)' 
          }
          
          return (
            <div key={input.label} className="form-field">
              <label className='input-label' htmlFor={input.label} style={labelStyle}>{input.label}</label>
              <input
                id={input.label}
                type='text' 
                placeholder={input.placeholder} 
                onChange={(e) => handleChange(e.currentTarget.value, input.label)} 
                value={input.value} 
                minLength={input.minLength}
                maxLength={input.maxLength}
                style={inputStyle}
                className='form-input'
              />
              <p className='invalid-message'>
                {
                  input.empty ? requiredMessage : "" || input.invalid ? input.invalidText : ""
                }
              </p>
            </div>
          )
        })}
      </div>
      <p className='invalid-form'>{invalidForm ? ininvalidFormMessage : ""}</p>
      <div className='btn-container'>
        <div className='horizontal-line'></div>
        <button type='submit' className="submit-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44">
            <g fill="none" stroke="#FFF" strokeWidth="2">
              <path 
                d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"
              />
              </g>
          </svg>
        </button>
      </div>
    </form>
  )
}

export default Form