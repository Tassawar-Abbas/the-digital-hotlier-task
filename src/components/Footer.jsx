import React from 'react'
import { FaBars, FaArrowUp, FaWhatsapp, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Footer = ({handleSearchFocus}) => {
    const navigate=useNavigate();
  return (
    <footer className="d-md-none fixed-bottom shadow-lg py-2 mx-3" style={{background:'#6082B6', borderRadius:'10px'}}>
    <div className="d-flex justify-content-around">
      <button className="btn btn-link" onClick={() => navigate('/')}>
        <FaBars size={24} color="white" />
      </button>

      <button className="btn btn-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <FaArrowUp size={24} color="white" />
      </button>
      <button className="btn btn-link" onClick={() => window.location.href = 'https://wa.me/'}> 
        <FaWhatsapp size={24} color="white" />
      </button>
      <button className="btn btn-link" onClick={handleSearchFocus}>
        <FaSearch size={24} color="white" />
      </button>
    </div>
  </footer>
  )
}

export default Footer