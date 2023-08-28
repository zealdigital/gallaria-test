import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from 'styles/modules/ProductDetail.module.scss'
import { Breadcrumbs, Footer, Header, HeadMeta } from 'components'
import { Details, Features, Gallery, Lightbox, Recommendation } from 'sections/Products'
import request from 'utils/request'
import { removeSpace } from 'utils/validation'
import { queryProductPaths, queryGetProductByCode, queryGetRecommendedProducts } from 'utils/graphql'
import Error from '../_error'

function Product({ data, recommendations }) {
  const router = useRouter()
  const { status } = router.query

  useEffect(() => {
    document.body.className = ''
  }, [])

  if (!data || (data.isDraft && status !== 'preview')) return <Error status={404} />
  const [selected, setSelected] = useState(data.images[0])
  const [open, setOpen] = useState(false)

  const breadcrumbs = [
    { name: 'BACK TO PRODUCTS', link: `/products?filterUrl=${removeSpace(data.category).toUpperCase()}` },
    { name: data.name }
  ]

  useEffect(() => {
    setSelected(data.images[0])
  }, [data.primaryImage])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  return (
    <div className={styles['container']}>
      <HeadMeta
        title={`${data.name} - Gallaria`}
        desc={data.desc}
        keywords=""
        robots="index, follow"
        url={`https://www.gallaria.com.au/product/${data.code}`}
        metaOG={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(data.primaryImage).replace('(', '%28').replace(')', '%29')}`}
        metaTwitter={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(data.primaryImage).replace('(', '%28').replace(')', '%29')}`}
      />

      <Header />
      <Breadcrumbs crumbs={breadcrumbs} />
      <div className={`container ${styles['section-main-container']}`}>
        <Gallery data={data} selected={selected} setSelected={setSelected} setOpen={setOpen} />
        <div className="col-md-1" />
        <Details data={data} />
      </div>
      {data.features.length > 0 && <Features data={data} />}
      {recommendations.length > 0 && <Recommendation recommendations={recommendations} />}
      <Lightbox
        open={open}
        selected={selected}
        setOpen={setOpen}
      />
      <Footer />
    </div>
  )
}

/* Product.getInitialProps = async (ctx) => {
  try {
    const { code, res } = ctx.query

    const response = await request(queryGetProductByCode, { code })
    const data = response.data.data.getProductByCode
    if (!data && res) res.statusCode = 404

    return { data }
  } catch (err) {
    return err
  }
} */

export async function getStaticProps(ctx) {
  const { code, res } = ctx.params

  const response = await request(queryGetProductByCode, { code: decodeURIComponent(code) })
  const data = response.data.data.getProductByCode
  const reList = await request(queryGetRecommendedProducts, { code: decodeURIComponent(code) })
  const recommendations = reList.data.data.getRecommendedProducts
  if (!data && res) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data, recommendations }, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  const response = await request(queryProductPaths)
  const { getProducts } = (response.data || {}).data

  const paths = await getProducts.map(product => ({
    params: { code: encodeURI(product.code) }
  }))

  return {
    paths,
    fallback: false // See the "fallback" section below
  }
}

export default Product
