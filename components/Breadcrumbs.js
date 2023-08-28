import Link from 'components/Link'
import React from 'react'

function Breadcrumbs({ crumbs }) {
  return (
    <div className="breadcrumbs container">
      <Link href={crumbs[0].link}>
        <img src="/svg/left-arrow.svg" alt="Search" />
      </Link>
      {crumbs.map((crumb, i) => (
        (i === crumbs.length - 1) ? (
          <React.Fragment key={crumb.name}>
            <span className="slash">/</span>
            <span>
              {`${crumb.name}`}
            </span>
          </React.Fragment>
        ) : (
          <Link key={crumb.name} href={crumb.link}>
            {`${crumb.name}`}
          </Link>
        )
      ))}
    </div>
  )
}

export default Breadcrumbs
