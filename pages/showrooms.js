import { useContext, useEffect, useState } from 'react'
import { animateScroll as scroll, scroller } from 'react-scroll'
import { Footer, Header, HeadMeta } from 'components'
import { List, Map, Search } from 'sections/Showroom'
import { getDistance } from 'geolib'
import APIRequest from 'utils/APIRequest'
import request from 'utils/request'
import { queryGetLocations } from 'utils/graphql'
import styles from 'styles/modules/Showrooms.module.scss'
import { SnackbarContext } from 'components/Snackbar'

function Showroom({ showrooms }) {
  const [list] = useState(showrooms)
  const [displayList, setDisplayList] = useState(showrooms)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(showrooms[0])
  const [zoom, setZoom] = useState(13)
  const [center, setCenter] = useState(showrooms[0].position)
  const { setSnackbarState } = useContext(SnackbarContext)

  useEffect(() => {
    document.body.className = ''
  }, [])

  const scrollToTop = () => {
    scroll.scrollToTop()
  }

  const nearestMarker = async (event) => {
    const markers_distances = []
    await displayList.map(async (item, i) => {
      const { position } = item
      const d = await getDistance(
        { latitude: position[0], longitude: position[1] },
        event
      )
      markers_distances[i] = { distance: d, marker: item }
    })

    const closest = markers_distances.sort((a, b) => a.distance - b.distance)
    if (screen.width < 992) scrollToTop()
    setDisplayList(closest.map(({ marker }) => marker))
    setSelected(closest[0].marker)
    setZoom(13)
    setCenter(closest[0].marker.position)
    scroller.scrollTo(closest[0].marker._id, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: 'scroll-list'
    })
  }

  const searchStore = () => {
    if (!search) {
      setDisplayList(list)
      return
    }
    let searchString = search
    if (!isNaN(search)) searchString = `Postcode ${search} Australia`
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchString)}&components=country:AU&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`

    APIRequest('GET', url)
      .then(res => {
        const { results } = res.data
        if (results.length < 1) {
          setSnackbarState({
            open: true,
            message: 'Location not found, please try another search',
          })
          return
        }
        const { lat, lng } = results[0].geometry.location

        nearestMarker({ latitude: lat, longitude: lng })
      })
  }

  const clearSearch = (v) => {
    setSearch(v)
    if (v === '') setDisplayList(list)
  }

  return (
    <div className={styles['container']}>
      <HeadMeta
        title="Showrooms - Gallaria"
        desc="Intelligent Toilets by Gallaria; Visit one of our many showrooms across Australia to view our products, Or call us - (02) 8985 2619"
        keywords=""
        robots="index, follow"
        url="https://www.gallaria.com.au/showrooms"
        metaOG="/logo.png"
        metaTwitter="/logo.png"
      />

      <Header />
      <Search searchStore={searchStore} search={search} setSearch={clearSearch} />
      <div className={styles['section-map']}>
        <div className="container">
          <div className="row flex-reverse-column-mobile">
            <List
              list={displayList}
              selected={selected}
              setSelected={setSelected}
              setZoom={setZoom}
              setCenter={setCenter}
              scrollToTop={scrollToTop}
            />
            <Map
              list={displayList}
              zoom={zoom}
              center={center}
              setSelected={setSelected}
              setCenter={setCenter}
              searchStore={searchStore}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const locationsQuery = await request(queryGetLocations)
  const showrooms = locationsQuery.data.data.getLocations

  return {
    props: { showrooms }, // will be passed to the page component as props
  }
}

export default Showroom
