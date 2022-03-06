import styled from "styled-components";
import { popularProducts } from "../data";
import {Product} from '../Components'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export default function Products() {
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
