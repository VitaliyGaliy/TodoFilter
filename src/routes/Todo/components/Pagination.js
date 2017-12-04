import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Pagination extends Component {
  constructor() {
      super();
      this.state = {
        currentPage: 1,
        todosPerPage: 5,
        activeButton: 1
      }
       this.bindAll('setButtonPage', 'leftArrow', 'rightArrow')
    }

    bindAll(...methods) {
      methods.forEach((method) => {                   //Определение правильного контекста для всех
        this[method] = this[method].bind(this)        // обработчиков
      })
    }

    componentWillMount() {
      this.props.setPagination({
        currentPage: this.state.currentPage,
        todosPerPage: this.state.todosPerPage
      })
    }

    setButtonPage(event){
      console.log('this.props.setButtonPage', this.props.setButtonPage);
      event.preventDefault()
      let currentPage = Number(event.target.id);
      if(currentPage !== this.props.currentPage){        //Проверка на повторное нажатие
        this.props.setButtonPage({currentPage})
        this.setState({
          activeButton: currentPage
        })
      }
    }

    leftArrow(event){
      event.preventDefault()
      let currentPage = this.props.currentPage - 1;
      if(currentPage >= 1){                             //Проверка на начало массива кнопок
        this.props.setButtonPage({currentPage})
        this.setState({
          activeButton: currentPage
        })
      }
    }

    rightArrow(event){                                  //Проверка на конец массива кнопок
      event.preventDefault()
      let currentPage = this.props.currentPage + 1;
      if(currentPage <= this.props.pageNumbers.length){
        this.props.setButtonPage({currentPage})
        this.setState({
          activeButton: currentPage
        })
      }
    }

  render () {
    const items = this.props.currentTodos;
    const pageNumbers = this.props.pageNumbers;
    console.log('pageNumbers', pageNumbers);
    return (
      <div className='Pagination' >
        <nav aria-label='Page navigation'>
           {
             pageNumbers.length > 0 &&
               <ul className='pagination'>
                 <li >
                   <a href='#' aria-label='Previous' onClick={this.leftArrow}><span aria-hidden='true'>&laquo;</span></a>
                 </li>
                   {
                     pageNumbers.map( p => (
                       <li className={classnames({ 'active': this.state.activeButton === p })} key={p} >
                         <a href='#' onClick={this.setButtonPage} id={p}>{p}<span className='sr-only'></span></a>
                       </li>
                     ))
                   }
                 <li>
                   <a href='#' aria-label='Next' onClick={this.rightArrow}>
                     <span aria-hidden='true'>&raquo;</span>
                   </a>
                 </li>
               </ul>
           }
        </nav>
      </div>
    )
  }
}

const propTypes = {
  currentPage: PropTypes.number,
  todosPerPage: PropTypes.number,
  pageNumbers: PropTypes.array,
  activeButton: PropTypes.string,
  getAdvtsInLS: PropTypes.func,
  setPagination: PropTypes.func
}

export default Pagination
