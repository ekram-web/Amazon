import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoint'
import ProductCard from '../../Components/Products/ProductCard'
import Loader from '../../Components/Loader/Loader'

const ProductDetail = () => {
  
  const [product, setproduct] = useState({})
  const [isLoading, setIsloading] = useState(false)
  const {productId}=useParams()

  // Fetching product details using productId from the URL parameters

  useEffect(() => {
    // Setting loading state to true before fetching data
    // This will show a loader while the data is being fetched
    setIsloading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setproduct(res.data) 
      setIsloading(false)

    }).catch((err)=>{
      console.log(err)
      setIsloading(false)
    })
  }, [])

  return (
    
    <LayOut>
      {isLoading? (<Loader/>):(<ProductCard
       product={product} // This is the product data fetched from the API
       flex={true}// This prop is used to determine the layout style of the ProductCard
       renderDesc={true} // This prop indicates whether to render the product description
       renderAdd={true} // This prop indicates whether to render the "add to cart" button
       />)}
      
    </LayOut>
  )
}

export default ProductDetail