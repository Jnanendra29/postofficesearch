import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);

//   useEffect(() => {
//     const fetchFavourites = async () => {
//       const response = await fetch('/favourites');
//       const data = await response.json();
//       setFavourites(data || []);
//     };
//     fetchFavourites();
//   }, []);

useEffect(() => {
    // Fetch favourites from local storage
    const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(savedFavourites);
  }, []);

  const removeFavourite = (index) => {
    let updatedFavourites = [...favourites];
    updatedFavourites.splice(index, 1);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    setFavourites(updatedFavourites); 
  };

  return (
    <div className="container mt-5">
       <div className="d-flex justify-content-between mb-4">
        <h1>Favourites</h1>
        <Link to="/" className="btn btn-secondary">Back to Search</Link>
      </div>
      {favourites.length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch Type</th>
              <th>Delivery Status</th>
              <th>District</th>
              <th>Region</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {favourites.map((favourite, index) => (
              <tr key={index}>
                <td>{favourite.Name}</td>
                <td>{favourite.BranchType}</td>
                <td>{favourite.DeliveryStatus}</td>
                <td>{favourite.District}</td>
                <td>{favourite.Region}</td>
                <td>{favourite.State}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFavourite(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No favourites found.</p>
      )}
    </div>
  );
};

export default FavouritesPage;
