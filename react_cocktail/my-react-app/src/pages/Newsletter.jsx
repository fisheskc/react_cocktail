// if you want to redirect the user to a different page - use redirectin the actions & loaders
import { Form, redirect, useNavigation } from 'react-router-dom';
import axios from 'axios';
// react-toastify - allows you to add notifications to your app
import { toast } from 'react-toastify';
// import Wrapper from '../assets/wrappers/Newsletter'

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  // if successful this will stay the same below, try is the success statement
  try {
      // a post request to the API here
  const response = await axios.post(newsletterUrl, data);
  // console.log(data)
  // console.log(response)
  toast.success(response.data.msg)
  // user is navigated back to the homepage - setup for the instances is going to be the same
  return redirect('/')
  // catch is the error statement
  } catch(error) {
    console.log(error)
    // you could have the axios error coming back from the server
    // use optional chaining, in case those properties are not there - the toast is the pop-up message asking for the value
    toast.error(error?.response?.data?.msg)
    return error;
  }


}

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'
  return (
      <Form className='form' method="POST">
        <h4 style={{textAlign: 'center', marginBottom:"2rem"}}>Our newsletter</h4>
        {/* name */}
          <div className="form-row">
            <label htmlFor="name" className="form-label">
              name
            </label>
            <input
              type="text"
              className='form-input'
              name="name"
              id="name"
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="lastName" className="form-label">
              last name
            </label>
            <input
              type="text"
              className='form-input'
              name="lastName"
              id="lastName"
              required
             />
          </div>
          <div className="form-row">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className='form-input'
              name="email"
              id="email"
              defaultValue="test@test.com" 
              required
            />
          </div>
          <button
            type="submit"
            className='btn btn-block'
            style={{marginTop: '0.5rem'}}
            disabled={isSubmitting}
            >
            {isSubmitting ? 'submitting' : 'submit'}
          </button>
      </Form>
      
  )
}

export default Newsletter