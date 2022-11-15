import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import axios from "axios";
import { green } from "@mui/material/colors";
import useFetch from "../../hooks/useFetch";

const NewRoom = () => {

  const {data, loading, error} = useFetch("/hotels")
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  

  
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    
    let roomNumbers =  rooms.split(",").numbers.map((roomNumber)=>({
       number:roomNumber
    }))

    // const room = {
    //   ...info,
    //   roomNumbers: roomNumbers
    // };
   
    try {
    
      await axios.post(`/rooms/${hotelId}`, {...info, roomNumbers})

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
         
          <div className="formfield">
            <form>
             
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Choose a Hotel</label>
                <select id="hotelId" onChange={e=>setHotelId(e.target.value)}>
                
                  { loading ? "loading" 
                  : data[0] &&

                  <option key={data[0]._id} value={data[0]._id}>{data[0].name}</option> &&
                    data.map((hotel)=>(
                      
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))
                  }  
                </select>
              </div>

              <div className="formInput">
                <label>Rooms</label>
              <textarea onChange={e=>setRooms(e.target.value)} placeholder="Enter room numbers between comma"></textarea>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
