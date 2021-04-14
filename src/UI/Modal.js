import { withRouter } from 'react-router-dom'
import './Modal.css'
import Header from './Header'

const Modal = ({ page, title, subtitle, children, clicked }) => {
  return (
    <div className='Modal'>
      <Header
        className='HeaderModal'
        page={page}
        title={title}
        subtitle={subtitle}
        clicked={clicked}
      />
      {children}
    </div>
  )
}

export default withRouter(Modal)
