import { connect } from 'react-redux'
import { Footer } from '../../components/Footer/Footer'
import slides from '../../routes/Slides/modules/selectors'
import { actions } from '../../routes/Slides/modules/actions'

const mapDispatchToProps = {
    ...actions,

}
const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
