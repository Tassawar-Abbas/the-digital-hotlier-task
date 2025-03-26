import React, { useEffect, useState, useCallback } from 'react';
import Modal from 'bootstrap/js/dist/modal';
import { addItemsToCart } from '../helper/service';

const ItemModal = React.memo(({
  selectedItem,
  quantity,
  setQuantity,
  restaurantId,
  customization,
  setCustomization,
  calculateTotalPrice,
  onClose
}) => {
  const [modalInstance, setModalInstance] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const modalElement = document.getElementById('itemDetailModal');
    if (modalElement) {
      const instance = new Modal(modalElement, { backdrop: true });
      setModalInstance(instance);
      instance.show();
      const handleModalClose = () => {
        onClose();
        instance.dispose();
      };
      modalElement.addEventListener('hidden.bs.modal', handleModalClose);
      return () => {
        modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
        // instance.dispose();
      };
    }
  }, [selectedItem, onClose]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === 'increase' ? prev + 1 : Math.max(prev - 1, 1)));
  };

  const handleClose = useCallback(() => {
    if (modalInstance) {
      modalInstance.hide();
    }
  }, [modalInstance]);

  const addToCart = useCallback(async () => {

    try {
      if (!selectedItem?.id || !restaurantId) {
        console.error('Missing required item or restaurant details.');
        return;
      }

      const selectedExtra = selectedItem?.extrasWithOptions?.find(option => option.extra_id === selectedOption);

      const orderDetails = {
        restaurant_id: restaurantId,
        item_id: selectedItem?.id,
        quantity,
        extras: selectedExtra ? { 0: { extra_id: selectedExtra.extra_id } } : {}
      };

      console.log('Submitting Order Details:', orderDetails);

      const response = await addItemsToCart(orderDetails);
      console.log('Order Response:', response);

      handleClose();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }, [selectedItem, restaurantId, quantity, selectedOption, handleClose]);

  return (
    <div className="modal fade" id="itemDetailModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{selectedItem?.name}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <img
              src={selectedItem?.image || 'default-image-url.jpg'}
              className="img-fluid mb-3 w-100"
              alt={selectedItem?.name}
              style={{ height: '250px', objectFit: 'cover' }}
            />
            <p>{selectedItem?.description}</p>
            <p className="fw-bold">Price: AED {selectedItem?.price}</p>

            <div className="d-flex align-items-center mb-3">
              <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange('decrease')}>-</button>
              <span className="mx-3">{quantity}</span>
              <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange('increase')}>+</button>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="customizationCheck"
                checked={customization}
                onChange={() => setCustomization(!customization)}
              />
              <label className="form-check-label" htmlFor="customizationCheck">
                Add Special Customization (AED 5)
              </label>
            </div>

            <div className="mb-3">
              <h6>Select an Option:</h6>
              {selectedItem?.extrasWithOptions?.map((option) => (
                <div key={option.extra_id} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="options"
                    id={`option-${option.extra_id}`}
                    value={option.extra_id}
                    checked={selectedOption === option.extra_id}
                    onChange={() => setSelectedOption(option.extra_id)}
                  />
                  <label className="form-check-label" htmlFor={`option-${option.extra_id}`}>
                    {option.name}
                  </label>
                </div>
              ))}
            </div>

            <p className="fw-bold">Total Price: AED {calculateTotalPrice()}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={addToCart}>Confirm Order</button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ItemModal;
