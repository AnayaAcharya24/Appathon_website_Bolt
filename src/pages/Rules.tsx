import { AlertTriangle, ListChecks, Scale, ShieldCheck, Timer, Users } from 'lucide-react'
import { PageHero, SectionHead } from '../components/Hero'
import { Card } from '../components/ui'

const SECTIONS = [
  {
    icon: Users,
    title: 'Eligibility',
    items: [
      'Open exclusively to students currently enrolled in undergraduate (UG) degree programmes.',
      'Each team must consist of exactly two participants: one Team Leader and one Team Partner.',
      'Every team must develop an application based on the single Social Impact theme.',
      'Participants must provide valid registration information — a valid college email and mobile number — and keep their registration ID.',
    ],
  },
  {
    icon: Users,
    title: 'Team participation rules',
    items: [
      'Teams are exactly two members: one Team Leader and one Team Partner, both named at registration.',
      'One registration per team, filed by the team leader.',
      'Team composition cannot change after the submission deadline without coordinator approval.',
      'Only the two registered members may present in the final round.',
      'A team may submit one project only, under the Social Impact theme.',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Project originality',
    items: [
      'No copy-pasting: copying and pasting code or content from existing applications, websites or other projects is strictly prohibited.',
      'Original content: all participants must develop their applications with unique and original content. Reusing identical content from other participants is not allowed.',
      'No existing projects: previously completed or currently working projects cannot be presented as submissions. Only applications newly developed for this event are permitted.',
      'Code understanding: every team member must understand the application’s source code and be prepared to explain its functionality, logic and implementation to the judges.',
      'Credited third-party libraries, APIs and open-source code are allowed and are not treated as prohibited copying — they must be credited in the submission.',
      'AI tools may assist (code, copy, design) but the team must be able to explain and defend every part of the submission.',
    ],
  },
  {
    icon: Scale,
    title: 'Submission guidelines',
    items: [
      'Register first, then submit through the Project Submission page before the published deadline.',
      'Supporting documents: PDF / DOC / PPT / ZIP / images / video, max 10 MB per file, max 5 files.',
      'Demo links must be live at judging time. A broken demo link counts against the technical score.',
      'Late submissions are not accepted unless the organisers extend the deadline publicly.',
    ],
  },
  {
    icon: Timer,
    title: 'Presentation & Q&A',
    items: [
      'Every participating team receives a total of 10 minutes for its final presentation and evaluation.',
      '7 minutes — Project presentation: explain the problem, proposed solution and application functionality, and demonstrate the working application.',
      '3 minutes — Questions & answers: respond to questions from the judges and explain the project’s technical implementation and decisions.',
      'Only the two registered team members may participate in the final presentation.',
    ],
  },
]

const CRITERIA = [
  { name: 'Social Impact and Relevance', marks: 25, detail: 'Who benefits, how many, and how real and meaningful the impact on the community is.' },
  { name: 'Innovation and Originality', marks: 15, detail: 'Is the idea new, and does it solve the problem in a fresh way?' },
  { name: 'Problem-solving Effectiveness', marks: 15, detail: 'Does the application actually address the social problem it set out to solve?' },
  { name: 'Functional Application', marks: 15, detail: 'Does it work? Completeness and reliability of the live demo.' },
  { name: 'UI/UX and User Experience', marks: 10, detail: 'Is the application clear, usable and well-designed for its intended users?' },
  { name: 'Technical Implementation', marks: 10, detail: 'Code quality, sound architecture and how well the team understands what they built.' },
  { name: 'Presentation and Scalability', marks: 10, detail: 'Can the team explain the project clearly, and can it grow beyond the prototype?' },
]

export default function Rules() {
  return (
    <>
      <PageHero
        eyebrow="Rules & Guidelines"
        title="Play fair. Build honestly."
        subtext="Read these before you register. By submitting, you agree to every rule on this page. Organisers’ decisions on eligibility and disqualification are final."
      />
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-4">
        {SECTIONS.map((s) => (
          <Card key={s.title} className="!p-7">
            <s.icon className="w-6 h-6 text-brand" />
            <h2 className="font-display text-3xl mt-4">{s.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70 leading-relaxed list-disc pl-5">
              {s.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </Card>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <SectionHead
          eyebrow="Evaluation criteria"
          title="How you are scored."
          sub="Every project is scored out of 100 across seven criteria by at least two judges. Shortlisted teams present live in the final round."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {CRITERIA.map((c) => (
            <Card key={c.name}>
              <p className="font-display text-4xl text-brand">{c.marks}</p>
              <h3 className="font-medium mt-3">{c.name}</h3>
              <p className="text-sm text-white/60 leading-relaxed mt-2">{c.detail}</p>
            </Card>
          ))}
          <Card className="!bg-[#111022] !border-white/10">
            <p className="font-display text-4xl text-brand">100</p>
            <h3 className="font-medium mt-3">Total marks</h3>
            <p className="text-sm text-white/60 leading-relaxed mt-2 flex items-end gap-2"><ListChecks className="w-4 h-4 text-brand shrink-0" /> Sum of all seven judging criteria.</p>
          </Card>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <Card className="!p-8 border-red-400/25">
          <AlertTriangle className="w-7 h-7 text-red-400" />
          <h2 className="font-display text-4xl mt-4">Disqualification rules</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70 leading-relaxed list-disc pl-5">
            <li>Plagiarism, misrepresentation of authorship, or submitting another team’s work.</li>
            <li>Copy-pasted code or content, or reusing content identical to another participant’s submission.</li>
            <li>Presenting a previously completed or currently working project that was not newly developed for this event.</li>
            <li>A team’s inability to explain their application’s source code, functionality, logic or implementation to the judges.</li>
            <li>Duplicate registrations to game shortlisting, or registering under false college / identity details.</li>
            <li>Offensive, discriminatory or unlawful content in the project, demo or presentation.</li>
            <li>Attempting to influence judges, or sharing confidential judging information.</li>
            <li>Missing the submission deadline or failing verification (registration ID + email).</li>
          </ul>
          <p className="text-sm text-white/50 mt-5">Disqualified teams forfeit prizes and certificates. The organisers may publish the reason in general terms; individual scores are not published.</p>
        </Card>
      </section>
    </>
  )
}
