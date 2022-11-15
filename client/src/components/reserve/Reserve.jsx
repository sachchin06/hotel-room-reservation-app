import './reserve.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useState } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const Reserve = ({setOpen, hotelId}) => {

  const {data,loading,error} =useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`)

  const [selectedRooms, setSelectedRooms] = useState([])

  const {dates} = useContext(SearchContext)

  const navigate = useNavigate();
  
  const getDatesRange = (startDate,endDate)=>{
    const start = new Date(startDate)
    const end = new Date(endDate)
    const date = new Date(start.getTime())

    let list = []
    while(date <= end) {
      list.push(new Date(date).getTime())
      date.setDate(date.getDate()+1)
    }
    return list
  }

const selectedDates = getDatesRange(dates[0].startDate, dates[0].endDate);

const isAvailable = (roomNumber) => {
  const isFound = roomNumber.unavailableDates.some((date)=> selectedDates.includes(new Date(date).getTime()))

  return !isFound
}
  

const handleChange = (e)=>{
  const checked = e.target.checked
  const value = e.target.value
  setSelectedRooms(
    checked 
      ? [...selectedRooms, value]
      : selectedRooms.filter((item)=> item !== value)
  )
  
}

const handleReserveBtn = async ()=>{
  try {
    await Promise.all(selectedRooms.map(roomId=>{
      const res = axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, {dates:selectedDates})
    }))

    setOpen(false)
    navigate("/")
    
  }catch (error) {
    console.log(error);
  }
  
}

  return (
    <div className='reserve'>
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={()=> {setOpen(false)}} />

            <span>Select Your Rooms:</span>
           {
            data.map((item)=>(
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max People: <b>{item.maxPeople}</b>
                    </div>
                    <div className="rPrice">LKR: {item.price}</div>
                    </div>

                    <div className="selectRooms">
                    {item.roomNumbers.map(roomNumber=>(
                        <div className="room" key={roomNumber._id}>
                          <label>{roomNumber.number}</label>
                          <input type="checkbox" value={roomNumber._id} 
                          onChange={handleChange}
                          disabled={!isAvailable(roomNumber)} />
                        </div>
                      ))}
                      </div>
                    
                
              </div>
            ))
           }
            
            <button onClick={handleReserveBtn} className='rButton'>Reserve Now!</button>
        </div>
    </div>
  )

          }