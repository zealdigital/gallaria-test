function FontLink({ link }) {
  return (
    <link
      rel="preload"
      href={`/fonts/${link}`}
      as="font"
      crossOrigin=""
    />
  )
}

export default FontLink
