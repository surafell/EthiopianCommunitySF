import { useEffect, useMemo, useState } from 'react'
import './App.css'
import logo from './assets/logo.png'

const STORAGE_KEY = 'ecsf-site-content-v1'
const SESSION_KEY = 'ecsf-admin-session-v1'

const emptyPost = {
  title: '',
  date: '',
  category: '',
  noticeType: 'community',
  excerpt: '',
  mediaId: '',
  status: 'draft',
  boardApproved: false,
  publishedTitle: '',
  publishedDate: '',
  publishedCategory: '',
  publishedNoticeType: 'community',
  publishedExcerpt: '',
  publishedMediaId: '',
  publishedAt: '',
}

const emptyProgram = {
  title: '',
  description: '',
}

const emptyEntry = {
  name: '',
  description: '',
}

const emptyMedia = {
  id: '',
  type: 'image',
  title: '',
  caption: '',
  src: '',
}

const defaultContent = {
  theme: 'heritage',
  template: 'classic',
  siteName: 'Ethiopian Community',
  region: 'San Francisco',
  heroEyebrow: 'Inclusive · Non-Political · Non-Religious',
  heroTitle: 'A united home for the Ethiopian community of the Bay Area.',
  heroText:
    'Ethiopian Community San Francisco (ECSF) is an inclusive, non-political, and non-religious organization serving Ethiopians and Ethiopian-Americans across San Francisco and the greater Bay Area. We bring people together around unity, culture, youth, elders, newcomers, and shared community representation.',
  heroCardTitle: 'Unity, culture, and belonging',
  heroCardText:
    'A welcoming civic home for families, elders, youth, students, professionals, newcomers, volunteers, and friends of the Ethiopian community.',
  heroFocusPoints: [
    'Unity',
    'Culture',
    'Youth',
    'Elders',
    'Newcomers',
    'Community Representation',
  ],
  missionTitle: 'Our Mission',
  missionText:
    'The Ethiopian Community San Francisco (ECSF) is an inclusive, non-political, and non-religious organization aiming to address the social, economic, educational, and cultural needs of Ethiopian and Ethiopian-American community members residing in San Francisco and the greater Bay Area. ECSF is committed to promoting the history and cultural heritage of Ethiopia.',
  visionTitle: 'Our Vision',
  visionText:
    'A united, thriving, and well-represented Ethiopian community in the Bay Area, where every generation is supported, our culture and heritage are preserved, and members work together with transparency and mutual respect.',
  coreValuesTitle: 'Our Core Values',
  coreValues: [
    {
      name: 'Unity',
      description: 'We bring the community together across generations and backgrounds with a shared sense of belonging.',
    },
    {
      name: 'Respect',
      description: 'We honor the dignity, diversity, and autonomy of every member.',
    },
    {
      name: 'Inclusiveness',
      description: 'We create a safe, welcoming space where members feel comfortable expressing all aspects of their identities.',
    },
    {
      name: 'Transparency',
      description: 'We act with accountability and openness in our decisions, resources, and reporting.',
    },
    {
      name: 'Service',
      description: 'We willingly give our time and talents to meet community needs and model servant leadership.',
    },
    {
      name: 'Cultural Preservation',
      description: 'We promote and protect Ethiopian history, language, and heritage for future generations.',
    },
  ],
  aboutTitle: 'The principles that guide our work.',
  values: [
    'We promote inclusiveness, so members feel safe, respected, and comfortable in expressing all aspects of their identities.',
    'We celebrate the diversity and autonomy of individual members.',
    'We empower members to willingly give service with transparency and accountability.',
    'We practice responsible stewardship of resources, as well as expenditures in pursuance of our organization\'s mission.',
    'We intentionally encourage intergenerational social interactions to facilitate the acquisition of language, culture, and history.',
    'We respond to our communities responsively by meeting needs that the government and the market do not meet.',
    'We model servant leadership by inspiring others to share in our organization\'s vision and mission.',
    'We develop teamwork by embracing trust, conflict management, commitment, accountability, and focusing on result.',
  ],
  historyTitle: 'From community conversations to long-term impact.',
  historyText:
    'The Ethiopian Community San Francisco was established after a year of meetings and conversations between like-minded individuals on how to tackle social problems arising in the Ethiopian immigrant community.\n\nAmid the Covid-19 pandemic, ECSF converted to a virtual nonprofit. Medical teams assembled bilingual public panels to educate the community, and subcommittees began delivering services based on the mission of educational, economic, and social support.\n\nOur future is full of hope as supporters take part in programs and services. Volunteers and board members continue to assess needs, strengthen partnerships, raise funds, and expand high-impact services across San Francisco.\n\nECSF is run by subcommittees, each addressing a different need. Our long-term goals include a health fair, website learning resources, weekly Amharic lessons, a STEM lab, youth mentoring, job fairs, college counseling, mental health counseling, elderly engagement, and pro bono services through our legal team.\n\nA key part of our strategy is to look ahead toward healthy and strategic growth. As you read about our plans, we hope you will imagine yourself as a future ECSF partner and be part of our theory of change.',
  eventsIntro: 'Upcoming programs and gatherings.',
  posts: [
    {
      title: 'San Francisco Ethiopian Culture Day',
      date: 'Spring 2026',
      category: 'Community',
      excerpt: 'A family-friendly celebration of Ethiopian music, food, history, and art.',
      mediaId: '',
      status: 'published',
      publishedTitle: 'San Francisco Ethiopian Culture Day',
      publishedDate: 'Spring 2026',
      publishedCategory: 'Community',
      publishedExcerpt: 'A family-friendly celebration of Ethiopian music, food, history, and art.',
      publishedMediaId: '',
      publishedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      title: 'Youth STEM & Mentorship Workshop',
      date: 'Summer 2026',
      category: 'Education',
      excerpt: 'A hands-on workshop connecting students with Ethiopian professionals.',
      mediaId: '',
      status: 'published',
      publishedTitle: 'Youth STEM & Mentorship Workshop',
      publishedDate: 'Summer 2026',
      publishedCategory: 'Education',
      publishedExcerpt: 'A hands-on workshop connecting students with Ethiopian professionals.',
      publishedMediaId: '',
      publishedAt: '2026-01-01T00:00:00.000Z',
    },
    {
      title: 'Health, Legal, and Family Resource Fair',
      date: 'Fall 2026',
      category: 'Service',
      excerpt: 'Bilingual resources for families, elders, and new community members.',
      mediaId: '',
      status: 'published',
      publishedTitle: 'Health, Legal, and Family Resource Fair',
      publishedDate: 'Fall 2026',
      publishedCategory: 'Service',
      publishedExcerpt: 'Bilingual resources for families, elders, and new community members.',
      publishedMediaId: '',
      publishedAt: '2026-01-01T00:00:00.000Z',
    },
  ],
  membershipIntro:
    'Membership is open to community members who meet the eligibility requirements below and agree to abide by the ECSF bylaws. Joining gives you a voice in the community and a way to support its work.',
  membershipEligibility: [
    'Be Ethiopian, Ethiopian-American, or married to an Ethiopian',
    'Be 18 years of age or older',
    'Complete the membership registration',
    'Agree to abide by the ECSF bylaws',
  ],
  memberships: [
    {
      name: 'Annual Membership',
      price: '$50 / year',
      note: 'Standard annual membership dues for eligible community members.',
    },
    {
      name: 'Retired Members',
      price: '$25 / year',
      note: '50% discount on annual dues for retired community members.',
    },
    {
      name: 'Elderly & Low-Income',
      price: 'Reduced rate',
      note: 'A reduced-rate option is available for elderly and low-income members through a board-approved process.',
    },
  ],
  memberRights: [
    'Voting rights',
    'Attend meetings',
    'Participate in programs and committees',
  ],
  memberResponsibilities: [
    'Follow the ECSF bylaws',
    'Pay membership dues',
    'Support community activities',
  ],
  membershipNote:
    'Membership dues are billed annually. ECSF does not currently offer monthly membership payments.',
  governanceTitle: 'How ECSF is governed.',
  governanceIntro:
    'ECSF is an organization led by a structure of accountable bodies and committees rather than any single individual. This structure keeps decisions transparent, shared, and aligned with the bylaws.',
  governanceBodies: [
    {
      name: 'General Assembly',
      description: 'All members in good standing. The General Assembly is the highest decision-making body and elects the Board of Directors.',
    },
    {
      name: 'Board of Directors',
      description: 'Elected by the General Assembly to provide oversight, set direction, and ensure ECSF acts in line with its mission and bylaws.',
    },
    {
      name: 'Executive Committee',
      description: 'A subset of the Board responsible for day-to-day governance decisions between full Board meetings.',
    },
    {
      name: 'Advisory Board',
      description: 'Experienced advisors who provide guidance, expertise, and community perspective to the Board.',
    },
    {
      name: 'Audit Committee',
      description: 'Provides independent review of finances and ensures transparency and accountability.',
    },
    {
      name: 'Executive Director',
      description: 'Leads the implementation of programs and operations under the direction of the Board.',
    },
    {
      name: 'Committees',
      description: 'Working groups that carry out ECSF programs and initiatives in specific focus areas.',
    },
  ],
  governanceChart: [
    ['General Assembly'],
    ['Board of Directors'],
    ['Advisory Board', 'Executive Committee', 'Audit Committee'],
    ['Executive Director'],
    ['Committees'],
  ],
  governanceDisclaimer:
    'Detailed leadership names and contact information are shared publicly only after the Board approves wider disclosure.',
  programs: [
    {
      title: 'Youth Education & Mentorship',
      description: 'Tutoring, STEM learning, college counseling, and mentorship connecting students with Ethiopian professionals.',
    },
    {
      title: 'Elder Support',
      description: 'Engagement, social connection, and assistance that help our elders stay active and supported.',
    },
    {
      title: 'Health & Wellness',
      description: 'Community health fairs, bilingual public panels, and culturally aware wellness and mental health resources.',
    },
    {
      title: 'Cultural Affairs',
      description: 'Programs that promote and preserve Ethiopian history, language, music, food, and heritage.',
    },
    {
      title: 'Membership Outreach',
      description: 'Growing and engaging our membership and keeping the community connected and informed.',
    },
    {
      title: 'Community Development',
      description: 'Initiatives that strengthen the community and build long-term capacity and partnerships.',
    },
    {
      title: 'Newcomer Assistance',
      description: 'Welcoming and supporting newly arrived community members as they settle and find resources.',
    },
    {
      title: 'Employment Support',
      description: 'Job readiness, career resources, and connections that support members seeking work.',
    },
    {
      title: 'Technology & Website Development',
      description: 'Building and maintaining the digital tools, website, and systems that serve the community.',
    },
    {
      title: 'Public Relations',
      description: 'Communications and outreach that represent the community and share ECSF news responsibly.',
    },
    {
      title: 'Fundraising',
      description: 'Raising the resources needed to sustain community programs and operations.',
    },
  ],
  privacyTitle: 'Privacy & Data Protection',
  privacyIntro:
    'ECSF is committed to protecting member information in line with our bylaws.',
  privacyPoints: [
    'We protect member information and handle it with care.',
    'We collect only the limited information needed to serve our members and run our programs.',
    'We keep member information confidential and do not sell or share it without consent, except where required by law.',
  ],
  donationTitle: 'Your support keeps culture, service, and care moving forward.',
  donationText:
    'Donations support our community programs and day-to-day operations. ECSF is committed to financial transparency, and all funds are managed under Board oversight.',
  donationDisclaimer:
    'Please note: ECSF does not currently represent that donations are tax-deductible. Tax and legal status information will be shared only once it has been confirmed.',
  contactTitle: 'Get involved with ECSF.',
  contactIntro:
    'Reach the right place using the forms below. To protect privacy, we direct inquiries through official ECSF channels rather than personal phone numbers or personal emails.',
  siteUrl: 'https://ethiopiancommunitysf.org',
  contactEmail: 'info@ethiopiancommunitysf.org',
  contactPhone: '',
  contactLocation: 'San Francisco & the Bay Area, California',
  heroMediaId: '',
  media: [],
}

const themeOptions = [
  { id: 'heritage', label: 'Heritage Gold' },
  { id: 'modern', label: 'Modern Light' },
  { id: 'night', label: 'Night Green' },
]

const templateOptions = [
  { id: 'classic', label: 'Classic Community' },
  { id: 'split', label: 'Split Story' },
  { id: 'magazine', label: 'Magazine Cards' },
  { id: 'media', label: 'Media First' },
]

function publishPost(post) {
  return {
    ...post,
    status: 'published',
    publishedTitle: post.title,
    publishedDate: post.date,
    publishedCategory: post.category,
    publishedNoticeType: post.noticeType || 'community',
    publishedExcerpt: post.excerpt,
    publishedMediaId: post.mediaId,
    publishedAt: new Date().toISOString(),
  }
}

function normalizePost(post) {
  const status = post.status || 'published'
  const nextPost = { ...emptyPost, ...post, status }

  if (status === 'published' && !nextPost.publishedAt) {
    return publishPost(nextPost)
  }

  return nextPost
}

function getPublishedPost(post) {
  if (post.status !== 'published') {
    return null
  }

  return {
    title: post.publishedTitle,
    date: post.publishedDate,
    category: post.publishedCategory,
    noticeType: post.publishedNoticeType || 'community',
    excerpt: post.publishedExcerpt,
    mediaId: post.publishedMediaId,
    publishedAt: post.publishedAt,
  }
}

function hasUnpublishedPostChanges(post) {
  if (post.status !== 'published') {
    return false
  }

  return (
    post.title !== post.publishedTitle ||
    post.date !== post.publishedDate ||
    post.category !== post.publishedCategory ||
    (post.noticeType || 'community') !== (post.publishedNoticeType || 'community') ||
    post.excerpt !== post.publishedExcerpt ||
    post.mediaId !== post.publishedMediaId
  )
}

function loadContent() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const parsedContent = saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent
    return {
      ...parsedContent,
      posts: parsedContent.posts.map(normalizePost),
    }
  } catch {
    return defaultContent
  }
}

function App() {
  const [content, setContent] = useState(loadContent)
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem(SESSION_KEY) === 'true')
  const [showAdmin, setShowAdmin] = useState(() => window.location.hash === '#admin')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }, [content])

  useEffect(() => {
    const syncHash = () => setShowAdmin(window.location.hash === '#admin')
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  function updateContent(field, value) {
    setContent((current) => ({ ...current, [field]: value }))
  }

  function resetContent() {
    setContent(defaultContent)
  }

  function handleLogin(password) {
    if (password === 'admin123') {
      localStorage.setItem(SESSION_KEY, 'true')
      setIsAdmin(true)
      return true
    }

    return false
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY)
    setIsAdmin(false)
  }

  const historyParagraphs = useMemo(
    () => content.historyText.split('\n').filter((paragraph) => paragraph.trim()),
    [content.historyText],
  )

  return (
    <div className={`site-shell theme-${content.theme} template-${content.template}`}>
      <SiteHeader content={content} isAdmin={isAdmin} onLogout={handleLogout} />

      {showAdmin ? (
        <AdminDashboard
          content={content}
          isAdmin={isAdmin}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onReset={resetContent}
          onUpdate={updateContent}
          setContent={setContent}
        />
      ) : (
        <PublicSite
          content={content}
          historyParagraphs={historyParagraphs}
          onThemeChange={(theme) => updateContent('theme', theme)}
        />
      )}
    </div>
  )
}

function SiteHeader({ content, isAdmin, onLogout }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label={`${content.siteName} ${content.region} home`}>
        <img className="brand-logo" src={logo} alt={`${content.siteName} ${content.region} logo`} />
        <span>
          <strong>{content.siteName}</strong>
          <small>{content.region}</small>
        </span>
      </a>

      <nav className="main-nav" aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#programs">Programs</a>
        <a href="#membership">Membership</a>
        <a href="#governance">Governance</a>
        <a href="#events">News</a>
        <a href="#contact">Contact</a>
        <a href="#donate">Donate</a>
        {isAdmin && (
          <>
            <a className="admin-nav-link" href="#admin">
              Dashboard
            </a>
            <button className="nav-button" type="button" onClick={onLogout}>
              Log Out
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

function PublicSite({ content, historyParagraphs, onThemeChange }) {
  const featuredMedia =
    content.media.find((mediaItem) => mediaItem.id === content.heroMediaId) ?? content.media[0]
  const publishedPosts = content.posts.map(getPublishedPost).filter(Boolean)
  const officialPosts = publishedPosts.filter((post) => post.noticeType === 'official')
  const communityPosts = publishedPosts.filter((post) => post.noticeType !== 'official')

  return (
    <>
      <main id="home">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">{content.heroEyebrow}</p>
            <h1>{content.heroTitle}</h1>
            <p>{content.heroText}</p>
            <div className="hero-actions">
              <a className="button primary" href="#membership">
                Become a Member
              </a>
              <a className="button secondary" href="#about">
                Read Our Mission
              </a>
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

        <section className="theme-switcher" aria-label="Website design selector">
          <span>Website Design</span>
          {themeOptions.map((theme) => (
            <button
              className={content.theme === theme.id ? 'active' : ''}
              key={theme.id}
              type="button"
              onClick={() => onThemeChange(theme.id)}
            >
              {theme.label}
            </button>
          ))}
        </section>

        {content.media.length > 0 && (
          <section className="section media-section" id="gallery">
            <div className="section-heading">
              <p className="section-kicker">Media Gallery</p>
              <h2>Photos and videos from the community.</h2>
            </div>
            <MediaGallery media={content.media} />
          </section>
        )}

        <section className="mission-band" id="mission" aria-labelledby="mission-heading">
          <div>
            <p className="section-kicker">{content.missionTitle}</p>
            <h2 id="mission-heading">{content.missionText}</h2>
          </div>
          <div className="vision-block">
            <p className="section-kicker">{content.visionTitle}</p>
            <p>{content.visionText}</p>
          </div>
        </section>

        <section className="section values-section" id="values">
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

        <section className="section" id="about">
          <div className="section-heading">
            <p className="section-kicker">About Us</p>
            <h2>{content.aboutTitle}</h2>
          </div>

          <div className="values-grid">
            {content.values.map((value) => (
              <article className="value-card" key={value}>
                <span aria-hidden="true" />
                <p>{value}</p>
              </article>
            ))}
          </div>

          <div className="history-panel">
            <div>
              <p className="section-kicker">Our History</p>
              <h2>{content.historyTitle}</h2>
            </div>
            <div className="history-copy">
              {historyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <strong>Team ECSF</strong>
            </div>
          </div>
        </section>

        <section className="section programs-section" id="programs">
          <div className="section-heading">
            <p className="section-kicker">What We Do</p>
            <h2>Programs designed around community needs.</h2>
          </div>

          <div className="program-grid">
            {content.programs.map((program) => (
              <article className="program-card" key={program.title}>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="membership">
          <div className="section-heading centered">
            <p className="section-kicker">Membership</p>
            <h2>Join and help sustain the community.</h2>
            <p>{content.membershipIntro}</p>
          </div>

          <div className="membership-detail-grid">
            <article className="detail-card">
              <h3>Eligibility Requirements</h3>
              <ul className="check-list">
                {content.membershipEligibility?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="detail-card">
              <h3>Member Rights</h3>
              <ul className="check-list">
                {content.memberRights?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="detail-card">
              <h3>Member Responsibilities</h3>
              <ul className="check-list">
                {content.memberResponsibilities?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <h3 className="subsection-title">Membership Fees</h3>
          <div className="membership-grid">
            {content.memberships.map((membership) => (
              <article className="membership-card" key={membership.name}>
                <h3>{membership.name}</h3>
                <p className="price">{membership.price}</p>
                <p>{membership.note}</p>
                <a className="button secondary" href="#contact">
                  Membership Inquiry
                </a>
              </article>
            ))}
          </div>
          {content.membershipNote && <p className="fine-print">{content.membershipNote}</p>}
        </section>

        <section className="section governance-section" id="governance">
          <div className="section-heading">
            <p className="section-kicker">Governance</p>
            <h2>{content.governanceTitle}</h2>
            <p>{content.governanceIntro}</p>
          </div>

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

          {content.governanceDisclaimer && (
            <p className="fine-print">{content.governanceDisclaimer}</p>
          )}
        </section>

        <section className="section split-section" id="events">
          <div className="section-heading">
            <p className="section-kicker">News & Announcements</p>
            <h2>{content.eventsIntro}</h2>
            <p>Official notices and community updates, published from the admin dashboard.</p>
          </div>

          <div className="announcement-columns">
            <div className="announcement-column">
              <h3 className="announcement-heading official">Official ECSF Notices</h3>
              <div className="event-list">
                {officialPosts.map((post) => (
                  <article className="event-card" key={`${post.title}-${post.date}-${post.publishedAt}`}>
                    <PostMedia media={content.media.find((mediaItem) => mediaItem.id === post.mediaId)} />
                    <span>{post.category || 'Official Notice'}</span>
                    <h3>{post.title}</h3>
                    <p className="event-date">{post.date}</p>
                    <p>{post.excerpt}</p>
                  </article>
                ))}
                {officialPosts.length === 0 && (
                  <article className="event-card">
                    <h3>No official notices yet</h3>
                    <p>Board-approved notices appear here once published.</p>
                  </article>
                )}
              </div>
            </div>

            <div className="announcement-column">
              <h3 className="announcement-heading community">Community Updates</h3>
              <div className="event-list">
                {communityPosts.map((post) => (
                  <article className="event-card" key={`${post.title}-${post.date}-${post.publishedAt}`}>
                    <PostMedia media={content.media.find((mediaItem) => mediaItem.id === post.mediaId)} />
                    <span>{post.category || 'Community'}</span>
                    <h3>{post.title}</h3>
                    <p className="event-date">{post.date}</p>
                    <p>{post.excerpt}</p>
                  </article>
                ))}
                {communityPosts.length === 0 && (
                  <article className="event-card">
                    <h3>No community updates yet</h3>
                    <p>New updates appear here after an admin clicks Publish.</p>
                  </article>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section privacy-section" id="privacy">
          <div className="section-heading">
            <p className="section-kicker">Privacy</p>
            <h2>{content.privacyTitle}</h2>
            <p>{content.privacyIntro}</p>
          </div>
          <ul className="check-list privacy-list">
            {content.privacyPoints?.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-heading centered">
            <p className="section-kicker">Get Involved</p>
            <h2>{content.contactTitle}</h2>
            <p>{content.contactIntro}</p>
          </div>

          <div className="contact-grid">
            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <h3>Volunteer Interest Form</h3>
              <label>
                Full name
                <input type="text" name="volName" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" name="volEmail" placeholder="you@example.com" />
              </label>
              <label>
                How would you like to help?
                <textarea name="volInterest" placeholder="Programs, events, skills you can offer..." />
              </label>
              <button className="button primary" type="submit">
                Submit Interest
              </button>
            </form>

            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <h3>Membership Inquiry Form</h3>
              <label>
                Full name
                <input type="text" name="memName" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" name="memEmail" placeholder="you@example.com" />
              </label>
              <label>
                Your question
                <textarea name="memQuestion" placeholder="Ask about eligibility, dues, or how to join..." />
              </label>
              <button className="button primary" type="submit">
                Send Inquiry
              </button>
            </form>

            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <h3>Leadership Contact Portal</h3>
              <label>
                Full name
                <input type="text" name="leadName" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" name="leadEmail" placeholder="you@example.com" />
              </label>
              <label>
                Topic for leadership
                <select name="leadTopic" defaultValue="general">
                  <option value="general">General</option>
                  <option value="governance">Governance</option>
                  <option value="programs">Programs</option>
                  <option value="partnership">Partnership</option>
                </select>
              </label>
              <label>
                Message
                <textarea name="leadMessage" placeholder="Your message to ECSF leadership..." />
              </label>
              <button className="button primary" type="submit">
                Contact Leadership
              </button>
            </form>
          </div>
        </section>

        <section className="donation-section" id="donate">
          <div>
            <p className="section-kicker">Donate to ECSF</p>
            <h2>{content.donationTitle}</h2>
            <p>{content.donationText}</p>
            {content.donationDisclaimer && (
              <p className="donation-disclaimer">{content.donationDisclaimer}</p>
            )}
          </div>

          <form className="donation-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              First name
              <input type="text" name="firstName" placeholder="First name" />
            </label>
            <label>
              Last name
              <input type="text" name="lastName" placeholder="Last name" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@example.com" />
            </label>
            <label>
              Amount
              <select name="amount" defaultValue="50">
                <option value="25">$25</option>
                <option value="50">$50</option>
                <option value="100">$100</option>
                <option value="custom">Custom amount</option>
              </select>
            </label>
            <button className="button primary" type="submit">
              Continue to Payment
            </button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <h2>{content.siteName} {content.region}</h2>
          <p>Serving Ethiopians and Ethiopian-Americans across San Francisco and the greater Bay Area.</p>
        </div>
        <address>
          <strong>Contact Us</strong>
          <a href={content.siteUrl}>{content.siteUrl.replace(/^https?:\/\//, '')}</a>
          {content.contactEmail && (
            <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
          )}
          {content.contactPhone && <a href={`tel:${content.contactPhone}`}>{content.contactPhone}</a>}
          <span>{content.contactLocation}</span>
        </address>
      </footer>
    </>
  )
}

function PostMedia({ media }) {
  if (!media?.src) {
    return null
  }

  return (
    <div className="post-media">
      {media.type === 'video' ? (
        <video src={media.src} controls playsInline />
      ) : (
        <img src={media.src} alt={media.title || 'Post media'} />
      )}
    </div>
  )
}

function FeaturedMedia({ media }) {
  if (!media?.src) {
    return (
      <div className="hero-emblem" aria-hidden="true">
        <span className="spark spark-left">*</span>
        <span className="hero-hut">
          <span />
        </span>
        <span className="spark spark-right">*</span>
      </div>
    )
  }

  return (
    <figure className="featured-media">
      {media.type === 'video' ? (
        <video src={media.src} controls playsInline />
      ) : (
        <img src={media.src} alt={media.title || 'Community media'} />
      )}
      {(media.title || media.caption) && (
        <figcaption>
          <strong>{media.title}</strong>
          {media.caption && <span>{media.caption}</span>}
        </figcaption>
      )}
    </figure>
  )
}

function MediaGallery({ media }) {
  return (
    <div className="media-grid">
      {media.map((mediaItem) => (
        <figure className="media-card" key={mediaItem.id}>
          {mediaItem.type === 'video' ? (
            <video src={mediaItem.src} controls playsInline />
          ) : (
            <img src={mediaItem.src} alt={mediaItem.title || 'Community media'} />
          )}
          <figcaption>
            <strong>{mediaItem.title || 'Untitled media'}</strong>
            {mediaItem.caption && <span>{mediaItem.caption}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function AdminDashboard({ content, isAdmin, onLogin, onLogout, onReset, onUpdate, setContent }) {
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [mediaError, setMediaError] = useState('')

  function updateListItem(listName, index, field, value) {
    setContent((current) => ({
      ...current,
      [listName]: current[listName].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }))
  }

  function updatePost(index, updater) {
    setContent((current) => ({
      ...current,
      posts: current.posts.map((post, itemIndex) =>
        itemIndex === index ? updater(post) : post,
      ),
    }))
  }

  function addListItem(listName, item) {
    setContent((current) => ({ ...current, [listName]: [...current[listName], item] }))
  }

  function removeListItem(listName, index) {
    setContent((current) => ({
      ...current,
      [listName]: current[listName].filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  function updateValue(index, value) {
    setContent((current) => ({
      ...current,
      values: current.values.map((item, itemIndex) => (itemIndex === index ? value : item)),
    }))
  }

  function updateStringListItem(listName, index, value) {
    setContent((current) => ({
      ...current,
      [listName]: (current[listName] || []).map((item, itemIndex) =>
        itemIndex === index ? value : item,
      ),
    }))
  }

  function updateMedia(index, field, value) {
    setContent((current) => ({
      ...current,
      media: current.media.map((mediaItem, itemIndex) =>
        itemIndex === index ? { ...mediaItem, [field]: value } : mediaItem,
      ),
    }))
  }

  function createMediaFromFile(file, onCreated) {
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setMediaError('Only image and video files are supported.')
      return
    }

    if (file.size > 4 * 1024 * 1024) {
      setMediaError('For this local demo, please upload files smaller than 4MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const mediaItem = {
        ...emptyMedia,
        id: `${Date.now()}-${file.name}`,
        type: file.type.startsWith('video/') ? 'video' : 'image',
        title: file.name.replace(/\.[^/.]+$/, ''),
        src: reader.result,
      }

      setContent((current) => ({
        ...current,
        heroMediaId: current.heroMediaId || mediaItem.id,
        media: [...current.media, mediaItem],
      }))
      onCreated?.(mediaItem)
    }
    reader.readAsDataURL(file)
  }

  function handlePostMediaUpload(event, postIndex) {
    const file = event.target.files?.[0]
    setMediaError('')

    if (file) {
      createMediaFromFile(file, (mediaItem) => {
        updateListItem('posts', postIndex, 'mediaId', mediaItem.id)
      })
    }

    event.target.value = ''
  }

  function savePostDraft(index) {
    updatePost(index, (post) => ({ ...post, status: 'draft' }))
  }

  function publishPostAtIndex(index) {
    updatePost(index, (post) => {
      if (post.noticeType === 'official' && !post.boardApproved) {
        window.alert(
          'Official ECSF Notices must be marked board-approved before publishing. Please confirm board approval first.',
        )
        return post
      }

      return publishPost(post)
    })
  }

  function removeMedia(index) {
    setContent((current) => {
      const removedMedia = current.media[index]
      const nextMedia = current.media.filter((_, itemIndex) => itemIndex !== index)

      return {
        ...current,
        heroMediaId: current.heroMediaId === removedMedia?.id ? nextMedia[0]?.id || '' : current.heroMediaId,
        media: nextMedia,
      }
    })
  }

  function handleMediaUpload(event) {
    const files = Array.from(event.target.files || [])
    setMediaError('')

    files.forEach((file) => {
      createMediaFromFile(file)
    })

    event.target.value = ''
  }

  function submitLogin(event) {
    event.preventDefault()
    const success = onLogin(password)
    setLoginError(success ? '' : 'Incorrect password. Try admin123 for this local demo.')
  }

  if (!isAdmin) {
    return (
      <main className="admin-page">
        <section className="login-card">
          <p className="section-kicker">Admin Dashboard</p>
          <h1>Log in to edit the website.</h1>
          <p>
            This demo dashboard stores content in your browser. For a live nonprofit
            site, this can later be connected to a real database and secure auth.
          </p>
          <form onSubmit={submitLogin}>
            <label>
              Admin password
              <input
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {loginError && <p className="form-error">{loginError}</p>}
            <button className="button primary" type="submit">
              Log In
            </button>
          </form>
        </section>
      </main>
    )
  }

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div>
          <p className="section-kicker">Admin Dashboard</p>
          <h1>Edit website content without WordPress.</h1>
          <p>
            Changes save automatically in this browser using local storage. Open the
            public site to see updates immediately.
          </p>
        </div>
        <div className="admin-actions">
          <a className="button secondary" href="#home">
            View Site
          </a>
          <button className="button secondary" type="button" onClick={onReset}>
            Reset Demo Content
          </button>
          <button className="button primary" type="button" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </section>

      <section className="admin-grid">
        <AdminPanel title="Design">
          <label>
            Color design
            <select value={content.theme} onChange={(event) => onUpdate('theme', event.target.value)}>
              {themeOptions.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Website template
            <select value={content.template} onChange={(event) => onUpdate('template', event.target.value)}>
              {templateOptions.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Site name
            <input value={content.siteName} onChange={(event) => onUpdate('siteName', event.target.value)} />
          </label>
          <label>
            Region
            <input value={content.region} onChange={(event) => onUpdate('region', event.target.value)} />
          </label>
        </AdminPanel>

        <AdminPanel title="Homepage">
          <label>
            Eyebrow
            <input value={content.heroEyebrow} onChange={(event) => onUpdate('heroEyebrow', event.target.value)} />
          </label>
          <label>
            Hero title
            <textarea value={content.heroTitle} onChange={(event) => onUpdate('heroTitle', event.target.value)} />
          </label>
          <label>
            Hero text
            <textarea value={content.heroText} onChange={(event) => onUpdate('heroText', event.target.value)} />
          </label>
          <label>
            Highlight card title
            <input value={content.heroCardTitle} onChange={(event) => onUpdate('heroCardTitle', event.target.value)} />
          </label>
          <label>
            Highlight card text
            <textarea value={content.heroCardText} onChange={(event) => onUpdate('heroCardText', event.target.value)} />
          </label>
          <p className="field-help">Homepage focus points (chips)</p>
          {(content.heroFocusPoints || []).map((point, index) => (
            <div className="inline-editor" key={`focus-${index}`}>
              <input
                value={point}
                onChange={(event) => updateStringListItem('heroFocusPoints', index, event.target.value)}
              />
              <button type="button" onClick={() => removeListItem('heroFocusPoints', index)}>
                Remove
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('heroFocusPoints', 'New focus')}>
            Add Focus Point
          </button>
        </AdminPanel>

        <AdminPanel title="Mission, Vision & Values">
          <label>
            Mission title
            <input value={content.missionTitle} onChange={(event) => onUpdate('missionTitle', event.target.value)} />
          </label>
          <label>
            Mission text
            <textarea value={content.missionText} onChange={(event) => onUpdate('missionText', event.target.value)} />
          </label>
          <label>
            Vision title
            <input value={content.visionTitle} onChange={(event) => onUpdate('visionTitle', event.target.value)} />
          </label>
          <label>
            Vision text
            <textarea value={content.visionText} onChange={(event) => onUpdate('visionText', event.target.value)} />
          </label>
          <label>
            Core values title
            <input value={content.coreValuesTitle} onChange={(event) => onUpdate('coreValuesTitle', event.target.value)} />
          </label>
          <p className="field-help">Core values</p>
          {(content.coreValues || []).map((value, index) => (
            <div className="collection-editor" key={`core-value-${index}`}>
              <input
                aria-label="Value name"
                placeholder="Value name"
                value={value.name}
                onChange={(event) => updateListItem('coreValues', index, 'name', event.target.value)}
              />
              <textarea
                aria-label="Value description"
                placeholder="Value description"
                value={value.description}
                onChange={(event) => updateListItem('coreValues', index, 'description', event.target.value)}
              />
              <button type="button" onClick={() => removeListItem('coreValues', index)}>
                Remove Value
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('coreValues', { ...emptyEntry })}>
            Add Core Value
          </button>
        </AdminPanel>

        <AdminPanel title="About & History">
          <label>
            About title
            <input value={content.aboutTitle} onChange={(event) => onUpdate('aboutTitle', event.target.value)} />
          </label>
          <label>
            History title
            <input value={content.historyTitle} onChange={(event) => onUpdate('historyTitle', event.target.value)} />
          </label>
          <label>
            History text
            <textarea
              className="large-textarea"
              value={content.historyText}
              onChange={(event) => onUpdate('historyText', event.target.value)}
            />
          </label>
        </AdminPanel>

        <AdminPanel title="Values">
          {content.values.map((value, index) => (
            <div className="inline-editor" key={`${value}-${index}`}>
              <textarea value={value} onChange={(event) => updateValue(index, event.target.value)} />
              <button type="button" onClick={() => removeListItem('values', index)}>
                Remove
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('values', 'New community value')}>
            Add Value
          </button>
        </AdminPanel>

        <AdminPanel title="Posts & Events">
          {content.posts.map((post, index) => (
            <div className="collection-editor" key={`${post.title}-${index}`}>
              <div className="post-editor-header">
                <span
                  className={`status-pill ${
                    hasUnpublishedPostChanges(post) ? 'status-changes' : `status-${post.status}`
                  }`}
                >
                  {hasUnpublishedPostChanges(post)
                    ? 'Unpublished changes'
                    : post.status === 'published'
                      ? 'Published'
                      : 'Draft'}
                </span>
                {post.publishedAt && (
                  <small>Last published {new Date(post.publishedAt).toLocaleDateString()}</small>
                )}
              </div>
              <PostMedia media={content.media.find((mediaItem) => mediaItem.id === post.mediaId)} />
              <input
                aria-label="Post title"
                placeholder="Title"
                value={post.title}
                onChange={(event) => updateListItem('posts', index, 'title', event.target.value)}
              />
              <input
                aria-label="Post date"
                placeholder="Date"
                value={post.date}
                onChange={(event) => updateListItem('posts', index, 'date', event.target.value)}
              />
              <input
                aria-label="Post category"
                placeholder="Category"
                value={post.category}
                onChange={(event) => updateListItem('posts', index, 'category', event.target.value)}
              />
              <label>
                Announcement type
                <select
                  value={post.noticeType || 'community'}
                  onChange={(event) => updateListItem('posts', index, 'noticeType', event.target.value)}
                >
                  <option value="community">Community Update</option>
                  <option value="official">Official ECSF Notice</option>
                </select>
              </label>
              <label className="checkbox-field">
                <input
                  type="checkbox"
                  checked={Boolean(post.boardApproved)}
                  onChange={(event) => updateListItem('posts', index, 'boardApproved', event.target.checked)}
                />
                Board-approved (required before publishing major announcements)
              </label>
              <textarea
                aria-label="Post excerpt"
                placeholder="Short description"
                value={post.excerpt}
                onChange={(event) => updateListItem('posts', index, 'excerpt', event.target.value)}
              />
              <label>
                Upload picture/video for this post
                <input
                  accept="image/*,video/*"
                  type="file"
                  onChange={(event) => handlePostMediaUpload(event, index)}
                />
              </label>
              <label>
                Or choose from media library
                <select
                  value={post.mediaId || ''}
                  onChange={(event) => updateListItem('posts', index, 'mediaId', event.target.value)}
                >
                  <option value="">No post media</option>
                  {content.media.map((mediaItem) => (
                    <option key={mediaItem.id} value={mediaItem.id}>
                      {mediaItem.title || mediaItem.id}
                    </option>
                  ))}
                </select>
              </label>
              {post.mediaId && (
                <button type="button" onClick={() => updateListItem('posts', index, 'mediaId', '')}>
                  Remove Post Media
                </button>
              )}
              <div className="publish-actions">
                <button type="button" onClick={() => savePostDraft(index)}>
                  Save to Draft
                </button>
                <button className="publish-button" type="button" onClick={() => publishPostAtIndex(index)}>
                  Publish
                </button>
              </div>
              <button type="button" onClick={() => removeListItem('posts', index)}>
                Remove Post
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('posts', { ...emptyPost })}>
            Add Post
          </button>
        </AdminPanel>

        <AdminPanel title="Programs">
          {content.programs.map((program, index) => (
            <div className="collection-editor" key={`${program.title}-${index}`}>
              <input
                aria-label="Program title"
                placeholder="Program title"
                value={program.title}
                onChange={(event) => updateListItem('programs', index, 'title', event.target.value)}
              />
              <textarea
                aria-label="Program description"
                placeholder="Program description"
                value={program.description}
                onChange={(event) => updateListItem('programs', index, 'description', event.target.value)}
              />
              <button type="button" onClick={() => removeListItem('programs', index)}>
                Remove Program
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('programs', emptyProgram)}>
            Add Program
          </button>
        </AdminPanel>

        <AdminPanel title="Membership">
          <label>
            Membership intro
            <textarea value={content.membershipIntro} onChange={(event) => onUpdate('membershipIntro', event.target.value)} />
          </label>
          <p className="field-help">Eligibility requirements</p>
          {(content.membershipEligibility || []).map((item, index) => (
            <div className="inline-editor" key={`eligibility-${index}`}>
              <input
                value={item}
                onChange={(event) => updateStringListItem('membershipEligibility', index, event.target.value)}
              />
              <button type="button" onClick={() => removeListItem('membershipEligibility', index)}>
                Remove
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('membershipEligibility', 'New requirement')}>
            Add Requirement
          </button>

          <p className="field-help">Membership fees</p>
          {content.memberships.map((membership, index) => (
            <div className="collection-editor" key={`fee-${index}`}>
              <input
                aria-label="Fee name"
                placeholder="Name"
                value={membership.name}
                onChange={(event) => updateListItem('memberships', index, 'name', event.target.value)}
              />
              <input
                aria-label="Fee price"
                placeholder="Price"
                value={membership.price}
                onChange={(event) => updateListItem('memberships', index, 'price', event.target.value)}
              />
              <textarea
                aria-label="Fee note"
                placeholder="Note"
                value={membership.note}
                onChange={(event) => updateListItem('memberships', index, 'note', event.target.value)}
              />
              <button type="button" onClick={() => removeListItem('memberships', index)}>
                Remove Fee
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('memberships', { name: '', price: '', note: '' })}>
            Add Fee
          </button>

          <p className="field-help">Member rights</p>
          {(content.memberRights || []).map((item, index) => (
            <div className="inline-editor" key={`right-${index}`}>
              <input
                value={item}
                onChange={(event) => updateStringListItem('memberRights', index, event.target.value)}
              />
              <button type="button" onClick={() => removeListItem('memberRights', index)}>
                Remove
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('memberRights', 'New right')}>
            Add Right
          </button>

          <p className="field-help">Member responsibilities</p>
          {(content.memberResponsibilities || []).map((item, index) => (
            <div className="inline-editor" key={`responsibility-${index}`}>
              <input
                value={item}
                onChange={(event) => updateStringListItem('memberResponsibilities', index, event.target.value)}
              />
              <button type="button" onClick={() => removeListItem('memberResponsibilities', index)}>
                Remove
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('memberResponsibilities', 'New responsibility')}>
            Add Responsibility
          </button>

          <label>
            Membership note (fine print)
            <textarea value={content.membershipNote} onChange={(event) => onUpdate('membershipNote', event.target.value)} />
          </label>
        </AdminPanel>

        <AdminPanel title="Governance">
          <label>
            Governance title
            <input value={content.governanceTitle} onChange={(event) => onUpdate('governanceTitle', event.target.value)} />
          </label>
          <label>
            Governance intro
            <textarea value={content.governanceIntro} onChange={(event) => onUpdate('governanceIntro', event.target.value)} />
          </label>
          <p className="field-help">Governance bodies</p>
          {(content.governanceBodies || []).map((body, index) => (
            <div className="collection-editor" key={`body-${index}`}>
              <input
                aria-label="Body name"
                placeholder="Name"
                value={body.name}
                onChange={(event) => updateListItem('governanceBodies', index, 'name', event.target.value)}
              />
              <textarea
                aria-label="Body description"
                placeholder="Description"
                value={body.description}
                onChange={(event) => updateListItem('governanceBodies', index, 'description', event.target.value)}
              />
              <button type="button" onClick={() => removeListItem('governanceBodies', index)}>
                Remove Body
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('governanceBodies', { ...emptyEntry })}>
            Add Body
          </button>
          <label>
            Leadership disclosure note
            <textarea value={content.governanceDisclaimer} onChange={(event) => onUpdate('governanceDisclaimer', event.target.value)} />
          </label>
        </AdminPanel>

        <AdminPanel title="Privacy & Data Protection">
          <label>
            Privacy title
            <input value={content.privacyTitle} onChange={(event) => onUpdate('privacyTitle', event.target.value)} />
          </label>
          <label>
            Privacy intro
            <textarea value={content.privacyIntro} onChange={(event) => onUpdate('privacyIntro', event.target.value)} />
          </label>
          <p className="field-help">Privacy points</p>
          {(content.privacyPoints || []).map((item, index) => (
            <div className="inline-editor" key={`privacy-${index}`}>
              <textarea
                value={item}
                onChange={(event) => updateStringListItem('privacyPoints', index, event.target.value)}
              />
              <button type="button" onClick={() => removeListItem('privacyPoints', index)}>
                Remove
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('privacyPoints', 'New privacy point')}>
            Add Privacy Point
          </button>
        </AdminPanel>

        <AdminPanel title="Pictures & Videos">
          <label>
            Upload media
            <input accept="image/*,video/*" multiple type="file" onChange={handleMediaUpload} />
          </label>
          <p className="field-help">
            Images and videos are stored in this browser for the local demo. Keep each
            file under 4MB.
          </p>
          {mediaError && <p className="form-error">{mediaError}</p>}
          <label>
            Featured hero media
            <select
              value={content.heroMediaId}
              onChange={(event) => onUpdate('heroMediaId', event.target.value)}
            >
              <option value="">Use graphic emblem</option>
              {content.media.map((mediaItem) => (
                <option key={mediaItem.id} value={mediaItem.id}>
                  {mediaItem.title || mediaItem.id}
                </option>
              ))}
            </select>
          </label>
          {content.media.map((mediaItem, index) => (
            <div className="media-editor" key={mediaItem.id}>
              <div className="media-preview">
                {mediaItem.type === 'video' ? (
                  <video src={mediaItem.src} controls playsInline />
                ) : (
                  <img src={mediaItem.src} alt={mediaItem.title || 'Uploaded media'} />
                )}
              </div>
              <input
                aria-label="Media title"
                placeholder="Title"
                value={mediaItem.title}
                onChange={(event) => updateMedia(index, 'title', event.target.value)}
              />
              <textarea
                aria-label="Media caption"
                placeholder="Caption"
                value={mediaItem.caption}
                onChange={(event) => updateMedia(index, 'caption', event.target.value)}
              />
              <button type="button" onClick={() => removeMedia(index)}>
                Remove Media
              </button>
            </div>
          ))}
        </AdminPanel>

        <AdminPanel title="Donation">
          <label>
            Donation title
            <textarea value={content.donationTitle} onChange={(event) => onUpdate('donationTitle', event.target.value)} />
          </label>
          <label>
            Donation text
            <textarea value={content.donationText} onChange={(event) => onUpdate('donationText', event.target.value)} />
          </label>
          <label>
            Donation disclaimer (tax/legal)
            <textarea value={content.donationDisclaimer} onChange={(event) => onUpdate('donationDisclaimer', event.target.value)} />
          </label>
        </AdminPanel>

        <AdminPanel title="Contact & Get Involved">
          <label>
            Contact title
            <input value={content.contactTitle} onChange={(event) => onUpdate('contactTitle', event.target.value)} />
          </label>
          <label>
            Contact intro
            <textarea value={content.contactIntro} onChange={(event) => onUpdate('contactIntro', event.target.value)} />
          </label>
          <label>
            Website URL
            <input value={content.siteUrl} onChange={(event) => onUpdate('siteUrl', event.target.value)} />
          </label>
          <label>
            Contact email (official channel)
            <input value={content.contactEmail} onChange={(event) => onUpdate('contactEmail', event.target.value)} />
          </label>
          <label>
            Phone (leave blank to hide)
            <input value={content.contactPhone} onChange={(event) => onUpdate('contactPhone', event.target.value)} />
          </label>
          <label>
            Location
            <input value={content.contactLocation} onChange={(event) => onUpdate('contactLocation', event.target.value)} />
          </label>
        </AdminPanel>
      </section>
    </main>
  )
}

function AdminPanel({ title, children }) {
  return (
    <section className="admin-panel">
      <h2>{title}</h2>
      <div className="admin-fields">{children}</div>
    </section>
  )
}

export default App
