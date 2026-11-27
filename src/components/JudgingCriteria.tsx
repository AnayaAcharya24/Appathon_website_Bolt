import { useEffect, useRef } from 'react'
import { Gauge, HeartHandshake, Lightbulb, Presentation, Puzzle, Smartphone, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './JudgingCriteria.css'

type Criterion = { title: string; marks: number; icon: LucideIcon }

const criteria: Criterion[] = [
  { title: 'Innovation and Originality', marks: 15, icon: Lightbulb },
  { title: 'Problem-solving Effectiveness', marks: 15, icon: Puzzle },
  { title: 'Functional Application', marks: 15, icon: Smartphone },
  { title: 'UI/UX and User Experience', marks: 10, icon: Sparkles },
  { title: 'Technical Implementation', marks: 10, icon: Gauge },
  { title: 'Presentation and Scalability', marks: 10, icon: Presentation },
  { title: 'Social Impact and Relevance', marks: 25, icon: HeartHandshake },
]

export default function JudgingCriteria() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = Array.from(section.querySelectorAll<HTMLElement>('.judging-criteria__card'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach((card) => card.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      }),
      { threshold: 0.16 },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="judging-criteria" aria-labelledby="judging-criteria-heading">
      <div className="judging-criteria__inner">
        <h2 id="judging-criteria-heading">Judging Criteria</h2>
        <div className="judging-criteria__grid">
          {criteria.map((criterion) => {
            const Icon = criterion.icon
            const emphasis = criterion.marks === 25
            return (
              <article key={criterion.title} className={`judging-criteria__card${emphasis ? ' is-emphasis' : ''}`}>
                <div className="judging-criteria__card-heading">
                  <span className="judging-criteria__icon"><Icon aria-hidden="true" /></span>
                  <h3>{criterion.title}</h3>
                </div>
                {emphasis ? (
                  <div className="judging-criteria__emphasis-mark">
                    <span>HIGHEST WEIGHTAGE</span>
                    <strong>{criterion.marks}</strong>
                  </div>
                ) : (
                  <div className="judging-criteria__mark">
                    <div className="judging-criteria__bar"><span style={{ width: `${criterion.marks * 4}%` }} /></div>
                    <strong>{criterion.marks}</strong>
                  </div>
                )}
              </article>
            )
          })}
        </div>
        <div className="judging-criteria__total"><span>TOTAL</span><strong>100 marks</strong></div>
      </div>
    </section>
  )
}
