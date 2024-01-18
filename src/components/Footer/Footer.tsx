import './footer.css'

import logo from '../../assets/yappa_group_logo.jpg'

export default function Footer() {


    return (
      <footer>
        <img className='logo-footer' src={logo} alt="yappa-logo" />
      </footer>
    )
  }