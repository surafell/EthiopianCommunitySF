import { useSite } from '../components/Layout'
import { PageHero, SubPageCard } from '../components/Page'

const aboutSections = [
  { slug: 'history', title: 'Our History', blurb: 'How ECSF began and where we are headed.' },
  { slug: 'boards', title: 'Meet Our Board', blurb: 'The leaders who guide ECSF.' },
  { slug: 'volunteers', title: 'Volunteers', blurb: 'The people who power our programs.' },
  { slug: 'annual-reports', title: 'Annual Reports', blurb: 'Yearly summaries of our work and impact.' },
  { slug: 'bylaws', title: 'Bylaws', blurb: 'Our governing rules, in English and Amharic.' },
  { slug: 'financials', title: 'Financials', blurb: 'Transparent financial information.' },
  { slug: 'our-stories', title: 'Our Stories', blurb: 'Voices and stories from our community.' },
]

export default function About() {
  const { content } = useSite()

  return (
    <>
      <PageHero kicker="About Us" title="Who we are" intro={content.aboutIntro} />

      <section className="section mission-cards">
        <div className="mission-vision-grid">
          <article className="statement-card">
            <p className="section-kicker">{content.missionTitle}</p>
            <p>{content.missionText}</p>
          </article>
          <article className="statement-card alt">
            <p className="section-kicker">{content.visionTitle}</p>
            <p>{content.visionText}</p>
          </article>
        </div>
      </section>

      <section className="section values-section">
        <div className="section-heading centered">
          <p className="section-kicker">{content.coreValuesTitle}</p>
          <h2>The values at the heart of ECSF.</h2>
        </div>
        <div className="core-values-grid">
          {content.coreValues?.map((value) => (
            <article className="core-value-card" key={value.name}>
              <span aria-hidden="true" />
              <h3>{value.name}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="section-kicker">Explore</p>
          <h2>Learn more about ECSF</h2>
        </div>
        <div className="subpage-grid">
          {aboutSections.map((section) => (
            <SubPageCard
              key={section.slug}
              to={`/about/${section.slug}`}
              title={section.title}
              blurb={section.blurb}
            />
          ))}
        </div>
      </section>
    </>
  )
}
