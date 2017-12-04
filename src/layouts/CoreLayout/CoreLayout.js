import React from 'react'

export const CoreLayout = (props) => (
  <div id='wrapper'>
    {props.children}
  </div>
  )

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
}

export default CoreLayout
