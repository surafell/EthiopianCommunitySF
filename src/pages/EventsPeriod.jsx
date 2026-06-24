import { useParams } from 'react-router-dom'
import { useSite } from '../components/Layout'
import { PageHero, Breadcrumbs, ComingSoon } from '../components/Page'
import { PostMedia, findMedia } from '../components/Media'
import NotFound from './NotFound'

const periodMeta = {
  current: { title: 'Current Events', intro: 'Events happening now.' },
  future: { title: 'Upcoming Events', intro: 'Events coming soon. Check back for details.' },
  past: { title: 'Past Events', intro: 'A look back at past ECSF gatherings.' },
}

export default function EventsPeriod() {
  const { period } = useParams()
  const { content } = useSite()
  const meta = periodMeta[period]

  if (!meta) {
    return <NotFound />
  }

  const events = content.events.filter((event) => event.period === period)

  return (
    <>
      <PageHero kicker="Events" title={meta.title} intro={meta.intro}>
        <Breadcrumbs
          trail={[
            { label: 'Home', to: '/' },
            { label: 'Events', to: '/events' },
            { label: meta.title },
          ]}
        />
      </PageHero>

      <section className="section">
        {events.length > 0 ? (
          <div className="event-list event-list-wide">
            {events.map((event, index) => (
              <article className="event-card" key={`${event.title}-${index}`}>
                <PostMedia media={findMedia(content.media, event.mediaId)} />
                {event.location && <span>{event.location}</span>}
                <h3>{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p>{event.excerpt}</p>
              </article>
            ))}
          </div>
        ) : (
          <ComingSoon
            title={`No ${meta.title.toLowerCase()} yet`}
            text="Events will be added here and updated by ECSF admins."
          />
        )}
      </section>
    </>
  )
}
