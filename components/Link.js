import Link from 'next/link'

function CustomLink({ children, href, style, customStyle }) {
  return (
    (<Link href={href} className={style} style={customStyle}>

      {children}

    </Link>)
  );
}

export default CustomLink
