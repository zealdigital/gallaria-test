// products
export const queryGetProducts = `
query {
  getProducts {
    code
    name
    primaryImage
    featureImage
    category
    sub
    series
    isDraft
    createdDate
    altCode
    images
  }
}
`

export const queryGetFeatureProducts = `
query {
  getFeatured {
    code
    name
    featureImage
  }
}
`

export const queryGetCarouselProducts = `
query {
  getCarousel {
    code
    name
    featureImage
  }
}
`

export const queryGetCatHighlight = `
  query {
    getCatHighlight {
      title
      subtitle
      cat
    }
  }
`

export const queryGetProductHighlight = `
  query {
    getProductHighlight {
      _id
      title
      subtitle
      products {
        code
        name
        featureImage
      }
    }
  }
`

export const queryGetLandingMedia = `
  query {
    getLandingMedia {
      media
    }
  }
`

export const queryProductPaths = `
query {
  getProducts {
    code
    isDraft
  }
}
`

export const queryGetProductByCode = `
query getProductByCode($code: String!) {
  getProductByCode(code: $code) {
    _id
    code
    name
    price
    baseShipping
    shipping
    desc
    variants
    altCode
    category
    sub
    details {
      title
      info
    }
    tags
    isFeature
    forSale
    file
    images
    primaryImage
    features
    isDraft
    link3d
    priceDesc
  }
}
`

export const queryGetRecommendedProducts = `
query getRecommendedProducts($code: String!) {
  getRecommendedProducts(code: $code) {
    code
    name
    primaryImage
  }
}
`

// projects
export const queryGetProjects = `
query {
  getProjects {
    _id
    date
    type
    name
    location
    cover
  }
}
`
export const queryGetProjectById = `
query getProjectById($id: ID!) {
  getProjectById(_id: $id) {
    _id
    name
    location
    type
    date
    desc
    cover
    photos
    products {
      name
      code
      primaryImage
    }
    isDraft
  }
}
`

export const queryGetLatestProjects = `
query getLatestProjects($id: ID) {
  getLatestProjects(_id: $id) {
    _id
    date
    type
    name
    location
    cover
  }
}
`

export const queryProjectPaths = `
query {
  getAllProjects {
    _id
    isDraft
  }
}
`

// Category
export const queryGetCategories = `
query {
  getCategories {
    _id
    name
    sub
    series {
      sub
      name
    }
  }
}
`

// leads
export const mutationSubmitContact = `
mutation submitContact($leadInput: LeadInput!) {
  submitContact(leadInput: $leadInput)
}
`
// leads
export const mutationSubmitEnquiry = `
mutation submitEnquiry($enquiryInput: EnquiryInput!) {
  submitEnquiry(enquiryInput: $enquiryInput)
}
`

// Locations
export const queryGetLocations = `
  query {
    getLocations {
      _id
      name
      address
      phone
      website
      position
    }
  }
`
