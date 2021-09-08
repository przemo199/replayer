import React, {useEffect, useState} from "react";
import MediaCard from "../components/MediaCard";
import {Resource} from "../interfaces";

const pageSize = 10;

function SearchPage(): JSX.Element {
  const [mediaElements, setMediaElements] = useState<Resource[]>([]);
  const [query, setQuery] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const request = await fetch("/search", {
        method: "POST",
        body: JSON.stringify({query: query, startIndex: startIndex, endIndex: startIndex + pageSize})
      });

      if (request.status === 200) {
        const response = await request.json();
        setMediaElements(response.documents);
        setStartIndex(startIndex + pageSize);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [query]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleSearch() {
    setStartIndex(0);
  }

  return (
    <React.Fragment>
      <input type="text" onChange={handleChange}/>

      {mediaElements.map(element => <MediaCard key={element._id.toString()} {...element} />)}

      {isLoading && <h1>Loading...</h1>}

    </React.Fragment>
  );
}

export default SearchPage;
