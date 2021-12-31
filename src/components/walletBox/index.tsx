import React, {useMemo} from 'react'
//library
import CountUp from 'react-countup';

import {Container} from './styles'


//icons
import dollarImg from '../../assets/dollar.svg'
import arrowUpImg from '../../assets/arrow-up.svg'
import arrowDownImg from '../../assets/arrow-down.svg'

interface IWalletBoxProps {
    
    title: string
    amount: number
    footerLabel: string
    icon: 'dolar' | 'arrowUp' | 'arrowDown'
    color: string
}


const WalletBox: React.FC <IWalletBoxProps> = ({
    title,
    amount,
    footerLabel,
    icon,
    color
}) => {
    
    //seleção de icone de cada cartão
    const iconSelected = useMemo(() => {
        
        switch (icon) {
            case 'dolar': return dollarImg
            case 'arrowDown': return arrowDownImg
            case 'arrowUp': return arrowUpImg      
            default: return undefined
        }
    
    }, [icon])
    
    return (
    
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <CountUp
                    end={amount}
                    prefix={'R$ '}
                    separator='.'
                    decimal=','
                    decimals={2}        
                    duration={2}
                />
            </h1>
            <small>{footerLabel}</small>
           <img src={iconSelected} alt={title} />
        </Container>
    )
}

export default WalletBox