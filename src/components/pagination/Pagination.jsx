import { useState } from 'react'
import styles from './Pagination.module.scss'


const Pagination = ({currentPage,setCurrentPage,productsPerPage,totalProducts}) => {

    const pageNumbers = []
    const totalPages = Math.ceil(totalProducts/productsPerPage)

    const [pageNumberLimit] = useState(5)
    const [maxPageNumberLimit,setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit,setMinPageNumberLimit] = useState(0)

    const paginate = (number) =>{
        setCurrentPage(number)
    }

    const paginatePrev = () => {
        setCurrentPage(currentPage-1)
        if ((currentPage-1)%pageNumberLimit===0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }

    }

    const paginateNext = () => {
        setCurrentPage(currentPage+1)
        if (currentPage+1>maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }

    }

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
      }
  
return (
    <ul className={styles.pagination}>
        <li className={currentPage===pageNumbers[0]?styles.hidden:null} onClick={paginatePrev}>
            Prev
        </li>

        {pageNumbers.map(number => {
            if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
                return (
                <li key={number} 
                className={currentPage===number?styles.hidden:null} 
                onClick={()=>paginate(number)}>
                    {number}
                </li>)
            }
        })}

        <li className={currentPage===pageNumbers[pageNumbers.length -1]?styles.hidden:null} onClick={paginateNext}>
            Next
        </li>
        <p>
            <b className={styles.page}>{`page ${currentPage}`}</b>
            <span>{` of `}</span>
            <b>{`${Math.ceil(totalPages)}`}</b>
        </p>
    </ul>
  )
}

export default Pagination