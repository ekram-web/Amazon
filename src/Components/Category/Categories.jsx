import React from 'react'
import {categoryInfos} from './categoryFullinfos';
import CategoryCard from './CategoryCard';
import style from './category.module.css';

const Categories = () => {
  return (
    <section className={style.category_container}>

{/*  Key attribute is not obligatory, but for effective mapping it is advisable to provide unique identifier  */}

        {
            categoryInfos?.map((infos)=>{
                return <CategoryCard data={infos} key={infos.name} />;
                
            })
        }
    </section>
  )
}

export default Categories