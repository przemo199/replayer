import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import MediaCard from "../components/MediaCard";
import {MediaResource} from "../interfaces";

const pageSize = 10;

function SearchPage(): JSX.Element {
  const [mediaElements, setMediaElements] = useState<MediaResource[]>([]);
  const [searchFieldContent, setSearchFieldContent] = useState("");
  const [query, setQuery] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const request = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({query: query, startIndex: startIndex, endIndex: startIndex + pageSize})
      });

      if (request.status === 200) {
        const response = await request.json();
        setMediaElements(response.documents === null ? [] : response.documents);
        setStartIndex(startIndex + pageSize);
      }

      setIsLoading(false);
    }

    fetchData();
  }, [query]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchFieldContent(e.target.value);
  }

  function handleSearch() {
    setQuery(searchFieldContent);
    setStartIndex(0);
    setMediaElements([]);
  }

  function returnFalse() {
    return false;
  }

  return (
    <React.Fragment>
      <div className="top">
        <form onSubmit={() => false}>
          <Form.Control className="m-1" type="text" onChange={handleChange}/>
          <Button type="submit" className="m-1" onClick={handleSearch}>Search</Button>
        </form>
      </div>

      <div className="media-flex-container">
        {mediaElements.map(element => <MediaCard key={element._id.toString()} {...element} />)}
        {isLoading && <h1>Loading...</h1>}
      </div>
    </React.Fragment>
  );
}

export default SearchPage;
