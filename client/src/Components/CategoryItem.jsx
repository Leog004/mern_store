import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: .6;
`

const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: grey;
    cursor: pointer;
`

const LinearGradient = styled.div`
    background: #EED6D3;
    height: 100%;
`



export default function CategoryItem({item}) {
  return (
    <Container>
        <Link to={`/products/${item.cat}`}>
            <LinearGradient>
                <Image src={item.img}/>
            </LinearGradient>
            <Info>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
        </Link>
    </Container>
  )
}
