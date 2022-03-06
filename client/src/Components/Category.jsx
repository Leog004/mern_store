import React from 'react'
import styled from 'styled-components'
import { categories } from '../data'
import {CategoryItem} from '../Components'

const Container = styled.div`

    display: flex;
    padding: 20px;
    justify-content: space-between

`

export default function Category() {
  return (
    <Container>
        {
            categories.map((item) => (
                <CategoryItem key={item.id} item={item} />
            ))
        }
    </Container>
  )
}
