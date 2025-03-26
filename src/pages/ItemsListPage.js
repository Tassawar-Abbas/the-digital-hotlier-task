import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantItems } from '../helper/service';
import ItemModal from '../components/ItemModal';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

const ItemsListPage = () => {
  const searchInputRef = useRef(null);
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const commonStyles = {
    background: '#6082B6',
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getRestaurantItems(categoryId);
        setItems(data?.data?.items?.data || []);
        setRestaurantId(data?.data?.restaurant?.id || null);
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryId]);

  const filteredItems = items.filter(item =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const truncateDescription = (description) => {
    return description?.length > 50 ? `${description.substring(0, 50)}...` : description;
  };

  const handleShowPopup = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setCustomization(false);
  };
  const handleSearchFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const calculateTotalPrice = () => {
    const basePrice = selectedItem?.price || 0;
    const customizationCost = customization ? 5 : 0;
    return (basePrice + customizationCost) * quantity;
  };

  return (
    <div className="w-100 overflow-x-hidden" style={{ minHeight: '100vh' }}>
      <div className="w-100">
        <Header />
      </div>
      <div className="container mt-4">
        <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} placeholder='Search for dishes, drinks ...' />
        <h1 className="mb-4">Menu Items</h1>
        {error && <p className="text-danger">{error}</p>}

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {filteredItems.length === 0 ? (
              <p>No items available</p>
            ) : (
              filteredItems.map(item => (
                <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-3">
                  <div className="card h-100 shadow-sm">
                    <div className="row g-0 flex-md-column flex-row">
                      <div className="col-4 col-md-12">
                        <img
                          src={item.image || 'default-image-url.jpg'}
                          className="img-fluid rounded-start"
                          alt={item.name}
                          onError={(e) => (e.target.src = 'default-image-url.jpg')}
                          style={{ height: '150px', objectFit: 'cover', width: '100%' }}
                        />
                      </div>
                      <div className="col-8 col-md-12">
                        <div className="card-body d-flex flex-column justify-content-between h-100">
                          <div>
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text" data-bs-toggle="tooltip" title={item.description}>
                              {truncateDescription(item.description)}
                            </p>
                          </div>

                          <div className="d-flex justify-content-between align-items-center">
                            <p className="fw-bold mb-0" style={{color:commonStyles.background}}>AED {item.price}</p>
                            <button className="btn text-white" style={commonStyles} onClick={() => handleShowPopup(item)}>
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {selectedItem && (
          <ItemModal
            restaurantId={restaurantId}
            selectedItem={selectedItem}
            quantity={quantity}
            setQuantity={setQuantity}
            customization={customization}
            setCustomization={setCustomization}
            calculateTotalPrice={calculateTotalPrice}
            onClose={handleClosePopup}
          />
        )}
      </div>
      <Footer handleSearchFocus={handleSearchFocus}/>
    </div>
  );
};

export default ItemsListPage;
