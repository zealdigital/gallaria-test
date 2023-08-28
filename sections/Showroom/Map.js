import GoogleMapReact from 'google-map-react'
import styles from 'styles/modules/Showrooms.module.scss'
import { scroller } from 'react-scroll'
import { mapStyles } from './constant'

function Map({ list, zoom, center, searchStore, search, setSearch, setSelected, setCenter }) {
  return (
    <div className={`${styles['map-container']} col-lg-8`}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API }}
        options={{
          styles: mapStyles,
          mapTypeControl: false,
          streetViewControl: false
        }}
        zoom={zoom}
        center={center}
      >
        {list.map(showroom => (
          <CustomMarker
            key={showroom.name}
            center={center}
            position={showroom.position}
            lat={showroom.position[0]}
            lng={showroom.position[1]}
            setSelected={setSelected}
            setCenter={setCenter}
            showroom={showroom}
          />
        ))}
      </GoogleMapReact>
      <div className="only-mobile-block">
        <input
          className={styles['input-box']}
          type="search"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          onKeyDown={e => (e.key === 'Enter') && searchStore()}
          placeholder="ENTER POSTCODE OR SUBURB"
        />
        <button type="button" onClick={searchStore} className="button-contained">
          SEARCH
        </button>
      </div>
    </div>
  )
}

const CustomMarker = item => {
  const { position, center, setSelected, setCenter, showroom } = item

  const handleClick = () => {
    setSelected(showroom)
    setCenter(showroom.position)
    scroller.scrollTo(`${showroom._id}`, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: 'scroll-list'
    })
  }

  return (
    <img
      src={position === center ? '/svg/marker.svg' : '/svg/marker-non-selected.svg'}
      height="61px"
      width="61px"
      onClick={handleClick}
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -100%)',
        zIndex: position === center ? 1 : 0,
        cursor: 'pointer'
      }}
    />
  )
}

export default Map
