import './Header.css'
import { ReactComponent as Menu } from '../svg/open-menu.svg'
import { ReactComponent as LeftArrow } from '../svg/left-arrow.svg'

const Header = ({ page, title, subtitle, clicked, className }) => {
  return (
    <div className={className}>
      {(page === 'Home' || page === 'Games') && <Menu className='BurgerIcon' />}
      {(page === 'AthleteDetails' || page === 'Game') && (
        <LeftArrow className='LeftArrow' onClick={clicked} />
      )}
      {page === 'Avviso' && null}

      <div className='Text'>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <img
        className='Logo'
        src={process.env.PUBLIC_URL + '/images/logos/logo.png'}
        alt='Logo'
      />
    </div>
  )
}

export default Header
