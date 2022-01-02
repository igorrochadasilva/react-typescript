import React, { useState, useMemo, useCallback } from 'react'

//components
import { 
    Container ,
    Content
} from './styles'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/walletBox'
import MessageBox from '../../components/MessageBox'
import PieChartGrafic from '../../components/PieChartBox'
import HistoryBox from '../../components/HistoryBox'
import BarChartBox from '../../components/BarChartBox'

//data
import expenses from '../../repositores/expenses'
import gains from '../../repositores/gains'
import listOfMonths from '../../utils/months'

//images
import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'
import thinkingImg from '../../assets/thinking.png'
const Dashboard: React.FC = () => {
    
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
    const [yearSelected, setyYearSelected] = useState<number>(new Date().getFullYear())
    
    //função retorno de anos para filtro
    const years = useMemo(() => {
        let uniqueYears: number[] = []        
        let datas = [...expenses, ...gains]
        
        datas.forEach(item => {
            
            const date = new Date(item.date)
            const year = date.getFullYear()
            
            if(!uniqueYears.includes(year)){
                uniqueYears.push(year)
            }
        })

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        })
    }, [])
    
    //função retorno de meses para filtro
    const months = useMemo(() => {

        return listOfMonths.map((month, index) => {
            return{
                value: index + 1,
                label: month,
            }
        })                        
    }, [])
    
    //função retorno de total despesas
    const totalExpenses  = useMemo(() => {
        let total: number = 0;
        
        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            
            if(month === monthSelected && year === yearSelected){
                try{
                    total += Number(item.amount)
                }
                catch{
                    throw new Error('Invalid amount! Amount must be a number.')
                }
            }
        })
        
        return total
        
    }, [monthSelected, yearSelected])
    
    //função retorno de total receitas
   const totalGains  = useMemo(() => {
        let total: number = 0;
        
        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            
            if(month === monthSelected && year === yearSelected){
                try{
                    total += Number(item.amount)
                }
                catch{
                    throw new Error('Invalid amount! Amount must be a number.')
                }
            }
        })
        
        return total
        
    }, [monthSelected, yearSelected])
    
    //função retorno de saldo
    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses
    }, [totalExpenses, totalGains])
    
    //mensagem de saldo
    const message = useMemo(() => {
        if(totalBalance < 0){
            return {
                title: 'Que triste!',
                description: 'Neste mês, você gastou mais do que deveria.',
                footerText: 'Verifique seus gastos e tente cortar algumas coisas',
                icon: sadImg
            }
        } else if(totalGains === 0 && totalExpenses === 0){
            return {
                title:"Opss",
                description:'Neste mês, não há registros de entrada e saida!',
                footerText:'Tenha cuidado. No proximo mês, tente poupar o seu dinheiro!',
                icon:thinkingImg
            }
        } else if(totalBalance === 0){
            return {
                title: 'Ufaa!',
                description: 'Neste mês, você gastou exatamente oque ganhou.',
                footerText: 'Tome cuidado. No proximo mês, tente poupar o seu dinheiro.',
                icon: grinningImg
            }
        } else {
            return {
                title:"Muito bem!",
                description:'Sua carteira está positiva!',
                footerText:'Continue assim. Considere investir o seu saldo.',
                icon:happyImg
            }
        }
    }, [totalBalance, totalGains, totalExpenses])
    
    //Retorno de objeto com porcentagem - grafico de pizza
    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;
        
        const percentGains =    Number(((totalGains / total) * 100).toFixed(1))
        const percentExpenses =    Number(((totalExpenses / total) * 100).toFixed(1))
        
        const data = [
            {   
                name: 'Entradas',
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: '#F7931B'
            },
            {   
                name: 'Saídas',
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
                color: '#E44C4E'
            }            
        ]
        
        return data;
        
    },[totalGains, totalExpenses])
    
    //retorna objeto contento mês, ganhos e despesas
    const historyData = useMemo(() => {
    
        return listOfMonths.map((_, month) => {
            
            let amountEntry = 0
            gains.forEach(gain => {
                const date = new Date(gain.date)
                const gainMonth = date.getMonth()
                const gainYear = date.getFullYear()
                
                if(gainMonth === month && gainYear === yearSelected){
                    try{
                        amountEntry += Number(gain.amount)
                    } catch{
                        throw new Error('amountEntry is invalid, amountEntry must be valid number.')
                    }
                }
            })
            
            let amountOutput = 0
            expenses.forEach(expense => {
                const date = new Date(expense.date)
                const gainMonth = date.getMonth()
                const gainYear = date.getFullYear()
                
                if(gainMonth === month && gainYear === yearSelected){
                    try{
                        amountOutput += Number(expense.amount)
                    } catch{
                        throw new Error('amountOutput is invalid, amountOutput must be valid number.')
                    }
                }
            })
            
            return {
                monthNumber: month,
                month: listOfMonths[month].substring(0,3),
                amountEntry,
                amountOutput
                
            }
        })
        .filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();            
            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
        })
    }, [yearSelected])
    
    //Função de retorno de relação de gastos eventuais e recorrentes - utilizado no grafico de barras box 1
    const relationExpensesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0
        let amountEventual = 0
        
        expenses.filter((expense) =>{
            
            const date = new Date(expense.date)
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            
            return month === monthSelected && year === yearSelected
        })
        .forEach((expense) => {
            if(expense.frequency === 'recorrente'){
                return amountRecurrent += Number(expense.amount)
            }
            
            if(expense.frequency === 'eventual'){
                return amountEventual += Number(expense.amount)
            }
        })
        
        const total = amountRecurrent + amountEventual        
        
        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1))
        const PercentEventual = Number(((amountEventual / total) * 100).toFixed(1))
        
        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: PercentEventual ? PercentEventual : 0,
                color: "#E44C4E"
            }
        ]
    },[monthSelected, yearSelected])
    
    //função de retorno de relção de ganhos eventuais e recorrentes - utilizado no grafico de barras box 2
    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0
        let amountEventual = 0
        
        gains.filter((gain) =>{
            
            const date = new Date(gain.date)
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            
            return month === monthSelected && year === yearSelected
        })
        .forEach((gain) => {
            if(gain.frequency === 'recorrente'){
                return amountRecurrent += Number(gain.amount)
            }
            
            if(gain.frequency === 'eventual'){
                return amountEventual += Number(gain.amount)
            }
        })
        
        const total = amountRecurrent + amountEventual        
        
        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1))
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1))
        
        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ]
    },[monthSelected, yearSelected])
    
    //convertendo mês string para number
    const handleMonthSelected = useCallback((month: string) => {
        
        try{
            const parseMonth = Number(month)
            setMonthSelected(parseMonth)
        } catch{
            throw new Error('Invalid month value. Is accept 0 - 24')
        }
    }, [])
    //convertendo ano string para number
    const handleYearSelected = useCallback((year: string) => {
        
        try{
            const parseYear = Number(year)
            setyYearSelected(parseYear)
        } catch{
            throw new Error('Invalid year value. Is accept integer number')
        }
    }, [])
    
    return (
        <Container>
            <ContentHeader title={'Dashboard'} lineColor={'#F7931B'}>
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>                            
            <Content>
                <WalletBox 
                    title='Saldo' 
                    amount={totalBalance} 
                    footerLabel='atualizado com a base nas entradas e saídas' 
                    icon='dolar'
                    color='#4E41F0'
                />
                
                <WalletBox 
                    title='Entradas' 
                    amount={totalGains} 
                    footerLabel='atualizado com a base nas entradas e saídas' 
                    icon='arrowUp'
                    color='#F7931B'
                />
                
                    <WalletBox 
                    title='Saídas' 
                    amount={totalExpenses} 
                    footerLabel='atualizado com a base nas entradas e saídas' 
                    icon='arrowDown'
                    color='#E44C4E'
                />
                
                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />
                
                <PieChartGrafic data={relationExpensesVersusGains} />
                
                <HistoryBox
                    data={historyData}
                    lineColorAmountEntry='#F7931B'
                    lineColorAmountOutput='#E44C4E'
                />
                
                <BarChartBox 
                    title='Sáidas'
                    data={relationExpensesRecurrentVersusEventual}
                />
                
                <BarChartBox 
                    title='Entradas'
                    data={relationGainsRecurrentVersusEventual}
                />
                
            </Content>
        </Container>  
     
    )
}

export default Dashboard