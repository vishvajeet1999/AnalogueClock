import React, { useState, useEffect } from "react";
import Clock from "./Clock";
import "./App.css"

const App = () => {

  const [secondRatio, setSecondRatio] = useState(0)
  const [minuteRatio, setMinuteRatio] = useState(0)
  const [hourRatio, setHourRatio] = useState(0)
  const [clearing, setClearing] = useState()
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [changed, setChanged ] = useState(false)
  const [ minutes, setMinutes ] = useState(0)
  const [seconds, setSeconds ] = useState(0)
  const [hour, setHour] = useState(0)
  const [revisedTime, setRevisedTime] = useState(0)
  const [clearSettedInterval, setClearSettedInterval] =useState('')
  const [ accessedTime, setAccessedTime ] = useState()

  useEffect(() => {
    setClearing(() => setInterval(() => {
        setTime(new Date().toLocaleTimeString('en-US', {hour12: false}))
        const currentDate = new Date;
        // console.log(typeof currentDate)
       setSecondRatio(currentDate.getSeconds() / 60)
       setMinuteRatio((secondRatio + currentDate.getMinutes()) / 60) 
       setHourRatio((minuteRatio + currentDate.getHours()) / 12)
    }, 1000))
},[])


const hourHandle = (e) =>{
  setHour(parseInt(e.target.value))
}
const minuteHandle = (e) =>{
  setMinutes(parseInt(e.target.value))
  // console.log(e.target.value)
}
const secondsHandle = (e) =>{
  setSeconds(parseInt(e.target.value))
}



const formSubmit = (e) =>{
  setChanged(true)
  e.preventDefault()
  clearInterval(clearing)
  clearInterval(clearSettedInterval)
  setRevisedTime(hour * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000 - 19800000 + 86400000) 
  

  setClearSettedInterval(setInterval(() => {
    // const currentDate = new Date(revisedTime);
    //   console.log(currentDate)
    //   setSecondRatio(currentDate.getSeconds() / 60)
    //   setMinuteRatio((secondRatio + currentDate.getMinutes()) / 60) 
    //   setHourRatio((minuteRatio + currentDate.getHours()) / 12)
    //   console.log(minuteRatio)
    //   console.log(secondRatio)
    //   console.log(hourRatio)
      setRevisedTime(prev => prev+1000)
  }, 1000))
  

  
}

const getTime = () =>{
  setAccessedTime(new Date().toLocaleTimeString())
}
const getModifiedTime = () =>{
  setAccessedTime(new Date(revisedTime).toLocaleTimeString())
}

console.log(new Date(revisedTime).getSeconds()/60)
console.log((new Date(revisedTime).getSeconds()/60 + new Date(revisedTime).getMinutes()/60))

  return (
    <div>
    <Clock secondRatio={!changed?secondRatio : new Date(revisedTime).getSeconds()/60 } 
    
    minuteRatio= {!changed? minuteRatio: ((new Date(revisedTime).getSeconds()/60 + new Date(revisedTime).getMinutes())/60)} 
    hourRatio= {!changed? hourRatio : (((new Date(revisedTime).getSeconds()/60 + new Date(revisedTime).getMinutes())/60 +
    new Date(revisedTime).getHours())/12)} />

    <>
    <div>
            {!changed ? time : new Date(revisedTime).toLocaleTimeString('en-US', {hour12: false})}
        </div>

        <div>
            <p>{accessedTime}</p>
            <button onClick={!changed ? getTime : getModifiedTime}>get time</button>
        </div>

        <div>
        <form onSubmit={formSubmit}>
            <label>hours</label>
            <input type="number"  min="1" max="23" 
            onChange={hourHandle}></input><br />
            <label >minutes</label>
            <input type="number"
            min="0" max="59"
            onChange={minuteHandle}  />
            <br />
            <label >seconds</label>
            <input type="number"
            min="0" max="59"
            onChange={secondsHandle}  />
            <button type='submit'> set time</button>
        </form>
    </div>
    </>
    </div>
  );
};

export default App;
