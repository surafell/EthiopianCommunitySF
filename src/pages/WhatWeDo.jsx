import { useSite } from '../components/Layout'
import { PageHero, SubPageCard } from '../components/Page'

export default function WhatWeDo() {
  const { content } = useSite()

  return (
    <>
      <PageHero kicker="What We Do" title="Programs built around community needs" intro={content.programsIntro} />

      <section className="section">
        <div className="subpage-grid">
          {content.programs.map((program) => (
            <SubPageCard
              key={program.slug}
              to={`/what-we-do/${program.slug}`}
              title={program.title}
              blurb={program.summary}
            />
          ))}
        </div>
      </section>
    </>
  )
}
