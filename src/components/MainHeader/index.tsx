import React,{useMemo} from 'react'

import Toggle from '../Toggle'
import emojis from '../../utils/emoji'

import {
    Container,
    Profile,
    Welcome,
    UserName
} from './styles'



const MainHeader: React.FC = () => {
    
    //vamos retornar a posição sorteda do array de emojis 
    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length)
        return emojis[indice]
    },[])
    
    return (
    
        <Container>
            <Toggle/>
            
            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>Igor Rocha</UserName>
            </Profile>
        </Container>
    )
}

export default MainHeader