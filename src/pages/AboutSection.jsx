import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSite } from '../components/Layout'
import { PageHero, Breadcrumbs, ComingSoon } from '../components/Page'
import { PostMedia, findMedia } from '../components/Media'
import NotFound from './NotFound'

const sectionMeta = {
  history: { title: 'Our History', kicker: 'About Us' },
  boards: { title: 'Meet Our Board', kicker: 'About Us' },
  volunteers: { title: 'Volunteers', kicker: 'About Us' },
  'annual-reports': { title: 'Annual Reports', kicker: 'About Us' },
  bylaws: { title: 'Bylaws', kicker: 'About Us' },
  financials: { title: 'Financials', kicker: 'About Us' },
  'our-stories': { title: 'Our Stories', kicker: 'About Us' },
}

function BoardPhoto({ member, media }) {
  if (media?.src) {
    return <img src={media.src} alt={member.name} />
  }

  if (member.anonymous) {
    return (
      <span className="board-anonymous" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="presentation">
          <circle cx="12" cy="8" r="4" fill="currentColor" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="currentColor" />
        </svg>
      </span>
    )
  }

  return (
    <span className="board-initials" aria-hidden="true">
      {member.name?.charAt(0) || '?'}
    </span>
  )
}

export default function AboutSection() {
  const { section } = useParams()
  const { content } = useSite()
  const meta = sectionMeta[section]

  const historyParagraphs = useMemo(
    () => (content.historyText || '').split('\n').filter((paragraph) => paragraph.trim()),
    [content.historyText],
  )

  if (!meta) {
    return <NotFound />
  }

  return (
    <>
      <PageHero kicker={meta.kicker} title={meta.title}>
        <Breadcrumbs
          trail={[
            { label: 'Home', to: '/' },
            { label: 'About', to: '/about' },
            { label: meta.title },
          ]}
        />
      </PageHero>

      <section className="section">
        {section === 'history' && (
          <div className="prose">
            {historyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="history-tagline">{content.historyTagline}</p>
            <strong>Team ECSF</strong>
          </div>
        )}

        {section === 'boards' && (
          <>
            <p className="lead">{content.boardIntro}</p>
            {content.boardMembers?.length > 0 ? (
              <div className="board-grid">
                {content.boardMembers.map((member, index) => (
                  <article className="board-card" key={`${member.name}-${index}`}>
                    <div className={`board-photo ${member.anonymous ? 'anonymous' : ''}`}>
                      <BoardPhoto member={member} media={findMedia(content.media, member.mediaId)} />
                    </div>
                    <h3>{member.name}</h3>
                    <p className="board-position">{member.position}</p>
                  </article>
                ))}
              </div>
            ) : (
              <ComingSoon
                title="Board members coming soon"
                text="Our Board of Directors will be featured here with their photo, position, and name."
              />
            )}
          </>
        )}

        {section === 'volunteers' && (
          <>
            <p className="lead">{content.volunteersIntro}</p>
            <div className="volunteer-cta">
              <Link className="button primary" to="/volunteer">
                Fill Out Volunteer Form
              </Link>
              <p className="volunteer-cta-note">
                Complete the volunteer interest & service request form online.
              </p>
            </div>
            {content.volunteers?.length > 0 ? (
              <div className="board-grid">
                {content.volunteers.map((member, index) => (
                  <article className="board-card" key={`${member.name}-${index}`}>
                    <div className={`board-photo ${member.anonymous ? 'anonymous' : ''}`}>
                      <BoardPhoto member={member} media={findMedia(content.media, member.mediaId)} />
                    </div>
                    <h3>{member.name}</h3>
                    <p className="board-position">{member.position}</p>
                  </article>
                ))}
              </div>
            ) : (
              <ComingSoon
                title="Volunteers coming soon"
                text="As our volunteer team grows, members will be featured here."
              />
            )}
          </>
        )}

        {section === 'annual-reports' && (
          <>
            <p className="lead">{content.annualReportsIntro}</p>
            {content.annualReports?.length > 0 ? (
              <div className="report-list">
                {content.annualReports.map((report, index) => (
                  <article className="report-card" key={`${report.title}-${index}`}>
                    <div>
                      <span className="report-year">{report.year}</span>
                      <h3>{report.title}</h3>
                      <p>{report.summary}</p>
                    </div>
                    {report.link && (
                      <a className="button secondary" href={report.link} target="_blank" rel="noreferrer">
                        View Report
                      </a>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <ComingSoon title="Annual reports coming soon" text="Yearly reports will be published here once available." />
            )}
          </>
        )}

        {section === 'bylaws' && (
          <>
            <p className="lead">{content.bylawsIntro}</p>

            {content.bylawsDocuments?.length > 0 && (
              <div className="document-list">
                {content.bylawsDocuments.map((document) => (
                  <article className="document-card" key={document.url}>
                    <div>
                      <span className="document-badge">{document.language}</span>
                      <h3>{document.title}</h3>
                      {document.titleAm && <p className="document-title-am">{document.titleAm}</p>}
                      <p>{document.description}</p>
                      {document.descriptionAm && <p className="document-desc-am">{document.descriptionAm}</p>}
                      <p className="document-meta">PDF · {document.fileName}</p>
                    </div>
                    <a
                      className="button primary"
                      href={document.url}
                      download={document.fileName}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download PDF
                    </a>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {section === 'financials' && (
          <>
            <p className="lead">{content.financialsIntro}</p>
            {content.financialsText ? (
              <div className="prose">
                <p>{content.financialsText}</p>
              </div>
            ) : (
              <ComingSoon title="Financials coming soon" />
            )}
          </>
        )}

        {section === 'our-stories' && (
          <>
            <p className="lead">{content.storiesIntro}</p>
            {content.stories?.length > 0 ? (
              <div className="story-list">
                {content.stories.map((story, index) => (
                  <article className="story-card" key={`${story.title}-${index}`}>
                    <PostMedia media={findMedia(content.media, story.mediaId)} />
                    <h3>{story.title}</h3>
                    {story.author && <p className="story-author">By {story.author}</p>}
                    <p>{story.body}</p>
                  </article>
                ))}
              </div>
            ) : (
              <ComingSoon title="Stories coming soon" text="Community stories will be shared here." />
            )}
          </>
        )}
      </section>
    </>
  )
}
