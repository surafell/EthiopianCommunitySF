import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'ecba-site-content-v1'
const SESSION_KEY = 'ecba-admin-session-v1'

const emptyPost = {
  title: '',
  date: '',
  category: '',
  excerpt: '',
  mediaId: '',
  status: 'draft',
  publishedTitle: '',
  publishedDate: '',
  publishedCategory: '',
  publishedExcerpt: '',
  publishedMediaId: '',
  publishedAt: '',
}

const emptyProgram = {
  title: '',
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
  region: 'Bay Area',
  heroEyebrow: 'Inclusive. Nonpolitical. Nonreligious.',
  heroTitle: 'Building a connected Ethiopian community across the Bay Area.',
  heroText:
    'Ethiopian Community Bay Area, ECBA, supports the social, economic, educational, and cultural needs of Ethiopian immigrants and neighbors across Northern California.',
  heroCardTitle: 'Culture, service, and belonging',
  heroCardText:
    'A modern civic home for families, elders, students, professionals, volunteers, and friends of the Ethiopian community.',
  missionTitle: 'Rooted in service, culture, and community care.',
  missionText:
    'The Ethiopian Community Bay Area, ECBA, is an inclusive, nonpolitical, and nonreligious civic organization aiming to address the social, economic, and educational needs of Ethiopian immigrants, and others in similar situations, residing in the Greater Bay Area of Northern California. ECBA is committed to promote the history and the cultural heritage of Ethiopia at large.',
  aboutTitle: 'Our values guide every program we build.',
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
    'The Ethiopian Community Bay Area was established after a year of meetings and conversations between like-minded individuals on how to tackle social problems arising in the Ethiopian immigrant community.\n\nAmid the Covid-19 pandemic, ECBA converted to a virtual nonprofit. Medical teams assembled bilingual public panels to educate the community, and subcommittees began delivering services based on the mission of educational, economic, and social support.\n\nOur future is full of hope as supporters take part in programs and services. Volunteers and board members continue to assess needs, strengthen partnerships, raise funds, and expand high-impact services across the Bay Area.\n\nECBA is run by subcommittees, each addressing a different need. Our long-term goals include a health fair, website learning resources, weekly Amharic lessons, a STEM lab, youth mentoring, job fairs, college counseling, mental health counseling, elderly engagement, and pro bono services through our legal team.\n\nA key part of our strategy is to look ahead toward healthy and strategic growth. As you read about our plans, we hope you will imagine yourself as a future ECBA partner and be part of our theory of change.',
  eventsIntro: 'Upcoming programs and gatherings.',
  posts: [
    {
      title: 'Bay Area Ethiopian Culture Day',
      date: 'Spring 2026',
      category: 'Community',
      excerpt: 'A family-friendly celebration of Ethiopian music, food, history, and art.',
      mediaId: '',
      status: 'published',
      publishedTitle: 'Bay Area Ethiopian Culture Day',
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
  memberships: [
    {
      name: 'Regular Membership',
      price: '$60 / year',
      note: 'For individual members ages 18 and up.',
    },
    {
      name: 'Retired Membership',
      price: '$30 / year',
      note: 'For retired community members who want to stay connected.',
    },
    {
      name: 'Family Supporter',
      price: 'Custom gift',
      note: 'For families and supporters contributing at any level.',
    },
  ],
  programs: [
    {
      title: 'Education & Youth',
      description:
        'Amharic lessons, STEM labs, mentoring, college counseling, job fairs, and intergenerational cultural learning.',
    },
    {
      title: 'Health & Wellness',
      description:
        'Community health fairs, bilingual public panels, mental health support, and culturally aware wellness resources.',
    },
    {
      title: 'Legal & Social Support',
      description:
        'Pro bono legal referrals, elderly engagement, resource navigation, and support for immigrant families.',
    },
  ],
  donationTitle: 'Your support keeps culture, service, and care moving forward.',
  donationText:
    'This local form is ready to connect to Stripe, PayPal, or a custom payment backend.',
  siteUrl: 'https://ethiopiancommunitysf.org',
  contactEmail: 'info@ethiopiancommunitysf.org',
  contactPhone: '(415) 555-0123',
  contactLocation: 'San Francisco Bay Area, California',
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
        <span className="brand-mark" aria-hidden="true">
          <span className="hut-roof" />
          <span className="hut-body" />
        </span>
        <span>
          <strong>{content.siteName}</strong>
          <small>{content.region}</small>
        </span>
      </a>

      <nav className="main-nav" aria-label="Main navigation">
        <a href="#about">About Us</a>
        <a href="#events">Current Events</a>
        <a href="#membership">Membership</a>
        <a href="#programs">What We Do</a>
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

        <section className="mission-band" aria-labelledby="mission-heading">
          <div>
            <p className="section-kicker">Mission Statement</p>
            <h2 id="mission-heading">{content.missionTitle}</h2>
          </div>
          <p>{content.missionText}</p>
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
              <strong>Team ECBA</strong>
            </div>
          </div>
        </section>

        <section className="section split-section" id="events">
          <div className="section-heading">
            <p className="section-kicker">Current Events & Posts</p>
            <h2>{content.eventsIntro}</h2>
            <p>Publish announcements, event cards, and community updates from the admin dashboard.</p>
          </div>

          <div className="event-list">
            {publishedPosts.map((post) => (
              <article className="event-card" key={`${post.title}-${post.date}-${post.publishedAt}`}>
                <PostMedia media={content.media.find((mediaItem) => mediaItem.id === post.mediaId)} />
                <span>{post.category}</span>
                <h3>{post.title}</h3>
                <p className="event-date">{post.date}</p>
                <p>{post.excerpt}</p>
              </article>
            ))}
            {publishedPosts.length === 0 && (
              <article className="event-card">
                <h3>No published posts yet</h3>
                <p>New posts appear here after an admin clicks Publish.</p>
              </article>
            )}
          </div>
        </section>

        <section className="section" id="membership">
          <div className="section-heading centered">
            <p className="section-kicker">Membership</p>
            <h2>Choose a membership level and help sustain the work.</h2>
          </div>

          <div className="membership-grid">
            {content.memberships.map((membership) => (
              <article className="membership-card" key={membership.name}>
                <h3>{membership.name}</h3>
                <p className="price">{membership.price}</p>
                <p>{membership.note}</p>
                <a className="button secondary" href="#donate">
                  Start Membership
                </a>
              </article>
            ))}
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

        <section className="donation-section" id="donate">
          <div>
            <p className="section-kicker">Donate to ECBA</p>
            <h2>{content.donationTitle}</h2>
            <p>{content.donationText}</p>
          </div>

          <form className="donation-form">
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
              <select name="amount" defaultValue="60">
                <option value="30">$30</option>
                <option value="60">$60</option>
                <option value="120">$120</option>
                <option value="custom">Custom amount</option>
              </select>
            </label>
            <button className="button primary" type="button">
              Continue to Payment
            </button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <h2>{content.siteName} {content.region}</h2>
          <p>Serving families, elders, youth, and volunteers across the Greater Bay Area.</p>
        </div>
        <address>
          <strong>Contact Us</strong>
          <a href={content.siteUrl}>{content.siteUrl.replace(/^https?:\/\//, '')}</a>
          <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
          <a href={`tel:${content.contactPhone}`}>{content.contactPhone}</a>
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
    updatePost(index, publishPost)
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
        </AdminPanel>

        <AdminPanel title="Mission & About">
          <label>
            Mission title
            <input value={content.missionTitle} onChange={(event) => onUpdate('missionTitle', event.target.value)} />
          </label>
          <label>
            Mission text
            <textarea value={content.missionText} onChange={(event) => onUpdate('missionText', event.target.value)} />
          </label>
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

        <AdminPanel title="Donation & Contact">
          <label>
            Website URL
            <input value={content.siteUrl} onChange={(event) => onUpdate('siteUrl', event.target.value)} />
          </label>
          <label>
            Donation title
            <textarea value={content.donationTitle} onChange={(event) => onUpdate('donationTitle', event.target.value)} />
          </label>
          <label>
            Donation text
            <textarea value={content.donationText} onChange={(event) => onUpdate('donationText', event.target.value)} />
          </label>
          <label>
            Email
            <input value={content.contactEmail} onChange={(event) => onUpdate('contactEmail', event.target.value)} />
          </label>
          <label>
            Phone
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
