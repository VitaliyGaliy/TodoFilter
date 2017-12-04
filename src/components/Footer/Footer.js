import React from 'react'

const propTypes = {
}

const defaultProps = {
}

export class Footer extends React.Component {
  constructor(props) {
  super(props);
  this.onSlideChange = this.onSlideChange.bind(this);
}

onSlideChange(e){
  const f = e.currentTarget.getAttribute('data-myAttr');
  this.props.filterSlides(f)
}

  render() {
    return(
      <div id='footer'>
        <div className='footerItems allGroceries'
          data-myAttr='all'
          onClick={this.onSlideChange}>
          <img src="/assets/footerRight.png" alt=""/>
        </div>
        <div className='footerItems chart'
          data-myAttr='selected'
          onClick={this.onSlideChange}>
          <img src="/assets/chartFooter.png" alt=""/>
        </div>
      </div>
    )
  }
}

Footer.propTypes = propTypes
Footer.defaultProps = defaultProps
export default Footer
