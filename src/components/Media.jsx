import logo from '../assets/logo.png'

export function PostMedia({ media }) {
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

export function FeaturedMedia({ media }) {
  if (!media?.src) {
    return (
      <div className="hero-emblem">
        <img className="hero-logo" src={logo} alt="Ethiopian Community in San Francisco logo" />
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

export function MediaGallery({ media }) {
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

export function findMedia(media, id) {
  return media.find((mediaItem) => mediaItem.id === id)
}
