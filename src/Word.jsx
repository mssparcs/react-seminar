import { Link } from 'react-router';

function Word({ message, author, idx }) {
  return (
    <li>
      <Link to={{
        pathname: '/details',
        search: `?id=${idx}`
      }}>
        <h3>{message}</h3>
        <p style={{ textAlign: "right" }}>{author}</p>
      </Link>
    </li>
  )
}

export default Word
