import "./hotel.css";
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCircleXmark,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../../components/footer/Footer";
import { MailList } from "../../components/mailList/MailList";
import { useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Reserve } from "../../components/reserve/Reserve";


export const Hotel = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const hotelId = location.pathname.toString().split("/", 3);
  // const hotelId = location.pathname.split("/")[3]

  const [slideNumber, setSlideNumber] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);

  //open model for book or reserve
  const [openReserveModel, setOpenReserveModel] = useState(false);

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/find/${hotelId[2]}`
  );


  const { dates, destination, options } = useContext(SearchContext);

  function dateDiffInDays(date1, date2) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const utc2 = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const dateDifference = dateDiffInDays(dates[0].startDate, dates[0].endDate);

  const handleSlider = (i) => {
    setSlideNumber(i);
    setOpenSlider(true);
  };

  const handleMove = (dir) => {
    let newSlideNumber;
    if (dir === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = (e) => {
    if (user) {
      setOpenReserveModel(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {openSlider && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpenSlider(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWraper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}

          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excelent location {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>

            {/* <div className="hotelImages">
              {
                data && data.photos.map((photo, i) => (
                      <div
                        key={i}
                        className="hotelImgWrapper"
                        onClick={() => handleSlider(i)}
                      >
                        <img src={photo} alt="" className="hotelImg" />
                      </div>
                    ))
                 

                // data ? (
                //   data.photos.map(photo=>{
                //     console.log('hi');
                //   }
                //   )
                // )

                // : "not"
              }
            </div> */}

            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>perfect for a {dateDifference}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow , this propety has an
                  excellent location score of 9.8
                </span>
                <h2>
                  <b>
                    LKR ${data.cheapestPrice * dateDifference * options.room}{" "}
                  </b>{" "}
                  ({dateDifference} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openReserveModel && (
        <Reserve setOpen={setOpenReserveModel} hotelId={hotelId[2]} />
      )}
    </div>
  );
};
