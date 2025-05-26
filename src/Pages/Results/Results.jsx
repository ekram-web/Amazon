import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoint'
import ProductCard from '../../Components/Products/ProductCard'
import style from './results.module.css'
import Loader from '../../Components/Loader/Loader'

const Results = () => {
  const [results, setResults] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const {categoryName}=useParams()
  useEffect(() => {
    // Setting loading state to true before fetching data
    // This will show a loader while the data is being fetched
    setIsloading(true)
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res)=>{
      setResults(res.data) 
      setIsloading(false)
      console.log(res.data)

    }).catch((err)=>{
      console.log(err)
      setIsloading(false)
    })
  }, [categoryName])
  
  return (
    <LayOut>
      <section>
        <h1
          style={{
            padding: "24px 0 8px 0",
            fontSize: "2rem",
            fontWeight: 700,
            color: "#232f3e",
            letterSpacing: "1px",
            margin: 0,
          }}
        >
          Results
        </h1>
        <p
          style={{
            padding: "0 0 16px 0",
            fontSize: "1.1rem",
            color: "#555",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          category/{categoryName}
        </p>
        <hr />

        

        {isLoading ? (
          <Loader />
        ) : (
          // This code renders a list of product cards based on the results fetched from the API. Each product card is displayed with an option to add it to the cart.
          <div className={style.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results







