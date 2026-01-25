import './Error.css'

function Error({error}) {
  return (
    <div className='error-box'>Error: {error}</div>
  )
}

export default Error