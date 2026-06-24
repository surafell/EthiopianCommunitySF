import { Link } from 'react-router-dom'
import { PageHero } from '../components/Page'

export default function NotFound() {
  return (
    <>
      <PageHero kicker="404" title="Page not found" intro="The page you are looking for does not exist or has moved." />
      <section className="section">
        <Link className="button primary" to="/">
          Back to Home
        </Link>
      </section>
    </>
  )
}
