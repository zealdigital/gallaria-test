import styles from 'styles/modules/Showrooms.module.scss'

function Search({ searchStore, search, setSearch }) {
  return (
    <div className={styles['section-search']}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className={styles['title-container']}>
              <span>SHOWROOM LOCATIONS</span>
            </div>
          </div>
          <div className="col-lg-8 only-desktop">
            <div className="row">
              <div className="col-6">
                <input
                  type="search"
                  value={search}
                  onChange={({ target }) => setSearch(target.value)}
                  onKeyDown={e => (e.key === 'Enter') && searchStore()}
                  placeholder="ENTER POSTCODE OR SUBURB"
                />
              </div>
              <div className="col-6">
                <button type="button" onClick={searchStore} className="button-contained" style={{ width: '50%' }}>
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
