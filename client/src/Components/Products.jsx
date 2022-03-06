import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import {Product} from '../Components'
import axios from 'axios'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export default function Products({cat, filters, sort}) {

  const [product, setProduts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProducts = async () => {
    try {

      const res = await axios.get('http://localhost:5000/api/products')
      console.log(res);


    }catch (err){
      console.log(err);
    };
  }

  useEffect(() => {
    getProducts();
  }, [cat])

  return (
    <Container>
      {
        popularProducts ? popularProducts.map((item) => (
          <Product item={item} key={item.id} />
        ))
        :
        <p>There is no items</p>
      }
    </Container>
  );
}
