import { request, gql } from 'graphql-request'

const MASTER_URL = process.env.HYGRAPH_API

const getSliders = async (): Promise<Sliders> => {
  if (!MASTER_URL) throw new Error('MASTER_URL NOT FOUND')
  const query = gql`
    query GetSliders {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
`
  return request(MASTER_URL, query)
}

const getCategories = async (): Promise<Categories> => {
  if (!MASTER_URL) throw new Error('MASTER_URL NOT FOUND')
  const query = gql`
    query GetCategory {
      categories {
        id
        name
        icon {
          url
        }
      }
    }
`
  return request(MASTER_URL, query)
}

const getBusinessLists = async (): Promise<BusinessList> => {
  if (!MASTER_URL) throw new Error('MASTER_URL NOT FOUND')
  const query = gql`
    query GetBusinessList {
      businessLists {
        id
        name
        contactPerson
        adress
        email
        category {
          name
        }
        images {
          url
        }
        about
      }
    }  
`
  return request(MASTER_URL, query)
}

const getBusinessListsByCategory = async (category : Category): Promise<BusinessList> => {
  if (!MASTER_URL) throw new Error('MASTER_URL NOT FOUND')
  const query = gql`
    query GetBusinessListByCategory {
      businessLists(where: {category: {name: "${category}"}}) {
        id
        name
        contactPerson
        adress
        email
        category {
          name
        }
        images {
          url
        }
        about
      }
    }
`
  return request(MASTER_URL, query)
}

export { getSliders, getCategories, getBusinessLists, getBusinessListsByCategory }