import React, { useEffect } from 'react'
import './shop.style.scss'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CategoriesPreview from '../categories-previews/categories-preview.component'
import Category from '../category/category.component'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { setCategories } from '../../store/categories/categories.action'


const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
        const getCategoriesMap = async() => {
            const categoriesArray = await getCategoriesAndDocuments()            
            dispatch(setCategories(categoriesArray));            
        }
        getCategoriesMap()
    }, [])


  return (
    <Routes>
      <Route index element={<CategoriesPreview/>} />
      <Route path=':category' element={<Category/>} />
    </Routes>
  )
}

export default Shop
