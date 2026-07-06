import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from '../components/Layout'
import { PostMedia, findMedia } from '../components/Media'
import {
  emptyEntry,
  emptyEvent,
  emptyBoardMember,
  emptyReport,
  emptyStory,
  emptyMedia,
  emptyPost,
  emptyProgram,
  hasUnpublishedPostChanges,
  publishPost,
  slugify,
  themeOptions,
} from '../content'

function AdminPanel({ title, children }) {
  return (
    <section className="admin-panel">
      <h2>{title}</h2>
      <div className="admin-fields">{children}</div>
    </section>
  )
}

export default function Admin() {
  const { content, isAdmin, onLogin, onLogout, onReset, onUpdate, setContent } = useSite()
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
      posts: current.posts.map((post, itemIndex) => (itemIndex === index ? updater(post) : post)),
    }))
  }

  function addListItem(listName, item) {
    setContent((current) => ({ ...current, [listName]: [...(current[listName] || []), item] }))
  }

  function removeListItem(listName, index) {
    setContent((current) => ({
      ...current,
      [listName]: current[listName].filter((_, itemIndex) => itemIndex !== index),
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
    files.forEach((file) => createMediaFromFile(file))
    event.target.value = ''
  }

  function submitLogin(event) {
    event.preventDefault()
    const success = onLogin(password)
    setLoginError(success ? '' : 'Incorrect password. Try admin123 for this local demo.')
  }

  const mediaOptions = (
    <>
      <option value="">No media</option>
      {content.media.map((mediaItem) => (
        <option key={mediaItem.id} value={mediaItem.id}>
          {mediaItem.title || mediaItem.id}
        </option>
      ))}
    </>
  )

  if (!isAdmin) {
    return (
      <main className="admin-page">
        <section className="login-card">
          <p className="section-kicker">Admin Dashboard</p>
          <h1>Log in to edit the website.</h1>
          <p>
            This demo dashboard stores content in your browser. For a live nonprofit site, this can later be
            connected to a real database and secure auth.
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
          <h1>Manage your website content.</h1>
          <p>Changes save automatically in this browser. Open any page to see updates immediately.</p>
        </div>
        <div className="admin-actions">
          <Link className="button secondary" to="/">
            View Site
          </Link>
          <button className="button secondary" type="button" onClick={onReset}>
            Reset Demo Content
          </button>
          <button className="button primary" type="button" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </section>

      <section className="admin-grid">
        <AdminPanel title="Design & Branding">
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
            Site name
            <input value={content.siteName} onChange={(event) => onUpdate('siteName', event.target.value)} />
          </label>
          <label>
            Region
            <input value={content.region} onChange={(event) => onUpdate('region', event.target.value)} />
          </label>
        </AdminPanel>

        <AdminPanel title="Home / Dashboard">
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
          <label>
            Spotlight title
            <input
              value={content.dashboardSpotlightTitle}
              onChange={(event) => onUpdate('dashboardSpotlightTitle', event.target.value)}
            />
          </label>
          <label>
            Spotlight text
            <textarea
              value={content.dashboardSpotlightText}
              onChange={(event) => onUpdate('dashboardSpotlightText', event.target.value)}
            />
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

        <AdminPanel title="About: Mission, Vision & Values">
          <label>
            About intro
            <textarea value={content.aboutIntro} onChange={(event) => onUpdate('aboutIntro', event.target.value)} />
          </label>
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
          <p className="field-help">Core values</p>
          {(content.coreValues || []).map((value, index) => (
            <div className="collection-editor" key={`core-value-${index}`}>
              <input
                placeholder="Value name"
                value={value.name}
                onChange={(event) => updateListItem('coreValues', index, 'name', event.target.value)}
              />
              <textarea
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

        <AdminPanel title="About: History">
          <label>
            History text (use blank lines for paragraphs)
            <textarea
              className="large-textarea"
              value={content.historyText}
              onChange={(event) => onUpdate('historyText', event.target.value)}
            />
          </label>
          <label>
            History tagline
            <input value={content.historyTagline} onChange={(event) => onUpdate('historyTagline', event.target.value)} />
          </label>
        </AdminPanel>

        <AdminPanel title="About: Board Members">
          <label>
            Board intro
            <textarea value={content.boardIntro} onChange={(event) => onUpdate('boardIntro', event.target.value)} />
          </label>
          {(content.boardMembers || []).map((member, index) => (
            <div className="collection-editor" key={`board-${index}`}>
              <input
                placeholder="Name"
                value={member.name}
                onChange={(event) => updateListItem('boardMembers', index, 'name', event.target.value)}
              />
              <input
                placeholder="Position"
                value={member.position}
                onChange={(event) => updateListItem('boardMembers', index, 'position', event.target.value)}
              />
              <label>
                Photo
                <select
                  value={member.mediaId || ''}
                  onChange={(event) => updateListItem('boardMembers', index, 'mediaId', event.target.value)}
                >
                  {mediaOptions}
                </select>
              </label>
              <button type="button" onClick={() => removeListItem('boardMembers', index)}>
                Remove Member
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('boardMembers', { ...emptyBoardMember })}>
            Add Board Member
          </button>
        </AdminPanel>

        <AdminPanel title="About: Volunteers">
          <label>
            Volunteers intro
            <textarea value={content.volunteersIntro} onChange={(event) => onUpdate('volunteersIntro', event.target.value)} />
          </label>
          {(content.volunteers || []).map((member, index) => (
            <div className="collection-editor" key={`vol-${index}`}>
              <input
                placeholder="Name"
                value={member.name}
                onChange={(event) => updateListItem('volunteers', index, 'name', event.target.value)}
              />
              <input
                placeholder="Role"
                value={member.position}
                onChange={(event) => updateListItem('volunteers', index, 'position', event.target.value)}
              />
              <label>
                Photo
                <select
                  value={member.mediaId || ''}
                  onChange={(event) => updateListItem('volunteers', index, 'mediaId', event.target.value)}
                >
                  {mediaOptions}
                </select>
              </label>
              <button type="button" onClick={() => removeListItem('volunteers', index)}>
                Remove Volunteer
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('volunteers', { ...emptyBoardMember })}>
            Add Volunteer
          </button>
        </AdminPanel>

        <AdminPanel title="About: Annual Reports">
          <label>
            Annual reports intro
            <textarea
              value={content.annualReportsIntro}
              onChange={(event) => onUpdate('annualReportsIntro', event.target.value)}
            />
          </label>
          {(content.annualReports || []).map((report, index) => (
            <div className="collection-editor" key={`report-${index}`}>
              <input
                placeholder="Title"
                value={report.title}
                onChange={(event) => updateListItem('annualReports', index, 'title', event.target.value)}
              />
              <input
                placeholder="Year"
                value={report.year}
                onChange={(event) => updateListItem('annualReports', index, 'year', event.target.value)}
              />
              <textarea
                placeholder="Summary"
                value={report.summary}
                onChange={(event) => updateListItem('annualReports', index, 'summary', event.target.value)}
              />
              <input
                placeholder="Link (optional)"
                value={report.link}
                onChange={(event) => updateListItem('annualReports', index, 'link', event.target.value)}
              />
              <button type="button" onClick={() => removeListItem('annualReports', index)}>
                Remove Report
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('annualReports', { ...emptyReport })}>
            Add Report
          </button>
        </AdminPanel>

        <AdminPanel title="About: Bylaws & Financials">
          <label>
            Bylaws intro
            <textarea value={content.bylawsIntro} onChange={(event) => onUpdate('bylawsIntro', event.target.value)} />
          </label>
          <label>
            Bylaws (English)
            <textarea value={content.bylawsEnglish} onChange={(event) => onUpdate('bylawsEnglish', event.target.value)} />
          </label>
          <label>
            Bylaws (Amharic)
            <textarea value={content.bylawsAmharic} onChange={(event) => onUpdate('bylawsAmharic', event.target.value)} />
          </label>
          {(content.bylawsDocuments || []).map((document, index) => (
            <div className="collection-editor" key={`${document.url}-${index}`}>
              <p className="field-help">Bylaws document {index + 1}</p>
              <label>
                Title
                <input
                  value={document.title}
                  onChange={(event) => {
                    const next = [...(content.bylawsDocuments || [])]
                    next[index] = { ...next[index], title: event.target.value }
                    onUpdate('bylawsDocuments', next)
                  }}
                />
              </label>
              <label>
                PDF URL
                <input
                  value={document.url}
                  onChange={(event) => {
                    const next = [...(content.bylawsDocuments || [])]
                    next[index] = { ...next[index], url: event.target.value }
                    onUpdate('bylawsDocuments', next)
                  }}
                />
              </label>
              <label>
                File name
                <input
                  value={document.fileName}
                  onChange={(event) => {
                    const next = [...(content.bylawsDocuments || [])]
                    next[index] = { ...next[index], fileName: event.target.value }
                    onUpdate('bylawsDocuments', next)
                  }}
                />
              </label>
            </div>
          ))}
          <label>
            Financials intro
            <textarea value={content.financialsIntro} onChange={(event) => onUpdate('financialsIntro', event.target.value)} />
          </label>
          <label>
            Financials text
            <textarea value={content.financialsText} onChange={(event) => onUpdate('financialsText', event.target.value)} />
          </label>
        </AdminPanel>

        <AdminPanel title="About: Our Stories">
          <label>
            Stories intro
            <textarea value={content.storiesIntro} onChange={(event) => onUpdate('storiesIntro', event.target.value)} />
          </label>
          {(content.stories || []).map((story, index) => (
            <div className="collection-editor" key={`story-${index}`}>
              <input
                placeholder="Title"
                value={story.title}
                onChange={(event) => updateListItem('stories', index, 'title', event.target.value)}
              />
              <input
                placeholder="Author"
                value={story.author}
                onChange={(event) => updateListItem('stories', index, 'author', event.target.value)}
              />
              <textarea
                placeholder="Story"
                value={story.body}
                onChange={(event) => updateListItem('stories', index, 'body', event.target.value)}
              />
              <label>
                Photo/Video
                <select
                  value={story.mediaId || ''}
                  onChange={(event) => updateListItem('stories', index, 'mediaId', event.target.value)}
                >
                  {mediaOptions}
                </select>
              </label>
              <button type="button" onClick={() => removeListItem('stories', index)}>
                Remove Story
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('stories', { ...emptyStory })}>
            Add Story
          </button>
        </AdminPanel>

        <AdminPanel title="What We Do (Programs)">
          <label>
            Programs intro
            <textarea value={content.programsIntro} onChange={(event) => onUpdate('programsIntro', event.target.value)} />
          </label>
          {content.programs.map((program, index) => (
            <div className="collection-editor" key={`program-${index}`}>
              <input
                placeholder="Title"
                value={program.title}
                onChange={(event) => {
                  const title = event.target.value
                  setContent((current) => ({
                    ...current,
                    programs: current.programs.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, title, slug: slugify(title) } : item,
                    ),
                  }))
                }}
              />
              <input
                placeholder="Short summary"
                value={program.summary}
                onChange={(event) => updateListItem('programs', index, 'summary', event.target.value)}
              />
              <textarea
                placeholder="Full description (use blank lines for paragraphs)"
                value={program.description}
                onChange={(event) => updateListItem('programs', index, 'description', event.target.value)}
              />
              <small className="field-help">URL: /what-we-do/{program.slug}</small>
              <button type="button" onClick={() => removeListItem('programs', index)}>
                Remove Program
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('programs', { ...emptyProgram, title: 'New Program', slug: 'new-program' })}>
            Add Program
          </button>
        </AdminPanel>

        <AdminPanel title="Events">
          <label>
            Events intro
            <textarea value={content.eventsIntro} onChange={(event) => onUpdate('eventsIntro', event.target.value)} />
          </label>
          {(content.events || []).map((event, index) => (
            <div className="collection-editor" key={`event-${index}`}>
              <input
                placeholder="Title"
                value={event.title}
                onChange={(e) => updateListItem('events', index, 'title', e.target.value)}
              />
              <input
                placeholder="Date"
                value={event.date}
                onChange={(e) => updateListItem('events', index, 'date', e.target.value)}
              />
              <input
                placeholder="Location"
                value={event.location}
                onChange={(e) => updateListItem('events', index, 'location', e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={event.excerpt}
                onChange={(e) => updateListItem('events', index, 'excerpt', e.target.value)}
              />
              <label>
                When
                <select value={event.period} onChange={(e) => updateListItem('events', index, 'period', e.target.value)}>
                  <option value="current">Current</option>
                  <option value="future">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </label>
              <label>
                Photo/Video
                <select
                  value={event.mediaId || ''}
                  onChange={(e) => updateListItem('events', index, 'mediaId', e.target.value)}
                >
                  {mediaOptions}
                </select>
              </label>
              <button type="button" onClick={() => removeListItem('events', index)}>
                Remove Event
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('events', { ...emptyEvent })}>
            Add Event
          </button>
        </AdminPanel>

        <AdminPanel title="Announcements (Home dashboard)">
          {content.posts.map((post, index) => (
            <div className="collection-editor" key={`post-${index}`}>
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
              <PostMedia media={findMedia(content.media, post.mediaId)} />
              <input
                placeholder="Title"
                value={post.title}
                onChange={(event) => updateListItem('posts', index, 'title', event.target.value)}
              />
              <input
                placeholder="Date"
                value={post.date}
                onChange={(event) => updateListItem('posts', index, 'date', event.target.value)}
              />
              <input
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
                Board-approved (required before publishing official notices)
              </label>
              <textarea
                placeholder="Short description"
                value={post.excerpt}
                onChange={(event) => updateListItem('posts', index, 'excerpt', event.target.value)}
              />
              <label>
                Upload picture/video
                <input accept="image/*,video/*" type="file" onChange={(event) => handlePostMediaUpload(event, index)} />
              </label>
              <label>
                Or choose from media library
                <select
                  value={post.mediaId || ''}
                  onChange={(event) => updateListItem('posts', index, 'mediaId', event.target.value)}
                >
                  {mediaOptions}
                </select>
              </label>
              <div className="publish-actions">
                <button type="button" onClick={() => savePostDraft(index)}>
                  Save to Draft
                </button>
                <button className="publish-button" type="button" onClick={() => publishPostAtIndex(index)}>
                  Publish
                </button>
              </div>
              <button type="button" onClick={() => removeListItem('posts', index)}>
                Remove Announcement
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('posts', { ...emptyPost })}>
            Add Announcement
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
          <button
            className="button secondary"
            type="button"
            onClick={() => addListItem('membershipEligibility', 'New requirement')}
          >
            Add Requirement
          </button>

          <p className="field-help">Membership fees</p>
          {content.memberships.map((membership, index) => (
            <div className="collection-editor" key={`fee-${index}`}>
              <input
                placeholder="Name"
                value={membership.name}
                onChange={(event) => updateListItem('memberships', index, 'name', event.target.value)}
              />
              <input
                placeholder="Price"
                value={membership.price}
                onChange={(event) => updateListItem('memberships', index, 'price', event.target.value)}
              />
              <textarea
                placeholder="Note"
                value={membership.note}
                onChange={(event) => updateListItem('memberships', index, 'note', event.target.value)}
              />
              <label className="checkbox-field">
                <input
                  type="checkbox"
                  checked={Boolean(membership.inactive)}
                  onChange={(event) => updateListItem('memberships', index, 'inactive', event.target.checked)}
                />
                Not active yet (shown as coming soon)
              </label>
              <button type="button" onClick={() => removeListItem('memberships', index)}>
                Remove Fee
              </button>
            </div>
          ))}
          <button
            className="button secondary"
            type="button"
            onClick={() => addListItem('memberships', { name: '', price: '', note: '', inactive: false })}
          >
            Add Fee
          </button>

          <p className="field-help">Member benefits</p>
          {(content.memberRights || []).map((item, index) => (
            <div className="inline-editor" key={`benefit-${index}`}>
              <input
                value={item}
                onChange={(event) => updateStringListItem('memberRights', index, event.target.value)}
              />
              <button type="button" onClick={() => removeListItem('memberRights', index)}>
                Remove
              </button>
            </div>
          ))}
          <button className="button secondary" type="button" onClick={() => addListItem('memberRights', 'New benefit')}>
            Add Benefit
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
          <button
            className="button secondary"
            type="button"
            onClick={() => addListItem('memberResponsibilities', 'New responsibility')}
          >
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
                placeholder="Name"
                value={body.name}
                onChange={(event) => updateListItem('governanceBodies', index, 'name', event.target.value)}
              />
              <textarea
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
            <textarea
              value={content.governanceDisclaimer}
              onChange={(event) => onUpdate('governanceDisclaimer', event.target.value)}
            />
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
          <p className="field-help">Images and videos are stored in this browser for the local demo. Keep each file under 4MB.</p>
          {mediaError && <p className="form-error">{mediaError}</p>}
          <label>
            Featured hero media
            <select value={content.heroMediaId} onChange={(event) => onUpdate('heroMediaId', event.target.value)}>
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
                placeholder="Title"
                value={mediaItem.title}
                onChange={(event) => updateMedia(index, 'title', event.target.value)}
              />
              <textarea
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
            <textarea
              value={content.donationDisclaimer}
              onChange={(event) => onUpdate('donationDisclaimer', event.target.value)}
            />
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
