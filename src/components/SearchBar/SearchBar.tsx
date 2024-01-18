import { useState } from 'react'
import './searchBar.css'

export default function Header() {
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('search',searchValue)
    }
    const handleClearFilters = (e:React.FormEvent<HTMLButtonElement>) => {
      console.log('clear filters',e)
      setSearchValue('')
    }
    return (
      <section className='searchBar-section'>
        <form className="filters-container" onSubmit={handleSearch}>
          <section className="searchBar">
            {/* <input type="text" placeholder="Buscar" id='searchBar-input' className="searchBar-input" /> */}
            <input
              type="text"
              placeholder="Buscar"
              id='searchBar-input'
              name='searchBarInput' // Agrega un nombre para referencia fácil
              className="searchBar-input"
              value={searchValue} // Controla el valor del input con el estado
              onChange={(e) => setSearchValue(e.target.value)} // Actualiza el estado al cambiar el input
            />
            <button type='submit' className="search-button-container">
              <i className="fas fa-search"></i>
            </button>
          </section>

          <button type="button" className='clear-filters-button' onClick={handleClearFilters}>Limpiar Filtros</button>

        </form>
      </section>
    )
  }