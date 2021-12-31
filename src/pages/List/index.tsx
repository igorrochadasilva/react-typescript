import React, { useMemo, useState, useEffect } from 'react'

//components
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'
//react router
import {useParams} from 'react-router-dom'
// data
import gains from '../../repositores/gains'
import expenses from '../../repositores/expenses'
import FormatCurrency from '../../utils/formatCurrency'
import FormatDate from '../../utils/formatDate'
import listOfMonths from '../../utils/months'
//styled components
import { Container, Content, Filters } from './styles'

interface IData {
    id: string
    description: string
    amountFormatted: string
    frequency: string
    dateFormatted: string
    tagColor: string
}

const List: React.FC = () => {
    
    const  [data, setData] = useState<IData[]>([])
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
    const [yearSelected, setyYearSelected] = useState<number>(new Date().getFullYear())
    const [frequencyFilterSelected, setfrequencyFilterSelected] = useState(['recorrente', 'eventual'])


    const movimentType = useParams<string>().type    
    
    //função de retorno de cor de titulo, lista de dados e titulo    
    const pageData = useMemo(() => {
        
        return movimentType === 'entry-balance' ?
             {
                title: 'Entradas',
                lineColor: '#4E41F0',
                data: gains
            }
        : {            
            title: 'Saídas',
            lineColor: '#E44C4E',
            data: expenses            
        }
    }, [movimentType])
    
    
    //função retorno de meses para filtro
    const months = useMemo(() => {

        return listOfMonths.map((month, index) => {
            return{
                value: index + 1,
                label: month,
            }
        })                        
    }, [])
    //função retorno de anos para filtro
    const years = useMemo(() => {
        let uniqueYears: number[] = []
        
        const { data } = pageData
        
        data.forEach(item => {
            
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
    }, [pageData])
    
    //função de filtro de tipo de lista
    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency)
        
        if(alreadySelected >= 0){
            const filtered = frequencyFilterSelected.filter(item => item !== frequency)
            setfrequencyFilterSelected(filtered)
        } else{            
            setfrequencyFilterSelected((prev) => [...prev, frequency])            
        }
    }
    
    //convertendo mês string para number
    const handleMonthSelected = (month: string) => {
        
        try{
            const parseMonth = Number(month)
            setMonthSelected(parseMonth)
        } catch{
            throw new Error('Invalid month value. Is accept 0 - 24')
        }
    }
    //convertendo ano string para number
    const handleYearSelected = (year: string) => {
        
        try{
            const parseYear = Number(year)
            setyYearSelected(parseYear)
        } catch{
            throw new Error('Invalid year value. Is accept integer number')
        }
    }
        
    //useEffect para carregar os dados
    useEffect(() => {
        
        const {data} = pageData
        
        //filtrar itens da lista baseados no mês e ano selecionados
       const filteredDate = data.filter(item => {
       
            const date = new Date(item.date)            
            const month = date.getMonth() + 1
            const year = date.getFullYear()
       
            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
       })
       
       //dados formatados.
       const formattedData = filteredDate.map(item => {
            
            return {
                id: String(Math.floor((Math.random() * 1000000))),
                description: item.description,
                amountFormatted: FormatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: FormatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }               
       })               

        setData(formattedData)
    }, [pageData, monthSelected, yearSelected, movimentType, frequencyFilterSelected])
    
    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>
            
            <Filters>
                <button 
                    type='button'
                    className={`tag-filter tag-filter-recurrent
                    ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('recorrente')}
                    >
                    Recorrentes
                </button>
                <button 
                    type='button'
                    className={`tag-filter tag-filter-eventual
                    ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('eventual')}
                    >
                    Eventuais
                </button>
            </Filters>
            
            <Content>
                      
                {
                    data.map(item => (
                        <HistoryFinanceCard     
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />   
                    ))
                }
            </Content>
        </Container>
    )
}

export default List