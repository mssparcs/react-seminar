function Word({ message, author }) {
  return (
    <li>
      <h3>{message}</h3>
      <p style={{ textAlign: "right" }}>{author}</p>
    </li>
  )
}

export default Word
