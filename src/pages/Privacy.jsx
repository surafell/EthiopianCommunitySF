import { useSite } from '../components/Layout'
import { PageHero } from '../components/Page'

export default function Privacy() {
  const { content } = useSite()

  return (
    <>
      <PageHero kicker="Privacy" title={content.privacyTitle} intro={content.privacyIntro} />

      <section className="section">
        <ul className="check-list privacy-list">
          {content.privacyPoints?.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>
    </>
  )
}
