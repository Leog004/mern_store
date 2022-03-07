import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import {Badge} from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Container = styled.div`
    height: 60px;
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Left = styled.div`
    flex: 1;
    align-items: center;
    display: flex;
`
const Center = styled.div`
    flex: 1;
    text-align:center;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

` 

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
`

const Input = styled.input`
    border: none;
`

const Logo = styled.h1`
    font-weight: bold;
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`

export default function Navbar() {

    const quantity = useSelector(state => state.cart.quantity);
    const userLogined = useSelector(state => state.user.currentUser)

    console.log(quantity);

  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input/>
                    <Search style={{color: 'gray', fontSize: '16px'}}/>
                </SearchContainer>
            </Left>
            <Center>
                <Link style={{textDecoration: "none", color: 'black'}} to="/">
                    <Logo>Unravel</Logo>
                </Link>
            </Center>
            <Right>

                {
                    userLogined
                    ?
                        <MenuItem>
                            Logout
                        </MenuItem>

                    : (
                        <>
                            <Link to="/register" style={{color: 'black', textDecoration: "none"}}>
                                <MenuItem>Register</MenuItem>
                            </Link>

                            <Link to="/login" style={{color: 'black', textDecoration: "none"}}>
                                <MenuItem>Sign In</MenuItem>
                            </Link>                  
                        </>
                    )
                }



                <Link style={{color: 'black', textDecoration: "none"}} to="/cart">
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined/>
                        </Badge>
                    </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}
