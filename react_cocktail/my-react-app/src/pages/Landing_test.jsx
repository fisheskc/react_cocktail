import { useLoaderData } from 'react-router-dom'
import axios from 'axios';

// import CocktailList from '../components/CocktailList'
import SearchForm from '../components/SearchForm'

const cocktailSearchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

// import { useQuery } from '@tanstack/react-query'

// query will be invoked in 2 places, the loader & landing pages
// the search term can be anything, if the searchterm is valid, use that, then use all
// const searchCocktailsQuery = (searchTerm) => {
//   return {
//     queryKey: ['search', searchTerm || 'all'],
//     // queryFn: query function
//     queryFn: async() => {
//       // we make a request to the cocktail DB here
//       const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`)
//       // react-query adds the additional data property
//       return response.data.drinks
//     }
//   }
// }

// This handles your search here
// loader is not a hook, & use query is a hook, pass the query client down from the app
// grabs the queryClient & returns another function
export const loader = async ({request}) => {
  
  
  const url = new URL(request.url)
  const searchTerm = url.searchParams.get('search') || '';
  const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`)
  return { drinks: response.data.drinks, searchTerm}
}

const Landing = () => {
  const { drinks, searchTerm } = useLoaderData()
 
  console.log(drinks)
  return (
    <>
      <SearchForm SearchForm={SearchForm} />
      // <CocktailList drinks={drinks} />
    </>
  )
}

export default Landing