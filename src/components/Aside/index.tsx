import React from 'react'

import logoIgm from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExplicit
} from 'react-icons/md'

import {
    Container,
    Header,
    LogImg,
    MenuContainer,
    // MenuItemLink,
    Title
} from './styles'
    
const Aside: React.FC = () => {
    return (
    
        <Container>
            <Header>
                <LogImg src={logoIgm} alt="Logo Minha Carteira" />
                <Title>Minha Carteira</Title>
            </Header>
            <MenuContainer>
                <Link to="/dashboard">                 
                    <MdDashboard/> Dashboard        
                </Link>
                
                 <Link to="/list/entry-balance">                 
                    <MdArrowUpward/> Entradas        
                </Link>
                
                 <Link to="/list/exit-balance">                   
                    <MdArrowDownward/> Saidas                   
                </Link>                           
                <Link to="#">
                    <MdExplicit />Sair
                </Link>
            </MenuContainer>
        </Container>
    )
}

export default Aside