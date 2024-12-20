import React from 'react'
import "./directory.styles.scss";
import DirectoryItem from '../directory-item/directory-item.component';

const Directory = ({categories}) => {
  return (
   <div className="directory-container">
        {categories.map((category) => (
            <DirectoryItem key={"category " + category.id} category={category} />
        ))}
    </div>
  )
}

export default Directory
