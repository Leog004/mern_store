import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    height: 30px;
    background-color: teal;
    color: white;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

export default function Announcements() {
  return (
    <Container>
        Super deal! Free Shipping on Orders over $50
    </Container>
  )
}
