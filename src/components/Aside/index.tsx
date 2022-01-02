import React from 'react'

import logoIgm from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

import { useAuth } from '../../hooks/auth'

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExplicit,
} from 'react-icons/md'

import {
    Container,
    Header,
    LogImg,
    MenuContainer,
    MenuItemButton,
    // MenuItemLink,
    Title
} from './styles'
    
const Aside: React.FC = () => {

    const { signOut } = useAuth()

    return (
    
        <Container>
            <Header>
                <LogImg src={logoIgm} alt="Logo Minha Carteira" />
                <Title>Minha Carteira</Title>
            </Header>
            <MenuContainer>
                <Link to="/">                 
                    <MdDashboard/> Dashboard        
                </Link>
                
                 <Link to="/list/entry-balance">                 
                    <MdArrowUpward/> Entradas        
                </Link>
                
                 <Link to="/list/exit-balance">                   
                    <MdArrowDownward/> Saidas                   
                </Link>                           
                <MenuItemButton onClick={signOut}>
                    <MdExplicit />Sair
                </MenuItemButton>
            </MenuContainer>
        </Container>
    )
}

export default Aside