import React from 'react'
import style from './category.module.css';
import { Link } from 'react-router-dom';


const CategoryCard = ({data}) => {
  // console.log(data)
  return (
    <div className={style.category}>
        
        <Link to = {`category/${data?.name}`}>
            <span>
                <h2>{data?.title}</h2>
            </span>
            <img src={data?.imageLink} alt="" />
            <div>  
            <p>Shop now</p>
            </div>
        </Link>
    </div>
  )

}

export default CategoryCard