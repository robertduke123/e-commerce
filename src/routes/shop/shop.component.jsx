import React from 'react'
import './shop.style.scss'
import { Routes, Route } from 'react-router-dom'
import CategoriesPreview from '../categories-previews/categories-preview.component'
import Category from '../category/category.component'


const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>} />
      <Route path=':category' element={<Category/>} />
    </Routes>
  )
}

export default Shop
