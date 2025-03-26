import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRestaurantCategories } from '../helper/service';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getRestaurantCategories();
        console.log(data, 'data');
        setCategories(data?.data?.categories || []);
      } catch (err) {
        setError('Failed to fetch categories. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="w-100 overflow-x-hidden" style={{ minHeight: '100vh' }}>
      <div className="w-100">
        <Header />
      </div>
      <div className="container mt-4">
        <SearchBar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          placeholder="Search for categories"
          searchInputRef={searchInputRef}
        />

        {error && <p className="text-danger">{error}</p>}

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {filteredCategories.length > 0 ? (
              filteredCategories.map(category => (
                <div key={category.id} className="col-lg-4 col-md-6 col-sm-12 mb-3">
                  <div
                    className={`card h-100 shadow-sm ${category.openingTime ? '' : 'bg-light'}`}
                    onClick={() => navigate(`/category/${category.id}`)}
                    style={{ overflow: 'hidden', cursor: 'pointer' }}
                  >

                    <img
                      src={category.image || 'default-image-url.jpg'}
                      className="card-img-top img-fluid"
                      alt={category.name}
                      onError={(e) => (e.target.src = 'default-image-url.jpg')}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />

                    <div className="d-md-none position-absolute bottom-0 start-0 w-100 p-3"
                      style={{
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
                        color: '#fff',
                      }}
                    >
                      <h5 className="card-title">{category.name}</h5>
                      {category.openingTime && <p className="card-text">Opens at {category.openingTime}</p>}
                    </div>

                    <div className="d-none d-md-block card-body">
                      <h5 className="card-title">{category.name}</h5>
                      {category.openingTime && <p className="card-text">Opens at {category.openingTime}</p>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>
        )}
      </div>

      <Footer handleSearchFocus={handleSearchFocus} />

    </div>
  );
};

export default CategoriesPage;
