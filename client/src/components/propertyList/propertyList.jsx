import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

export const PropertList = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels/countByType"
  );

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZO4EdRrJEeKeaAr9ZYqP5HtdeVsxyd38TSw&usqp=CAU",
    "data:image/jpeg;base64,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",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZO4EdRrJEeKeaAr9ZYqP5HtdeVsxyd38TSw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcjFlMjGfJFp9eZ2kkZ-XcyWaEDVQyqqBOfw&usqp=CAU",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img src={img} className="pListImg" />
                <div className="pListTitles">
                  <h1>{data[i]?.type}s</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}s
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};