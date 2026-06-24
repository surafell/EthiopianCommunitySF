import { useSite } from '../components/Layout'
import { PageHero, Breadcrumbs } from '../components/Page'

export default function Governance() {
  const { content } = useSite()

  return (
    <>
      <PageHero kicker="Governance" title={content.governanceTitle} intro={content.governanceIntro}>
        <Breadcrumbs
          trail={[
            { label: 'Home', to: '/' },
            { label: 'About', to: '/about' },
            { label: 'Governance' },
          ]}
        />
      </PageHero>

      <section className="section governance-section">
        <div className="org-chart" aria-label="ECSF organizational chart">
          {content.governanceChart?.map((level, levelIndex) => (
            <div className="org-level" key={`level-${levelIndex}`}>
              {level.map((node) => (
                <span className="org-node" key={node}>
                  {node}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="governance-grid">
          {content.governanceBodies?.map((body) => (
            <article className="governance-card" key={body.name}>
              <h3>{body.name}</h3>
              <p>{body.description}</p>
            </article>
          ))}
        </div>

        {content.governanceDisclaimer && <p className="fine-print">{content.governanceDisclaimer}</p>}
      </section>
    </>
  )
}
