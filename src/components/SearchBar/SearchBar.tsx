import './searchBar.css'

interface Props{
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  setReload: React.Dispatch<React.SetStateAction<boolean>>
  reload: boolean
}

export const SearchBar:React.FC<Props> = ({searchValue,setSearchValue,setReload,reload}) => {
    const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('search',searchValue)
      setReload(!reload)
    }
    const handleClearFilters = (e:React.FormEvent<HTMLButtonElement>) => {
      console.log('clear filters',e)
      setSearchValue('')
      setReload(!reload)
    }
    return (
      <section className='searchBar-section'>
        <form className="filters-container" onSubmit={handleSearch}>
          <section className="searchBar">
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