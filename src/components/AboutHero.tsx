import { useEffect, useRef } from 'react'

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function createBowlPath(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
): void {
  const sideDepth = height * (0.42 + progress * 0.7)
  const centerDepth = height * (0.68 + progress * 0.54)

  context.beginPath()
  context.moveTo(-width * 0.12, 0)
  context.lineTo(width * 1.12, 0)
  context.lineTo(width * 1.12, sideDepth)
  context.bezierCurveTo(
    width * 0.97,
    sideDepth * 0.96,
    width * 0.84,
    centerDepth * 0.8,
    width * 0.64,
    centerDepth,
  )
  context.bezierCurveTo(
    width * 0.55,
    centerDepth * 1.04,
    width * 0.45,
    centerDepth * 1.04,
    width * 0.36,
    centerDepth,
  )
  context.bezierCurveTo(
    width * 0.16,
    centerDepth * 0.8,
    width * 0.03,
    sideDepth * 0.96,
    -width * 0.12,
    sideDepth,
  )
  context.closePath()
}

function drawHeroBackground(context: CanvasRenderingContext2D, width: number, height: number): void {
  const vertical = context.createLinearGradient(0, 0, 0, height)
  vertical.addColorStop(0, '#0b0714')
  vertical.addColorStop(0.48, '#1c0f3a')
  vertical.addColorStop(0.8, '#8f62e6')
  vertical.addColorStop(1, '#f1e8ff')
  context.fillStyle = vertical
  context.fillRect(0, 0, width, height)

  const leftGlow = context.createRadialGradient(width * 0.08, height * 0.08, 0, width * 0.08, height * 0.08, width * 0.7)
  leftGlow.addColorStop(0, 'rgba(166, 74, 255, 0.55)')
  leftGlow.addColorStop(1, 'rgba(166, 74, 255, 0)')
  context.fillStyle = leftGlow
  context.fillRect(0, 0, width, height)

  const rightGlow = context.createRadialGradient(width * 0.92, height * 0.08, 0, width * 0.92, height * 0.08, width * 0.7)
  rightGlow.addColorStop(0, 'rgba(112, 36, 216, 0.6)')
  rightGlow.addColorStop(1, 'rgba(112, 36, 216, 0)')
  context.fillStyle = rightGlow
  context.fillRect(0, 0, width, height)
}

function drawBowl(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
): void {
  const fill = context.createLinearGradient(0, 0, width, height)
  fill.addColorStop(0, 'rgba(166, 74, 255, 0.22)')
  fill.addColorStop(0.34, 'rgba(190, 157, 255, 0.38)')
  fill.addColorStop(0.68, 'rgba(201, 164, 255, 0.48)')
  fill.addColorStop(1, 'rgba(241, 232, 255, 0.72)')

  context.save()
  context.filter = `blur(${Math.max(18, width * 0.022)}px)`
  context.fillStyle = fill
  createBowlPath(context, width, height, progress)
  context.fill()
  context.restore()

  context.save()
  const atmosphere = context.createRadialGradient(width * 0.5, height * 0.3, 0, width * 0.5, height * 0.36, Math.max(width, height) * 0.78)
  atmosphere.addColorStop(0, 'rgba(166, 74, 255, 0.28)')
  atmosphere.addColorStop(0.42, 'rgba(201, 164, 255, 0.18)')
  atmosphere.addColorStop(1, 'rgba(201, 164, 255, 0)')
  createBowlPath(context, width, height, progress)
  context.clip()
  context.fillStyle = atmosphere
  context.fillRect(0, 0, width, height)
  context.restore()

  context.save()
  const rim = context.createLinearGradient(0, 0, width, 0)
  rim.addColorStop(0, 'rgba(166, 74, 255, 0)')
  rim.addColorStop(0.18, 'rgba(166, 74, 255, 0.2)')
  rim.addColorStop(0.5, 'rgba(255, 255, 255, 0.72)')
  rim.addColorStop(0.82, 'rgba(166, 74, 255, 0.2)')
  rim.addColorStop(1, 'rgba(166, 74, 255, 0)')
  context.filter = `blur(${Math.max(5, width * 0.006)}px)`
  context.strokeStyle = rim
  context.lineWidth = Math.max(1.5, width * 0.0018)
  createBowlPath(context, width, height, progress)
  context.stroke()
  context.restore()

  context.save()
  const reflection = context.createLinearGradient(0, 0, 0, height)
  reflection.addColorStop(0, 'rgba(255, 255, 255, 0.32)')
  reflection.addColorStop(0.42, 'rgba(255, 255, 255, 0.04)')
  reflection.addColorStop(1, 'rgba(255, 255, 255, 0)')
  context.globalCompositeOperation = 'screen'
  context.fillStyle = reflection
  createBowlPath(context, width, height, progress)
  context.fill()
  context.restore()
}

export default function AboutHero({ luminous = false }: { luminous?: boolean }) {
  const heroRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const hero = heroRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!hero || !canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0

    const render = (): void => {
      frame = 0
      const bounds = hero.getBoundingClientRect()
      const width = Math.max(1, bounds.width)
      const height = Math.max(1, bounds.height)
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * devicePixelRatio)
      canvas.height = Math.round(height * devicePixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      context.clearRect(0, 0, width, height)
      if (luminous) {
        drawHeroBackground(context, width, height)
      } else {
        context.fillStyle = '#fbfaff'
        context.fillRect(0, 0, width, height)
      }

      const progress = reducedMotion
        ? 0
        : clamp(window.scrollY / Math.max(hero.offsetHeight * 0.92, 1), 0, 1)
      drawBowl(context, width, height, progress)
    }

    const scheduleRender = (): void => {
      if (frame === 0) frame = window.requestAnimationFrame(render)
    }

    render()
    if (!reducedMotion) {
      window.addEventListener('scroll', scheduleRender, { passive: true })
    }
    window.addEventListener('resize', scheduleRender)

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleRender)
      window.removeEventListener('resize', scheduleRender)
    }
  }, [])

  return (
    <section ref={heroRef} className={`about-hero${luminous ? ' about-hero--luminous' : ''}`}>
      <canvas ref={canvasRef} className="about-hero__canvas" aria-hidden="true" />
      <div className="about-hero__content">
        <p className="about-hero__eyebrow">ABOUT APPTHON</p>
        <h1 className="about-hero__title">Technology meets possibility.</h1>
        <p className="about-hero__description">
          AppThon — From Idea to Impact is an inter-collegiate innovation and application competition. It exists for one reason: to give students a real stage to turn what they learn into what they can build.
        </p>
      </div>
    </section>
  )
}
