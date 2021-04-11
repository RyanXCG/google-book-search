import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "AIzaSyB92YIxCoIfX-kCAHzlJq33J3hxrFahDs4";
function App() {
  const [search, setSearch] = useState("");
  const [searchSub, setSearchSub] = useState("");
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    searchSub === ""
      ? setIsFetching(false)
      : axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${API_KEY}`
          )
          .then((res) => {
            console.log(res.data);
            res.data.totalItems > 0 ? setItems(res.data.items) : setItems([]);
            setIsFetching(false);
          })
          .catch((err) => {
            setIsFetching(false);
            console.log(err);
          });
  }, [searchSub]);

  return (
    <div className="App">
      <div>
        <h2>Google Book Search</h2>
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
        )}
      </div>
    </div>
  );
}

export default App;
// Notes:
// 1: dispaly array (eg: authors) in a table cell nicely
//
