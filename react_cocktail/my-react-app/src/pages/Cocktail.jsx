import { useLoaderData, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'
import styled from 'styled-components'
import Wrapper from '../assets/wrappers/CocktailPage'

const singleCocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

import { useQuery } from '@tanstack/react-query'


const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    // query function here
    queryFn : async () => {
      const {data} = await axios.get(`${singleCocktailUrl}${id}`)
      return data
    }
  }
}

// in the loader we cannot use the react hooks
export const loader =
  (queryClient) =>
  async({params}) => {
  const {id} = params
  // we have access to id through the params
 await queryClient.ensureQueryData(singleCocktailQuery(id))
  // console.log(id)
  return {id}
}

const Cocktail = () => {
  const { id } = useLoaderData()
  const navigate = useNavigate();
  // catch the error before it is handled by the single page error
  // if(!data) return <h2>something went wrong...</h2>
  // We are looking for that single drink here
  const { data } = useQuery(singleCocktailQuery(id)) 
  // if the ID is invalid, it returms empty
  if(!data) return <Navigate to='/' />

  const singleDrink = data.drinks[0]

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions
  } = singleDrink

  // console.log(singleDrink)
  // const {str} = singleDrink

  // Object.keys array - singleDrink, keys in array
  const validIngredients = Object.keys(singleDrink).filter((key) => key.startsWith('strIngredient') && singleDrink[key] !== null).map((key) => singleDrink[key])
  // console.log(validIngredients)

  return (
    <Wrapper>
      <div>
        <header>
          <button onClick={() => navigate(-1)} className='btn'>
            back home
            </button>
          <h3>{name}</h3>
        </header>
          <div className="drink">
            <img src={image} alt={name} className="img" />
            <div className="drink-info">
              <p>
                <span className="drink-data">category:</span>
                {category}
              </p>
              <p>
                <span className="drink-data">info:</span>
                {info}
              </p>
              <p>
                <span className="drink-data">info:</span>
                {info}
              </p>
              <p>
                <span className="drink-data">glass:</span>
                {glass}
              </p>
              <p>
                <span className="drink-data">ingredients:</span>{validIngredients.map((item,index) => {
                  return (
                    <span className="ing" key={item}>
                      {item}
                      {index < validIngredients.length -1 ? ',' : ''}
                  </span>
                  )
                })}
              </p>
              <p>
                <span className="drink-data">instructions:</span>
                {instructions}
              </p>
            </div>
          </div>
      </div>
   </Wrapper>
  )
}



export default Cocktail