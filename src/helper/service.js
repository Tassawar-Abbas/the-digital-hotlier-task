import axios from "axios";

export const getRestaurantCategories = async () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  if (!API_BASE_URL) {
    console.error("API_BASE_URL is not defined.");
    return;
  }

  try {
    const res = await axios.get(
      `${API_BASE_URL}/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/categories/2da6c53a-522d-485d-b77c-2fafd601ff0c`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurant categories:", error.message);
    throw error;
  }
};

export const getRestaurantItems = async (catId) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  if (!API_BASE_URL) {
    console.error("API_BASE_URL is not defined.");
    return;
  }

  try {
    const res = await axios.get(
      `${API_BASE_URL}/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/2da6c53a-522d-485d-b77c-2fafd601ff0c?cat=${catId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching restaurant items:", error.message);
    throw error;
  }
};

export const addItemsToCart = async (data) => {
  console.log(data, 'Received Data');

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  if (!API_BASE_URL) {
    console.error("API_BASE_URL is not defined.");
    return;
  }

  try {
    const formData = new FormData();

    for (const key in data) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        if (key === 'extras') {
          Object.entries(data[key]).forEach(([index, extra]) => {
            formData.append(`extras[${index}][extra_id]`, extra.extra_id);
          });
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    console.log('FormData:', [...formData.entries()]);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post(
      `${API_BASE_URL}/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant/order/order-item`,
      formData,
      config
    );

    return res.data;
  } catch (error) {
    console.error("Error adding items to cart:", error.message);
    throw error;
  }
};

