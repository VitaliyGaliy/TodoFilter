import React from 'react'
import { v4 } from 'node-uuid'

const propTypes = {
  isEdit: React.PropTypes.bool
}


export class Header extends React.Component {
    constructor(props) {
    super(props);
    this.onEditSlide = this.onEditSlide.bind(this);
    this.onAddSlide = this.onAddSlide.bind(this);
  }

  onEditSlide(e){
    this.props.editSlide()
  }

  onAddSlide(e){
    this.props.addSlide({id:v4(), text:''})
  }

  render(){
    console.log('props', this.props);
    return(
      <div id='header'>
        <div className='phoneBar'>
          <div className='phoneBarItems'>
            <img src="/assets/TLE.png" alt="" style={{paddingLeft: '4%'}}/>
          </div>
          <div className='phoneBarItems phoneBarItemsClock'>
            <img src="/assets/clock.png" alt=""/>
          </div>
          <div className='phoneBarItems phoneBarItemsBattery'>
            <img src="/assets/battery.png" alt="" style={{paddingRight: '4%'}}/>
          </div>
        </div>
        {
          this.props.isEdit
          ?
          <div className='itemContainer'>
            <div className='headerItems gear' onClick={this.onAddSlide}>
              <h1>+</h1>
            </div>
            <div className='headerItems text'>
              <p style={{margin:0}}>Groceries</p>
            </div>
            <div className='headerItems edit' onClick={this.onEditSlide}>
              <p style={{margin:0}}>Done</p>
            </div>
          </div>
          :
          <div className='itemContainer'>
            <div className='headerItems gear'>
              <img src="/assets/gear.png" alt=""/>
            </div>
            <div className='headerItems text'>
              <p style={{margin:0}}>Groceries</p>
            </div>
            <div className='headerItems edit' onClick={this.onEditSlide}>
              <img src="/assets/edit.png" alt=""/>
            </div>
          </div>
        }
      </div>
    )
  }
}



Header.propTypes = propTypes
export default Header
