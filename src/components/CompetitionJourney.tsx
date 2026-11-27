import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import './AboutJourney.css'

type JourneySide = 'left' | 'right'
type IllustrationType = 'idea' | 'impact' | 'team' | 'android' | 'presentation'

type JourneyBlock = {
  number: string
  title: string
  description: string
  details?: string[]
  side: JourneySide
  illustration: IllustrationType
  label: string
}

const blocks: JourneyBlock[] = [
  {
    number: '01',
    title: 'Why AppThon?',
    description: 'Technology is changing the world. AppThon invites students to move beyond simply using technology and become creators of it. Participants get a structured opportunity to develop ideas, collaborate with peers, build practical applications, and showcase their work.',
    side: 'left',
    illustration: 'idea',
    label: 'An idea becoming impact',
  },
  {
    number: '02',
    title: 'Competition Theme: Social Impact',
    description: 'Social Impact is the official competition theme. Participants must develop an Android application that addresses a real-world social problem, meets a community need, or creates meaningful positive change through technology.',
    side: 'right',
    illustration: 'impact',
    label: 'Technology for people',
  },
  {
    number: '03',
    title: 'Who Can Participate?',
    description: 'AppThon is exclusively for undergraduate (UG) students. Each team must consist of exactly two members: one Team Leader and one Team Partner.',
    side: 'left',
    illustration: 'team',
    label: 'Two people, one team',
  },
  {
    number: '04',
    title: 'Android Application Development',
    description: 'Every participating team must develop a functional Android application that can be installed on an Android smartphone and submitted as an APK file.',
    details: ['The application should be ready for demonstration and evaluation.'],
    side: 'right',
    illustration: 'android',
    label: 'Ready to install and explore',
  },
  {
    number: '05',
    title: 'Final Presentation & Judge Interaction',
    description: 'Each team receives a total of 10 minutes for its final evaluation.',
    details: ['7 minutes — Project presentation and application demonstration.', '3 minutes — Interaction, questions and discussion with the judges.'],
    side: 'left',
    illustration: 'presentation',
    label: 'Present, discuss, improve',
  },
]

function Illustration({ type, label }: { type: IllustrationType; label: string }) {
  const gradientId = `journey-${type}-gradient`
  const common = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  return (
    <div className="about-journey__image" role="img" aria-label={label}>
      <svg viewBox="0 0 470 244" aria-hidden="true">
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="42%" r="75%">
            <stop offset="0" stopColor="#4a2590" />
            <stop offset="0.58" stopColor="#150c2b" />
            <stop offset="1" stopColor="#0a0715" />
          </radialGradient>
          <linearGradient id={`${gradientId}-accent`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c9a4ff" />
            <stop offset="1" stopColor="#a64aff" />
          </linearGradient>
        </defs>
        <rect width="470" height="244" rx="18" fill={`url(#${gradientId})`} />
        {type === 'idea' && (
          <g {...common} strokeWidth="2.2">
            <path d="M225 54c-25 0-43 18-43 41 0 16 8 27 18 36 6 5 9 12 9 20h32c0-8 3-15 9-20 11-9 18-21 18-37 0-22-18-40-43-40Z" stroke="#fff" />
            <path d="M214 165h22m-18 10h14M210 94l14 14 14-14m-14 14v32" stroke={`url(#${gradientId}-accent)`} />
            <path d="M173 62l-15-12m74-7V25m49 37 15-12M171 119l-22 7m101-7 22 7" stroke="#c9a4ff" />
            <circle cx="158" cy="50" r="5" fill="#a64aff" stroke="none" /><circle cx="237" cy="25" r="5" fill="#c9a4ff" stroke="none" /><circle cx="290" cy="50" r="5" fill="#a64aff" stroke="none" />
            <path d="M96 186h278M115 203h240" stroke="#7024d8" opacity=".55" />
            <path d="m116 186 17-17 19 9 21-25 19 12 25-30 18 18 24-28 22 20 25-11 24 20" stroke="#a64aff" opacity=".7" />
            <path d="M118 188v-10m20 10v-20m20 20v-34m20 34v-22m20 22v-37m20 37v-24m20 24v-34m20 34v-18m20 18v-27m20 27v-17" stroke="#c9a4ff" opacity=".35" />
          </g>
        )}
        {type === 'impact' && (
          <g {...common} strokeWidth="2.2">
            <circle cx="235" cy="112" r="55" stroke="#fff" />
            <path d="M180 112h110M235 57c18 17 28 35 28 55s-10 38-28 55c-18-17-28-35-28-55s10-38 28-55Z" stroke="#c9a4ff" />
            <path d="M188 83c13 8 29 12 47 12s34-4 47-12M188 141c13-8 29-12 47-12s34 4 47 12" stroke="#a64aff" />
            <path d="M235 89c-18-22-46 3-1 32 45-29 17-54 1-32Z" fill="#ff76bc" stroke="#ffb4d9" />
            <circle cx="235" cy="27" r="7" fill="#a64aff" stroke="none" /><circle cx="111" cy="76" r="7" fill="#c9a4ff" stroke="none" /><circle cx="359" cy="76" r="7" fill="#c9a4ff" stroke="none" /><circle cx="126" cy="174" r="7" fill="#a64aff" stroke="none" /><circle cx="344" cy="174" r="7" fill="#a64aff" stroke="none" />
            <path d="M235 57V34M188 83l-71-5m165 5 71-5m-102 58-99 39m131-39 99 39" stroke="#c9a4ff" opacity=".5" />
            <circle cx="117" cy="122" r="14" stroke="#fff" /><circle cx="353" cy="122" r="14" stroke="#fff" />
            <path d="M109 122h16m-8-8v16m228-8h16m-8-8v16" stroke="#a64aff" />
          </g>
        )}
        {type === 'team' && (
          <g {...common} strokeWidth="2.2">
            <circle cx="183" cy="77" r="23" stroke="#fff" /><circle cx="287" cy="77" r="23" stroke="#fff" />
            <path d="M146 170c2-42 20-65 37-65s35 23 37 65M250 170c2-42 20-65 37-65s35 23 37 65" stroke="#c9a4ff" />
            <path d="M220 122h30m-15-15v30" stroke="#a64aff" />
            <rect x="107" y="181" width="153" height="28" rx="14" stroke="#7024d8" /><rect x="210" y="181" width="153" height="28" rx="14" stroke="#7024d8" />
            <path d="M125 195h116M228 195h117" stroke="#fff" opacity=".4" />
            <circle cx="235" cy="122" r="38" stroke="#a64aff" strokeDasharray="4 8" opacity=".7" />
            <text x="183" y="200" fill="#fff" stroke="none" fontSize="10" textAnchor="middle" letterSpacing="1">TEAM LEADER</text>
            <text x="287" y="200" fill="#fff" stroke="none" fontSize="10" textAnchor="middle" letterSpacing="1">TEAM PARTNER</text>
          </g>
        )}
        {type === 'android' && (
          <g {...common} strokeWidth="2.2">
            <rect x="143" y="28" width="138" height="188" rx="19" stroke="#fff" />
            <path d="M194 42h36" stroke="#c9a4ff" />
            <rect x="158" y="61" width="108" height="119" rx="8" stroke="#7024d8" />
            <path d="M174 80h28v24h-28zm48 0h28v24h-28zm-48 40h28v24h-28zm48 0h28v24h-28z" stroke="#c9a4ff" />
            <path d="M171 166h82" stroke="#a64aff" /><circle cx="212" cy="199" r="5" fill="#a64aff" stroke="none" />
            <path d="M330 67h47v61h-47z" stroke="#fff" /><path d="M341 67v-10h25v10m-25 21h25m-25 16h17" stroke="#c9a4ff" />
            <path d="m345 144 11 12 23-28" stroke="#a64aff" /><path d="M304 91h17m-17 23h17m-17 23h17" stroke="#7024d8" />
            <text x="353" y="118" fill="#fff" stroke="none" fontSize="11" textAnchor="middle" letterSpacing="1">APK</text>
          </g>
        )}
        {type === 'presentation' && (
          <g {...common} strokeWidth="2.2">
            <circle cx="235" cy="117" r="70" stroke="#7024d8" opacity=".45" />
            <path d="M235 117V47a70 70 0 0 1 66 93Z" fill="#a64aff" opacity=".8" stroke="#c9a4ff" />
            <path d="M235 117h66a70 70 0 0 1-105 52Z" fill="#7024d8" opacity=".8" stroke="#c9a4ff" />
            <path d="M235 117 196 169a70 70 0 0 1 39-122Z" fill="#c9a4ff" opacity=".82" stroke="#fff" />
            <circle cx="235" cy="117" r="37" fill="#150c2b" stroke="#fff" />
            <text x="235" y="113" fill="#fff" stroke="none" fontSize="14" textAnchor="middle" letterSpacing="1">10</text>
            <text x="235" y="130" fill="#c9a4ff" stroke="none" fontSize="9" textAnchor="middle" letterSpacing="1">MINUTES</text>
            <path d="M103 192h264M130 208h210" stroke="#7024d8" opacity=".6" />
            <circle cx="112" cy="71" r="10" stroke="#fff" /><circle cx="358" cy="71" r="10" stroke="#fff" /><path d="M112 81v34m246-34v34m-13 14h26m-259 0h26" stroke="#c9a4ff" />
          </g>
        )}
      </svg>
    </div>
  )
}

function buildPath(container: HTMLElement, rows: HTMLElement[], path: SVGPathElement): number {
  const containerRect = container.getBoundingClientRect()
  const gap = 28
  const mobile = window.innerWidth < 640
  const commands: string[] = []

  rows.forEach((row, index) => {
    const image = row.querySelector<HTMLElement>('.about-journey__image')
    if (!image) return
    const imageRect = image.getBoundingClientRect()
    const top = row.offsetTop
    const bottom = top + row.offsetHeight
    const radius = mobile ? 30 : Math.min(row.offsetHeight * 0.35, imageRect.height / 2 + gap)
    const left = Math.max(0, imageRect.left - containerRect.left - gap)
    const right = Math.min(containerRect.width, imageRect.right - containerRect.left + gap)

    if (row.dataset.side === 'left') {
      commands.push(index === 0 ? `M ${right} ${top}` : `H ${left + radius}`)
      commands.push(`A ${radius} ${radius} 0 0 0 ${left} ${top + radius}`)
      commands.push(`V ${bottom - radius}`)
      commands.push(`A ${radius} ${radius} 0 0 0 ${left + radius} ${bottom}`)
      commands.push(`H ${containerRect.width}`)
    } else {
      commands.push(index === 0 ? `M ${left} ${top}` : `H ${right - radius}`)
      commands.push(`A ${radius} ${radius} 0 0 1 ${right} ${top + radius}`)
      commands.push(`V ${bottom - radius}`)
      commands.push(`A ${radius} ${radius} 0 0 1 ${right - radius} ${bottom}`)
      commands.push('H 0')
    }
  })

  const d = commands.join(' ')
  path.setAttribute('d', d)
  return path.getTotalLength()
}

export default function CompetitionJourney() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)
  const glowPathRef = useRef<SVGPathElement | null>(null)
  const trackPathRef = useRef<SVGPathElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    const path = pathRef.current
    const glowPath = glowPathRef.current
    const trackPath = trackPathRef.current
    const svg = svgRef.current
    if (!section || !container || !path || !glowPath || !trackPath || !svg) return

    const rows = Array.from(container.querySelectorAll<HTMLElement>('.about-journey__row'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let length = 0
    let frame = 0
    let resizeObserver: ResizeObserver | null = null
    let intersectionObserver: IntersectionObserver | null = null

    const setProgress = (): void => {
      const sectionRect = section.getBoundingClientRect()
      const readingLine = window.innerHeight * 0.6
      const progress = reducedMotion
        ? 1
        : Math.min(Math.max((readingLine - sectionRect.top) / Math.max(sectionRect.height, 1), 0), 1)
      const offset = length * (1 - progress)
      path.style.strokeDashoffset = `${offset}`
      glowPath.style.strokeDashoffset = `${offset}`
      trackPath.style.strokeDashoffset = '0'
      section.style.setProperty('--journey-progress', String(progress))
    }

    const rebuild = (): void => {
      frame = 0
      const nextLength = buildPath(container, rows, path)
      length = nextLength
      const bounds = container.getBoundingClientRect()
      svg.setAttribute('viewBox', `0 0 ${Math.max(bounds.width, 1)} ${Math.max(container.offsetHeight, 1)}`)
      for (const line of [path, glowPath, trackPath]) {
        line.setAttribute('d', path.getAttribute('d') ?? '')
        line.style.strokeDasharray = `${length}`
      }
      setProgress()
    }

    const scheduleProgress = (): void => {
      if (frame === 0) frame = window.requestAnimationFrame(setProgress)
    }

    rebuild()
    window.addEventListener('scroll', scheduleProgress, { passive: true })
    window.addEventListener('resize', rebuild)
    resizeObserver = new ResizeObserver(rebuild)
    resizeObserver.observe(container)
    rows.forEach((row) => resizeObserver?.observe(row))

    if (reducedMotion) {
      rows.forEach((row) => row.classList.add('is-visible'))
    } else {
      intersectionObserver = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        }),
        { threshold: 0.14 },
      )
      rows.forEach((row) => intersectionObserver?.observe(row))
    }

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame)
      resizeObserver?.disconnect()
      intersectionObserver?.disconnect()
      window.removeEventListener('scroll', scheduleProgress)
      window.removeEventListener('resize', rebuild)
    }
  }, [])

  return (
    <section ref={sectionRef} className="about-journey" aria-label="About AppThon information journey">
      <div ref={containerRef} className="about-journey__container">
        <svg ref={svgRef} className="about-journey__curve" aria-hidden="true" preserveAspectRatio="none">
          <defs>
            <linearGradient id="journey-curve-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#7024D8" />
              <stop offset="1" stopColor="#A64AFF" />
            </linearGradient>
          </defs>
          <path ref={trackPathRef} className="about-journey__curve-track" />
          <path ref={glowPathRef} className="about-journey__curve-glow" />
          <path ref={pathRef} className="about-journey__curve-core" />
        </svg>
        <div className="about-journey__end-glow" aria-hidden="true" />
        {blocks.map((block, index) => (
          <article
            key={block.number}
            className={`about-journey__row about-journey__row--${block.side}`}
            data-side={block.side}
            style={{ '--row-index': index } as CSSProperties}
          >
            <Illustration type={block.illustration} label={block.label} />
            <div className="about-journey__text">
              <span className="about-journey__number">{block.number}</span>
              <h2>{block.title}</h2>
              <p>{block.description}</p>
              {block.details?.map((detail) => <p key={detail}>{detail}</p>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
