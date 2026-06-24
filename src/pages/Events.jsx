import { useSite } from '../components/Layout'
import { PageHero, SubPageCard } from '../components/Page'

const eventSections = [
  { slug: 'current', title: 'Current Events', blurb: 'What is happening now in the ECSF community.' },
  { slug: 'future', title: 'Upcoming Events', blurb: 'Programs and gatherings coming soon.' },
  { slug: 'past', title: 'Past Events', blurb: 'A look back at what we have done together.' },
]

export default function Events() {
  const { content } = useSite()

  const counts = {
    current: content.events.filter((event) => event.period === 'current').length,
    future: content.events.filter((event) => event.period === 'future').length,
    past: content.events.filter((event) => event.period === 'past').length,
  }

  return (
    <>
      <PageHero kicker="Events" title="ECSF events" intro={content.eventsIntro} />

      <section className="section">
        <div className="subpage-grid">
          {eventSections.map((section) => (
            <SubPageCard
              key={section.slug}
              to={`/events/${section.slug}`}
              title={`${section.title} (${counts[section.slug]})`}
              blurb={section.blurb}
            />
          ))}
        </div>
      </section>
    </>
  )
}
