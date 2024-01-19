import { Link } from 'react-router-dom'
export default function NotFound() {


  return (
    <main className="notFoundPage">
      <section>
        <h1>404</h1>
        <p>Tu página no fue encontrada</p>
        <Link to='/'>Volver a challenge</Link>
      </section>
    </main>
  )
}
