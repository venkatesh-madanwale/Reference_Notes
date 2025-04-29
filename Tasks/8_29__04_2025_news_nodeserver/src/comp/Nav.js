import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Ct from './Ct';

const Nav = () => {
  let obj = useContext(Ct);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
      setSearchQuery(''); // Clear the search bar after submission
    }
  };

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px' }}>
      {/* Temporary Logo */}
      <div style={{ marginRight: '20px' }}>
      <Link to="/"><span style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#dc3545' }}>News</span>
        <span style={{ fontSize: '0.8em', color: '#6c757d' }}>App</span></Link>
      </div>

      <Link to="/">Home</Link>
      {obj.state.token === '' && <Link to="/login">Login</Link>}
      {obj.state.token === '' && <Link to="/reg">Register</Link>}
      {obj.state.token !== '' && <Link to="/addpost">AddPost</Link>}
      {obj.state.token !== '' && obj.state.role === 'admin' && <Link to="/admin">Admin</Link>}
      {obj.state.token !== '' && <Link to="/logout">Logout</Link>}
      {obj.state.token !== '' && <a>{obj.state.name}</a>}

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search on Google"
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 12px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff', /* Changed to a more standard blue */
            color: 'white',
            cursor: 'pointer',
            marginLeft: '5px',
          }}
        >
          Search
        </button>
      </form>
    </nav>
  );
};

export default Nav;