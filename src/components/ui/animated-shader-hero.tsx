import React, { useEffect, useRef } from 'react'

// Types for component props
interface HeroProps {
  trustBadge?: {
    text: string
    icons?: string[]
  }
  headline: {
    line1: string
    line2: string
  }
  subtitle: string
  buttons?: {
    primary?: {
      text: string
      onClick?: () => void
    }
    secondary?: {
      text: string
      onClick?: () => void
    }
  }
  className?: string
}

// Keep GPU resources scoped to this canvas, including failed setup and context recovery.
class WebGLRenderer {
  private canvas: HTMLCanvasElement
  private gl: WebGL2RenderingContext
  private program: WebGLProgram | null = null
  private vs: WebGLShader | null = null
  private fs: WebGLShader | null = null
  private buffer: WebGLBuffer | null = null
  private resolution: WebGLUniformLocation | null = null
  private time: WebGLUniformLocation | null = null

  constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
    this.canvas = canvas
    this.gl = gl
  }

  private compile(type: number, source: string) {
    const gl = this.gl
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('Shader background unavailable:', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }
    return shader
  }

  init() {
    const gl = this.gl
    this.reset()
    this.vs = this.compile(gl.VERTEX_SHADER, `#version 300 es
in vec4 position;
void main() { gl_Position = position; }`)
    this.fs = this.compile(gl.FRAGMENT_SHADER, defaultShaderSource)
    this.program = gl.createProgram()
    if (!this.vs || !this.fs || !this.program) {
      this.reset()
      return false
    }
    gl.attachShader(this.program, this.vs)
    gl.attachShader(this.program, this.fs)
    gl.linkProgram(this.program)
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.warn('Shader background unavailable:', gl.getProgramInfoLog(this.program))
      this.reset()
      return false
    }

    this.buffer = gl.createBuffer()
    if (!this.buffer) {
      this.reset()
      return false
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(this.program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    this.resolution = gl.getUniformLocation(this.program, 'resolution')
    this.time = gl.getUniformLocation(this.program, 'time')
    return true
  }

  resize() {
    // Canvas dimensions already include the rendering scale; do not apply DPR twice.
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
  }

  render(elapsed: number) {
    if (!this.program) return
    const gl = this.gl
    gl.useProgram(this.program)
    gl.uniform2f(this.resolution, this.canvas.width, this.canvas.height)
    gl.uniform1f(this.time, elapsed * 1e-3)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  reset() {
    const gl = this.gl
    if (this.buffer) gl.deleteBuffer(this.buffer)
    if (this.program) gl.deleteProgram(this.program)
    if (this.vs) gl.deleteShader(this.vs)
    if (this.fs) gl.deleteShader(this.fs)
    this.buffer = null
    this.program = null
    this.vs = null
    this.fs = null
    this.resolution = null
    this.time = null
  }
}

const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl2', { antialias: false, depth: false })
    if (!gl) return // Keep the existing CSS background when WebGL2 is unavailable.

    const renderer = new WebGLRenderer(canvas, gl)
    if (!renderer.init()) return
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = motionPreference.matches
    let inView = typeof IntersectionObserver === 'undefined'
    let contextLost = false
    let animationFrame = 0
    let previousTime: number | null = null
    let elapsed = 0

    const stop = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = 0
      previousTime = null
    }
    const loop = (now: number) => {
      if (previousTime !== null) elapsed += now - previousTime
      previousTime = now
      renderer.render(elapsed)
      animationFrame = requestAnimationFrame(loop)
    }
    const syncAnimation = () => {
      stop()
      if (contextLost) return
      if (reducedMotion) {
        renderer.render(elapsed) // Preserve the artwork as a still frame.
      } else if (inView && !document.hidden) {
        animationFrame = requestAnimationFrame(loop)
      }
    }
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      // This decorative shader renders below full retina resolution to bound GPU work.
      const scale = Math.min(2, Math.max(1, window.devicePixelRatio * 0.5))
      const pixelWidth = Math.max(1, Math.round(width * scale))
      const pixelHeight = Math.max(1, Math.round(height * scale))
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth
        canvas.height = pixelHeight
      }
      if (!contextLost) {
        renderer.resize()
        renderer.render(elapsed)
      }
    }
    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches
      syncAnimation()
    }
    const onContextLost = (event: Event) => {
      event.preventDefault()
      contextLost = true
      stop()
      renderer.reset()
    }
    const onContextRestored = () => {
      contextLost = !renderer.init()
      if (contextLost) return
      resize()
      syncAnimation()
    }

    const intersectionObserver = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting
          syncAnimation()
        })
      : null
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
    intersectionObserver?.observe(canvas)
    resizeObserver?.observe(canvas)
    motionPreference.addEventListener('change', onMotionChange)
    document.addEventListener('visibilitychange', syncAnimation)
    canvas.addEventListener('webglcontextlost', onContextLost)
    canvas.addEventListener('webglcontextrestored', onContextRestored)
    window.addEventListener('resize', resize)
    resize()
    syncAnimation()

    return () => {
      stop()
      intersectionObserver?.disconnect()
      resizeObserver?.disconnect()
      motionPreference.removeEventListener('change', onMotionChange)
      document.removeEventListener('visibilitychange', syncAnimation)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)
      window.removeEventListener('resize', resize)
      renderer.reset()
    }
  }, [])

  return canvasRef
}

/**
 * Just the animated shader canvas — for embedding behind existing content
 * (e.g. as a section background) instead of using the full-screen Hero.
 */
export const ShaderBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useShaderBackground()
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

const trustIconColors = ['text-yellow-300', 'text-orange-300', 'text-amber-300']

// Reusable Hero Component
const Hero: React.FC<HeroProps> = ({ trustBadge, headline, subtitle, buttons, className = '' }) => {
  const canvasRef = useShaderBackground()

  return (
    <div className={`relative h-screen w-full overflow-hidden bg-black ${className}`}>
      <style>{`
        @keyframes hero-fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-animate-fade-in-down { animation: hero-fade-in-down 0.8s ease-out forwards; }
        .hero-animate-fade-in-up { animation: hero-fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .hero-animation-delay-200 { animation-delay: 0.2s; }
        .hero-animation-delay-400 { animation-delay: 0.4s; }
        .hero-animation-delay-600 { animation-delay: 0.6s; }
        .hero-animation-delay-800 { animation-delay: 0.8s; }
      `}</style>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none object-contain"
        style={{ background: 'black' }}
        aria-hidden="true"
      />

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        {/* Trust Badge */}
        {trustBadge && (
          <div className="hero-animate-fade-in-down mb-8">
            <div className="flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-500/10 px-6 py-3 text-sm backdrop-blur-md">
              {trustBadge.icons && (
                <div className="flex">
                  {trustBadge.icons.map((icon, index) => (
                    <span key={index} className={trustIconColors[index % trustIconColors.length]}>
                      {icon}
                    </span>
                  ))}
                </div>
              )}
              <span className="text-orange-100">{trustBadge.text}</span>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-5xl space-y-6 px-4 text-center">
          {/* Main Heading with Animation */}
          <div className="space-y-2">
            <h1 className="hero-animate-fade-in-up hero-animation-delay-200 bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-5xl font-bold text-transparent md:text-7xl lg:text-8xl">
              {headline.line1}
            </h1>
            <h1 className="hero-animate-fade-in-up hero-animation-delay-400 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl lg:text-8xl">
              {headline.line2}
            </h1>
          </div>

          {/* Subtitle with Animation */}
          <div className="hero-animate-fade-in-up hero-animation-delay-600 mx-auto max-w-3xl">
            <p className="text-lg font-light leading-relaxed text-orange-100/90 md:text-xl lg:text-2xl">
              {subtitle}
            </p>
          </div>

          {/* CTA Buttons with Animation */}
          {buttons && (
            <div className="hero-animate-fade-in-up hero-animation-delay-800 mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              {buttons.primary && (
                <button
                  onClick={buttons.primary.onClick}
                  className="rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-yellow-600 hover:shadow-xl hover:shadow-orange-500/25"
                >
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <button
                  onClick={buttons.secondary.onClick}
                  className="rounded-full border border-orange-300/30 bg-orange-500/10 px-8 py-4 text-lg font-semibold text-orange-100 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-orange-300/50 hover:bg-orange-500/20"
                >
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const defaultShaderSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*
*	To explore strange new worlds, to seek out new life
*	and new civilizations, to boldly go where no man has
*	gone before.
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
// Returns a pseudo random number for a given point (white noise)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
// Returns a pseudo random number for a given point (value noise)
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
// Returns a pseudo random number for a given point (fractal noise)
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}
void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.5,-st.y));
	uv*=1.-.3*(sin(T*.2)*.5+.5);
	for (float i=1.; i<12.; i++) {
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
		float b=noise(i+p+bg*1.731);
		col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
		col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
	}
	O=vec4(col,1);
}`

export default Hero
