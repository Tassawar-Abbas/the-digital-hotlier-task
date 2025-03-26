import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import ItemsListPage from './pages/ItemsListPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/category/:categoryId" element={<ItemsListPage />} />
      </Routes>
    </Router>
  );
};

export default App;