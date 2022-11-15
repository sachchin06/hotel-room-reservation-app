import "./searchItem.css";
import { NavLink } from "react-router-dom";

export const SearchItem = ({item}) => {
 
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance} from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancelation</span>
        <span className="siCancelOpSubtitle">you can cancel later, so lock in this great price today!</span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
            <span className="siPrice">{item.cheapestPrice}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <NavLink to={`/hotels/${item._id}`}><button className="siCheckButton">See Avaiability</button></NavLink>
        </div>
      </div>
    </div>
  );
};
