import './header.css'

import logo from '../../assets/yappa_group_logo.jpg'

export default function Header() {


    return (
      <header>
        <img className='logo-header' src={logo} alt="yappa-logo" />
        <h1>Yappa Challenge</h1>
      </header>
    )
  }