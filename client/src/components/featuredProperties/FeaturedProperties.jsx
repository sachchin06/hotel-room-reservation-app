import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

export const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels?featured=true&limit=4"
  );
  return (
    <div className="fp">
      {loading ? (
        "Loading Please wait"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZO4EdRrJEeKeaAr9ZYqP5HtdeVsxyd38TSw&usqp=CAU"
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excelent</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
