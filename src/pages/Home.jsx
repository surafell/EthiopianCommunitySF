import { Link } from 'react-router-dom'
import { useSite } from '../components/Layout'
import { FeaturedMedia, PostMedia, findMedia } from '../components/Media'
import { getPublishedPost } from '../content'

const quickLinks = [
  { to: '/about', title: 'About Us', text: 'Our mission, vision, history, and leadership.' },
  { to: '/what-we-do', title: 'What We Do', text: 'The programs we run for the community.' },
  { to: '/events', title: 'Events', text: 'Past, current, and upcoming gatherings.' },
  { to: '/membership', title: 'Membership', text: 'Join and help sustain the community.' },
]

export default function Home() {
  const { content } = useSite()
  const featuredMedia = findMedia(content.media, content.heroMediaId) ?? content.media[0]
  const publishedPosts = content.posts
    .map(getPublishedPost)
    .filter(Boolean)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  const upcomingEvents = content.events.filter((event) => event.period !== 'past').slice(0, 3)

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">{content.heroEyebrow}</p>
          <h1>{content.heroTitle}</h1>
          <p>{content.heroText}</p>
          <div className="hero-actions">
            <Link className="button primary" to="/membership">
              Become a Member
            </Link>
            <Link className="button secondary" to="/about">
              Read Our Mission
            </Link>
          </div>
        </div>

        <div className="hero-card" aria-label="Community highlights">
          <FeaturedMedia media={featuredMedia} />
          <h2>{content.heroCardTitle}</h2>
          <p>{content.heroCardText}</p>
          {content.heroFocusPoints?.length > 0 && (
            <ul className="focus-chips">
              {content.heroFocusPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="section dashboard-links" aria-label="Quick links">
        <div className="quicklink-grid">
          {quickLinks.map((link) => (
            <Link className="quicklink-card" to={link.to} key={link.to}>
              <h3>{link.title}</h3>
              <p>{link.text}</p>
              <span className="subpage-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section dashboard-grid" id="announcements">
        <div className="dashboard-main">
          <div className="section-heading">
            <p className="section-kicker">Announcements</p>
            <h2>Latest from ECSF</h2>
            <p>News, advertisements, and community updates, posted from the admin dashboard.</p>
          </div>

          <div className="event-list">
            {publishedPosts.map((post) => (
              <article className="event-card" key={`${post.title}-${post.publishedAt}`}>
                <PostMedia media={findMedia(content.media, post.mediaId)} />
                <span>{post.category || (post.noticeType === 'official' ? 'Official Notice' : 'Community')}</span>
                <h3>{post.title}</h3>
                <p className="event-date">{post.date}</p>
                <p>{post.excerpt}</p>
              </article>
            ))}
            {publishedPosts.length === 0 && (
              <article className="event-card">
                <h3>No announcements yet</h3>
                <p>New announcements appear here after an admin publishes them.</p>
              </article>
            )}
          </div>
        </div>

        <aside className="dashboard-aside">
          <div className="aside-card spotlight-card">
            <p className="section-kicker">{content.dashboardSpotlightTitle}</p>
            <p>{content.dashboardSpotlightText}</p>
          </div>

          <div className="aside-card">
            <h3>Upcoming Events</h3>
            <ul className="aside-list">
              {upcomingEvents.map((event) => (
                <li key={`${event.title}-${event.date}`}>
                  <strong>{event.title}</strong>
                  <span>{event.date}</span>
                </li>
              ))}
              {upcomingEvents.length === 0 && <li>No upcoming events posted yet.</li>}
            </ul>
            <Link className="button secondary" to="/events">
              View All Events
            </Link>
          </div>

          <div className="aside-card">
            <h3>Support ECSF</h3>
            <p>Your membership and donations keep our programs running.</p>
            <Link className="button primary" to="/donate">
              Donate
            </Link>
          </div>
        </aside>
      </section>
    </>
  )
}
