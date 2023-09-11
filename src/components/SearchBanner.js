import React from "react";
import search from "../../public/assets/serach.png";

const SearchBanner = () => {
  return (
    <div className="search_banner">
      <div className="container">
        <div className="select_field d-flex justify-content-end gap-3">
          <select className="form-select" aria-label="Default select example">
            <option selected>Help</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select className="form-select" aria-label="Default select example">
            <option selected>English</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <form>
          <input type="search" placeholder="What do you need?" />
          <button type="submit">
            <img src={search.src} alt="" /> Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBanner;
