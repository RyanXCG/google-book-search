import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "AIzaSyB92YIxCoIfX-kCAHzlJq33J3hxrFahDs4";
function App() {
  const [search, setSearch] = useState("");
  const [searchSub, setSearchSub] = useState("");
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    setIsFetching(true);
    searchSub === ""
      ? setIsFetching(false)
      : axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=10&key=${API_KEY}&startIndex=${
              (pageNum - 1) * 10
            }`
          )
          .then((res) => {
            console.log(res.data);
            setTotalItems(res.data.totalItems);
            res.data.totalItems > 0 ? setItems(res.data.items) : setItems([]);
            setIsFetching(false);
          })
          .catch((err) => {
            setIsFetching(false);
            console.log(err);
          });
  }, [searchSub, pageNum]);

  return (
    <div className="App">
      <div>
        <h2>Google Book Search</h2>
        <p>testing</p>
        <input
          type="text"
          value={search}
          placeholder="search books"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSearchSub(search)}>Search</button>
        <br />
        {isFetching || items?.length === 0 ? (
          isFetching ? (
            <p>"loading"</p>
          ) : (
            searchSub && <p>`No result matching ${searchSub}`</p>
          )
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Authers</td>
                  <td>published Date</td>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  //console.log(item.volumeInfo.authors);
                  return (
                    <tr key={item.id}>
                      <td>{item.volumeInfo.title}</td>
                      <td>{item.volumeInfo.authors}</td>
                      <td>{item.volumeInfo.publishedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              disabled={pageNum === 1}
              onClick={() => {
                setPageNum(pageNum - 1);
              }}
            >
              {" "}
              {" < "}{" "}
            </button>
            <button>{pageNum}</button>
            <button
              disabled={pageNum === Math.ceil(totalItems / 10)}
              onClick={() => {
                setPageNum(pageNum + 1);
              }}
            >
              {" "}
              {" > "}{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
// Notes:
// 1: dispaly array (eg: authors) in a table cell nicely
//
