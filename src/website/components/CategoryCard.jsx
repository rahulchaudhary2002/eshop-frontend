import React from 'react'
import { API_URL } from '../../constants'
import { Link } from 'react-router-dom'

const CategoryCard = ({category}) => {
    return (
        <Link to={`category/${category._id}`} className="card text-decoration-none mb-3">
            <img src={`${API_URL}/${category.image}`} className="card-img-top" alt={category.name} height={100} />
            <div className="card-body">
                <p className="card-text">{category.name}</p>
            </div>
        </Link>
    )
}

export default CategoryCard