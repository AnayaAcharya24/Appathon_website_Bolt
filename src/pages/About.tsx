import { GraduationCap, Users } from 'lucide-react'
import AboutHero from '../components/AboutHero'
import CompetitionJourney from '../components/CompetitionJourney'
import JudgingCriteria from '../components/JudgingCriteria'
import { Card } from '../components/ui'
import { getSettings } from '../lib/store'

export default function About() {
  const settings = getSettings()
  return (
    <>
      <AboutHero luminous />
      <CompetitionJourney />
      <JudgingCriteria />
      <section className="max-w-7xl mx-auto px-6 pb-20 grid lg:grid-cols-2 gap-4">
        <Card className="!p-8">
          <GraduationCap className="w-7 h-7 text-brand" />
          <h3 className="font-display text-4xl mt-4">Why participate?</h3>
          <ul className="mt-5 space-y-3 text-white/70 leading-relaxed list-disc pl-5">
            <li>You finish with a working product — the strongest thing a student portfolio can hold.</li>
            <li>You learn to scope, build and demo under a deadline, the way real teams work.</li>
            <li>Judges’ scores and comments tell you exactly what to improve next.</li>
            <li>First Prize and Second Prize are awarded as confirmed by the organisers; every valid submission earns a participation certificate.</li>
            <li>You meet builders from other colleges — future co-founders, teammates and friends.</li>
          </ul>
        </Card>
        <Card className="!p-8">
          <Users className="w-7 h-7 text-brand" />
          <h3 className="font-display text-4xl mt-4">Organising institution</h3>
          <p className="text-white/70 leading-relaxed mt-4">
            Appathon is organised by <strong className="text-white">{settings.institution}</strong>.
            Institution details, faculty coordinator and student coordinators are published on the
            Contact page as soon as they are confirmed by the organisers.
          </p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-white/50">Event date</dt><dd>{settings.eventDate}</dd></div>
            <div className="flex justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-white/50">Venue</dt><dd>{settings.venue}</dd></div>
            <div className="flex justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-white/50">Registration</dt><dd>{settings.regOpen} → {settings.regClose}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-white/50">Contact</dt><dd>{settings.contactEmail}</dd></div>
          </dl>
          <p className="text-xs text-white/40 mt-6">
            Fields marked “To be announced” are editable placeholders in the Admin dashboard —
            they are filled in by the organisers, never invented by this website.
          </p>
        </Card>
      </section>
    </>
  )
}
