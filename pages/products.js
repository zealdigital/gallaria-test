import { useEffect, useState } from 'react'
// eslint-disable-next-line
import { Element, scroller } from 'react-scroll'
import { useRouter } from 'next/router'
import { pull, sortBy, reverse } from 'lodash'
import styles from 'styles/modules/ProductList.module.scss'
import { Carousel, Filter, List, Sorting } from 'sections/ProductList'
import { Footer, Header, HeadMeta } from 'components'
import request from 'utils/request'
import { queryGetProducts, queryGetCarouselProducts, queryGetCategories } from 'utils/graphql'
import { removeSpace, filterURLRegex } from 'utils/validation'

function Product({ products, featured, categories }) {
  const router = useRouter()
  const [selected, setSelected] = useState({ name: 'DEFAULT', value: 'default:asc' })
  const [filter, setFilter] = useState('')
  const [toFilterOff, setFilterOff] = useState([])
  const [displayProducts, setDisplayProducts] = useState(products)
  const [selectors, setSelectors] = useState([])
  const [initial, setInitial] = useState(true)
  const [current, setCurrent] = useState(1)
  const perPage = 30

  const filterProducts = (currentSelectors) => {
    if (currentSelectors.length < 1) {
      setDisplayProducts(products)
      return
    }

    const display = products.filter(prod => {
      const match = (
        currentSelectors.includes(removeSpace(prod.category))
        || (prod.sub && currentSelectors.includes(removeSpace(prod.sub)))
        || (prod.series && currentSelectors.includes(removeSpace(prod.series || '')))
      )
      return match
    })
    setDisplayProducts(display)
  }

  const urlFilter = async () => {
    const { query } = router

    if (query.filterUrl) {
      filterProducts([removeSpace(query.filterUrl)])
      setSelectors([removeSpace(query.filterUrl)])
    }
    if (query.search) {
      const display = products.filter(prod => {
        const match = (
          filterURLRegex(query.search, prod.name)
          || filterURLRegex(query.search, prod.code)
          || filterURLRegex(query.search, prod.category)
          || filterURLRegex(query.search, prod.sub)
          || filterURLRegex(query.search, prod.series)
        )
        return match
      })

      console.log('display before change')
      console.log(display)
      setDisplayProducts(display)
    }
  }

  useEffect(() => {
    document.body.className = ''
    urlFilter()
  }, [])

  useEffect(() => {
    urlFilter()
  }, [router])

  useEffect(() => {
    setCurrent(1)
  }, [displayProducts])

  const changePage = (next) => {
    scroller.scrollTo('scrollContainer', {
      duration: 800,
      smooth: true
    })
    setCurrent(next)
  }

  useEffect(() => {
    let sortedDisplay = displayProducts
    switch (selected.value) {
    case 'name:asc':
      sortedDisplay = sortBy(displayProducts, ['name'])
      break
    case 'name:desc':
      sortedDisplay = reverse(sortBy(displayProducts, ['name']))
      break
    case 'date:desc':
      sortedDisplay = reverse(sortBy(displayProducts, ['createdDate']))
      break
    case 'date:asc':
      sortedDisplay = sortBy(displayProducts, ['createdDate'])
      break
    default:
      sortedDisplay = reverse(sortBy(displayProducts, ['createdDate']))
    }

    if (initial) setInitial(false)
    else setDisplayProducts([...sortedDisplay])
  }, [selected])

  useEffect(() => {
    if (filter === '') return
    if (filter === 'all') {
      setDisplayProducts(products)
      setSelectors([])
      setCurrent(1)
      setFilter('')
      return
    }
    const newSelectors = selectors

    if (selectors.includes(filter)) {
      pull(newSelectors, filter)
      setCurrent(1)
    } else {
      newSelectors.push(filter)
      setCurrent(1)
    }

    if (toFilterOff.length > 0) toFilterOff.forEach(item => pull(newSelectors, item))

    filterProducts(newSelectors)
    setSelectors(newSelectors)
    setFilterOff([])
    setFilter('')
  }, [filter])

  return (
    <div className={styles['container']}>
      <HeadMeta
        title="Products - Gallaria"
        desc="INTELLIGENT BATHROOMS BY GALLARIA"
        keywords=""
        robots="index, follow"
        url="https://www.gallaria.com.au/products"
        metaOG="/logo.png"
        metaTwitter="/logo.png"
      />

      <Header />
      <Carousel data={featured} />
      <Element name="scrollContainer" className="position-relative visibility-hidden" style={{ top: '-186px' }}>
        scroll
      </Element>
      <div className={`container ${styles['section-options']}`}>
        <Filter
          categories={categories || []}
          setFilter={setFilter}
          selection={selectors}
          setFilterOff={setFilterOff}
        />
        <Sorting
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <List
        current={current}
        displayList={displayProducts}
        perPage={perPage}
      />
      {displayProducts.length > perPage && (
        <Pagination
          list={displayProducts}
          current={current}
          perPage={perPage}
          changePage={changePage}
        />
      )}
      <Footer />
    </div>
  )
}

const Pagination = ({ list, current, perPage, changePage }) => {
  const [total, setTotal] = useState(1)

  useEffect(() => {
    let calc = Math.floor(list.length / perPage)
    if (list.length % perPage > 0) calc += 1
    setTotal(calc)
  }, [list])

  return (
    <div className={styles['pagination']}>
      <div
        className={`${styles['prev-page']}${current === 1 ? ` ${styles['first']}` : ''}`}
        onClick={() => changePage(current - 1)}
      >
        &lt;
      </div>
      <div className={styles['pages']}>
        {(current - 4 > 0 && current === total) && (
          <div
            className={styles['page']}
            onClick={() => changePage(current - 4)}
          >
            {current - 4}
          </div>
        )}
        {(current - 3 > 0 && (current === total || current === total - 1)) && (
          <div
            className={styles['page']}
            onClick={() => changePage(current - 3)}
          >
            {current - 3}
          </div>
        )}
        {current - 2 > 0 && (
          <div
            className={styles['page']}
            onClick={() => changePage(current - 2)}
          >
            {current - 2}
          </div>
        )}
        {current - 1 > 0 && (
          <div
            className={styles['page']}
            onClick={() => changePage(current - 1)}
          >
            {current - 1}
          </div>
        )}
        <div className={`${styles['page']}  ${styles['current']}`}>
          {current}
        </div>
        {total >= current + 1 && (
          <div
            className={styles['page']}
            onClick={() => changePage(current + 1)}
          >
            {current + 1}
          </div>
        )}
        {total >= current + 2 && (
          <div
            className={styles['page']}
            onClick={() => changePage(current + 2)}
          >
            {current + 2}
          </div>
        )}
        {(total > current + 3 && (current === 1 || current === 2)) && (
          <div
            className={styles['page']}
            onClick={() => changePage(current + 3)}
          >
            {current + 3}
          </div>
        )}
        {(total > current + 4 && (current === 1)) && (
          <div
            className={styles['page']}
            onClick={() => changePage(current + 4)}
          >
            {current + 4}
          </div>
        )}
      </div>
      <div
        className={`${styles['next-page']}${current === total ? ` ${styles['last']}` : ''}`}
        onClick={() => changePage(current + 1)}
      >
        &gt;
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const productsQuery = await request(queryGetProducts)
  const products = productsQuery.data.data.getProducts
  const featuredQuery = await request(queryGetCarouselProducts)
  const featured = featuredQuery.data.data.getCarousel
  const categoriesQuery = await request(queryGetCategories)
  const categoriesRough = categoriesQuery.data.data.getCategories
  const categories = await categoriesRough.map(({ name, sub, series }) => ({
    name,
    id: removeSpace(name),
    sub: sub.map(s => ({
      name: s,
      id: removeSpace(s)
    })),
    series: (series || []).map(s => ({
      sub: s.sub,
      name: s.name,
      id: removeSpace(s.name)
    }))
  }))

  return {
    props: { products, featured, categories }, // will be passed to the page component as props
  }
}

export default Product
