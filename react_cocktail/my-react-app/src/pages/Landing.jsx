import { useLoaderData } from 'react-router-dom'
import axios from 'axios';

import CocktailList from '../components/CocktailList'
import SearchForm from '../components/SearchForm'

const cocktailSearchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

import { useQuery } from '@tanstack/react-query'

// query will be invoked in 2 places, the loader & landing pages
// the search term can be anything, if the searchterm is valid, use that, then use all
const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    // queryFn: query function
    queryFn: async() => {
      // we make a request to the cocktail DB here
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`)
      console.log("This is response here")
      console.log(response)
      // react-query adds the additional data property
      return response.data.drinks
    }
  }
}

// This handles your search here
// loader is not a hook, & use query is a hook, pass the query client down from the app
// grabs the queryClient & returns another function
export const loader = (queryClient) => async ({request}) => {
  // a new URL instance - url is the instance
  const url = new URL(request.url)
  // get the value of the search key, if there's any value in the search, use that
  // if not - the page loads & there is nothing in the search, use the empty one 
  const searchTerm = url.searchParams.get('search') || '';
  console.log("This is searchTerm")
  console.log(searchTerm)
  // do we have this data in the cache, data is fetched in the loader
  await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm))
  return { searchTerm}
}

const Landing = () => {
  const { searchTerm } = useLoaderData()

  // this displays live, loading when the page is displayed
  // set the React query before the page loads, data cache will be held here
  const { data:drinks, isLoading } = useQuery(searchCocktailsQuery(searchTerm))
 if(isLoading) return <h4>Loading</h4>
  // console.log(drinks)
  return (
    <>
      <SearchForm SearchForm={SearchForm} />
      <CocktailList drinks={drinks} />
    </>
  )
}

export default Landing