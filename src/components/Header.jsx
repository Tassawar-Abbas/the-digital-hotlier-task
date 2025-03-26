import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoChevronBackOutline } from 'react-icons/io5';

const Header = () => {
    const navigate = useNavigate();
    const commonStyles = {
        color: '#6082B6',
    };
    return (
        <header className="d-flex align-items-center justify-content-between p-3 bg-grey shadow-sm w-100">
            <button
                className="btn btn-link border-2 d-flex align-items-center gap-2 text-decoration-none"
                style={{ ...commonStyles, borderColor: commonStyles.color }}
                onClick={() => navigate(-1)}
            >
                <IoChevronBackOutline size={20} />
                <span>Back</span>
            </button>
            <h5 className="mb-0" style={commonStyles}>In Room Dining</h5>
            <button style={commonStyles} className="btn btn-link main-color position-relative">
                <FaShoppingCart size={40} />
                <span
                    style={{
                        ...commonStyles,
                        backgroundColor: commonStyles.color,
                        borderRadius: '50%',
                        width: '1.5rem',
                        height: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        left:'1em'
                    }}
                    className="position-absolute top-0 start-100 translate-middle text-white"
                >
                    0
                </span>
            </button>

        </header>
    );
};

export default Header;
