import { connect } from 'react-redux'
import { Header } from '../../components/Header/Header'
import { actions } from '../../routes/Slides/modules/actions'

const mapActionCreators = {
  ...actions,
}


const mapStateToProps = state => {
 return {
  isEdit: state.slides.isEdit,
}}

export default connect(mapStateToProps, mapActionCreators)(Header)
