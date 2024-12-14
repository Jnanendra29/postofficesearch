import React, { useState } from 'react';
import { searchByPincode, searchByName } from '../services/api.js';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [searchType, setSearchType] = useState('code'); 
  const [query, setQuery] = useState(''); 
  const [results, setResults] = useState([]); 

  const handleSearch = async () => {
    let data = [];
    if (searchType === 'code') {
      data = await searchByPincode(query); 
    } else if (searchType === 'name') {
      data = await searchByName(query); 
    }
    setResults(data); 
  };

  const handleFavourite = async (result) => {
    // const favouriteData = {
    //   name: result.Name,
    //   branchType: result.BranchType,
    //   deliveryStatus: result.DeliveryStatus,
    //   district: result.District,
    //   region: result.Region,
    //   state: result.State,
    // };

    // await fetch('/saveFavourite', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(favouriteData),
    // });
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const exists = favourites.some((item => 
        item.Pincode === result.Pincode
    ))
    if(!exists){
        favourites.push(result);
    }
    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert('Added to favourites!');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h1>Search Locations</h1>
        <Link to="/favourites" className="btn btn-secondary">View Favourites</Link>
      </div>

      {/* Search Options */}
      <div className="mb-3">
        <label className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="searchType"
            value="code"
            checked={searchType === 'code'}
            onChange={(e) => setSearchType(e.target.value)}
          />
          <span className="form-check-label">Search by Code</span>
        </label>
        <label className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="searchType"
            value="name"
            checked={searchType === 'name'}
            onChange={(e) => setSearchType(e.target.value)}
          />
          <span className="form-check-label">Search by Name</span>
        </label>
        <input
          type="text"
          className="form-control my-2"
          placeholder={`Enter ${searchType === 'code' ? 'Pincode' : 'Post Office Name'}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>

      {/* Results Table */}
      {results.length > 0 && (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch Type</th>
              <th>Delivery Status</th>
              <th>District</th>
              <th>Region</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.Name}</td>
                <td>{result.BranchType}</td>
                <td>{result.DeliveryStatus}</td>
                <td>{result.District}</td>
                <td>{result.Region}</td>
                <td>{result.State}</td>
                <td>
                  <button className="btn btn-success btn-sm" onClick={() => handleFavourite(result)}>Favourite</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchPage;
