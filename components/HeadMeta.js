import Head from 'next/head'

function HeadMeta({ title, desc, keywords, robots, url, metaOG, metaTwitter, children }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="title" content={title} />
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content="Imitation Tech, contact-us@imitationtech.com" />
      <meta name="designer" content="Crystal Koo, koowangjing@gmail.com" />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} key="ogurl" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:site_name" content="Gallaria" key="ogsitename" />
      <meta property="og:description" content={desc} key="ogdesc" />
      <meta property="og:image" content={metaOG} key="ogimage" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={desc} />
      <meta property="twitter:image" content={metaTwitter} />
      {children}
    </Head>
  )
}

export default HeadMeta
