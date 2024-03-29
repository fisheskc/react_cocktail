import React from 'react'
import Wrapper from '../assets/wrappers/SearchForm'

// if you want to redirect the user to a different page - use redirectin the actions & loaders
import { Form, useNavigation } from 'react-router-dom';

const SearchForm = ({searchTerm}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting' 
  return (
    <Wrapper>
      <Form className='form'>
        <input
          type="search"
          className='form-input'
          defaultValue={searchTerm}
         />
      <button type='submit' className='btn' disabled={isSubmitting}>{isSubmitting ? 'searching...' : 'search'}</button>
      </Form>
    </Wrapper>
  )
}

export default SearchForm