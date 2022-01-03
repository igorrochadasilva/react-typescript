import React, { useState } from 'react'

import logoIgm from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

import { useAuth } from '../../hooks/auth'
import { useTheme } from '../../hooks/theme'
import Toggle from "../Toggle";

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExplicit,
    MdClose,
    MdMenu
} from 'react-icons/md'

import {
    Container,
    Header,
    LogImg,
    MenuContainer,
    MenuItemButton,
    ThemeToggleFooter,
    Title,
    ToggleMenu,
} from './styles'

    
const Aside: React.FC = () => {
    const { toggleTheme , theme} = useTheme()
    const { signOut } = useAuth()    
        
    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false)
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false)    
    
    const handleToggleMenu = () => {        
        setToggleMenuIsOpened(!toggleMenuIsOpened)
    }
    
      const handleChangeTheme = () => {        
        setDarkTheme(!darkTheme)
        toggleTheme()
    }

    return (
    
        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    {toggleMenuIsOpened ? <MdClose /> : <MdMenu/>}
                </ToggleMenu>            
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
            
            <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
                <Toggle
                    labelLeft='Light'
                    labelRight='Dark'
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />
            </ThemeToggleFooter>
        </Container>
    )
}

export default Aside