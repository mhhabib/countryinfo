import React, { useState } from "react";
import "../../App.css";

const SearchCountry = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    onSearch(input);
    setInput("");
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search country..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
    </form>
  );
};
export default SearchCountry;
