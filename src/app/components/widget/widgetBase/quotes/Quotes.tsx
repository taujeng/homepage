'use client'

import React, { useState, useEffect } from 'react';
import "./quotes.css"

const Quotes = () => {
  const [quote, setQuote] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Example array of quotes with categories                                                                                                                               
  const quotesList = [
    { text: "The best way to predict the future is to create it.", category: "Success" },
    { text: "You are never too old to set another goal or to dream a new dream.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Perseverance" },
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "It always seems impossible until it's done.", category: "Overcoming Obstacles" },
    { text: "Dream big, work hard, stay focused.", category: "Success" }
  ];

  // Get unique categories from the quotesList array
  const categories = [...new Set(quotesList.map((quote) => quote.category))];

  // Function to get a random quote from the filtered quotesList list
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    setQuote(filteredQuotes[randomIndex]?.text);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = category
      ? quotesList.filter((quote) => quote.category === category)
      : quotesList;
    setFilteredQuotes(filtered);
    getRandomQuote(); // Update the quote with the filtered set
  };

  // Handle adding/removing favorites
  const handleFavorite = (quote) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(quote)) {
        // If the quote is already in favorites, remove it
        return prevFavorites.filter((fav) => fav !== quote);
      } else {
        // Otherwise, add it to favorites
        return [...prevFavorites, quote];
      }
    });
  };

  useEffect(() => {
    setFilteredQuotes(quotesList);
    getRandomQuote(); // Get the first random quote
  }, []);

  return (
    <div title="Quotes" className="quotes-container">


      {/* Category Filter */}
      <div className="category-filter">
        <label>Category: </label>
        <select onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory}>
          <option value="">All</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="quote">{quote}</div>


      <div className="quotes-bottom">
        <button onClick={getRandomQuote}>Get New Quote</button>

        {/* Heart Button to add/remove favorites */}
        <button onClick={() => handleFavorite(quote)}>
          {favorites.includes(quote) ? '❤️' : '🤍'}
        </button>
      </div>


      {/* <h3>Favorites</h3>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index}>{fav}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Quotes;
