import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
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
                    <div className="board-photo">
                      {findMedia(content.media, member.mediaId)?.src ? (
                        <img src={findMedia(content.media, member.mediaId).src} alt={member.name} />
                      ) : (
                        <span className="board-initials" aria-hidden="true">
                          {member.name?.charAt(0) || '?'}
                        </span>
                      )}
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
            {content.volunteers?.length > 0 ? (
              <div className="board-grid">
                {content.volunteers.map((member, index) => (
                  <article className="board-card" key={`${member.name}-${index}`}>
                    <div className="board-photo">
                      {findMedia(content.media, member.mediaId)?.src ? (
                        <img src={findMedia(content.media, member.mediaId).src} alt={member.name} />
                      ) : (
                        <span className="board-initials" aria-hidden="true">
                          {member.name?.charAt(0) || '?'}
                        </span>
                      )}
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
            <div className="bylaws-grid">
              <article className="bylaws-card">
                <h3>English</h3>
                <p className="prose-inline">{content.bylawsEnglish}</p>
              </article>
              <article className="bylaws-card">
                <h3>አማርኛ (Amharic)</h3>
                <p className="prose-inline">{content.bylawsAmharic}</p>
              </article>
            </div>
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
