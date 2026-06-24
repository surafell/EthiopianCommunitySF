import { Link, useParams } from 'react-router-dom'
import { useSite } from '../components/Layout'
import { PageHero, Breadcrumbs } from '../components/Page'
import NotFound from './NotFound'

export default function Program() {
  const { slug } = useParams()
  const { content } = useSite()
  const program = content.programs.find((item) => item.slug === slug)

  if (!program) {
    return <NotFound />
  }

  const paragraphs = (program.description || '').split('\n').filter((paragraph) => paragraph.trim())
  const others = content.programs.filter((item) => item.slug !== slug)

  return (
    <>
      <PageHero kicker="What We Do" title={program.title} intro={program.summary}>
        <Breadcrumbs
          trail={[
            { label: 'Home', to: '/' },
            { label: 'What We Do', to: '/what-we-do' },
            { label: program.title },
          ]}
        />
      </PageHero>

      <section className="section program-detail">
        <div className="prose">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="hero-actions">
            <Link className="button primary" to="/membership">
              Get Involved
            </Link>
            <Link className="button secondary" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>

        <aside className="program-aside">
          <h3>Other focus areas</h3>
          <ul className="aside-link-list">
            {others.map((item) => (
              <li key={item.slug}>
                <Link to={`/what-we-do/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  )
}
