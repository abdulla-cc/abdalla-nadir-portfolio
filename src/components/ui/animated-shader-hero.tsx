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

type Vec2 = [number, number]

// WebGL Renderer class
class WebGLRenderer {
  private canvas: HTMLCanvasElement
  private gl: WebGL2RenderingContext
  private program: WebGLProgram | null = null
  private vs: WebGLShader | null = null
  private fs: WebGLShader | null = null
  private buffer: WebGLBuffer | null = null
  private shaderSource: string
  private mouseMove: Vec2 = [0, 0]
  private mouseCoords: Vec2 = [0, 0]
  private pointerCoords: number[] = [0, 0]
  private nbrOfPointers = 0
  private uniforms: Record<string, WebGLUniformLocation | null> = {}

  private vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

  private vertices = [-1, 1, -1, -1, 1, 1, 1, -1]

  constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, scale: number) {
    this.canvas = canvas
    this.gl = gl
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale)
    this.shaderSource = defaultShaderSource
  }

  updateShader(source: string) {
    this.reset()
    this.shaderSource = source
    this.setup()
    this.init()
  }

  updateMove(deltas: Vec2) {
    this.mouseMove = deltas
  }

  updateMouse(coords: Vec2) {
    this.mouseCoords = coords
  }

  updatePointerCoords(coords: number[]) {
    this.pointerCoords = coords
  }

  updatePointerCount(nbr: number) {
    this.nbrOfPointers = nbr
  }

  updateScale(scale: number) {
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale)
  }

  compile(shader: WebGLShader, source: string) {
    const gl = this.gl
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
    }
  }

  test(source: string) {
    let result = null
    const gl = this.gl
    const shader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader)
    }
    gl.deleteShader(shader)
    return result
  }

  reset() {
    const gl = this.gl
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) {
        gl.detachShader(this.program, this.vs)
        gl.deleteShader(this.vs)
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs)
        gl.deleteShader(this.fs)
      }
      gl.deleteProgram(this.program)
    }
  }

  setup() {
    const gl = this.gl
    this.vs = gl.createShader(gl.VERTEX_SHADER)!
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!
    this.compile(this.vs, this.vertexSrc)
    this.compile(this.fs, this.shaderSource)
    this.program = gl.createProgram()!
    gl.attachShader(this.program, this.vs)
    gl.attachShader(this.program, this.fs)
    gl.linkProgram(this.program)

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program))
    }
  }

  init() {
    const gl = this.gl
    const program = this.program!

    this.buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    for (const name of ['resolution', 'time', 'move', 'touch', 'pointerCount', 'pointers']) {
      this.uniforms[name] = gl.getUniformLocation(program, name)
    }
  }

  render(now = 0) {
    const gl = this.gl
    const program = this.program

    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)

    gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height)
    gl.uniform1f(this.uniforms.time, now * 1e-3)
    gl.uniform2f(this.uniforms.move, this.mouseMove[0], this.mouseMove[1])
    gl.uniform2f(this.uniforms.touch, this.mouseCoords[0], this.mouseCoords[1])
    gl.uniform1i(this.uniforms.pointerCount, this.nbrOfPointers)
    gl.uniform2fv(this.uniforms.pointers, this.pointerCoords)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}

// Pointer Handler class
class PointerHandler {
  private scale: number
  private active = false
  private pointers = new Map<number, Vec2>()
  private lastCoords: Vec2 = [0, 0]
  private moves: Vec2 = [0, 0]

  constructor(element: HTMLCanvasElement, scale: number) {
    this.scale = scale

    const map = (el: HTMLCanvasElement, s: number, x: number, y: number): Vec2 => [
      x * s,
      el.height - y * s,
    ]

    element.addEventListener('pointerdown', e => {
      this.active = true
      this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY))
    })

    const release = (e: PointerEvent) => {
      if (this.count === 1) this.lastCoords = this.first
      this.pointers.delete(e.pointerId)
      this.active = this.pointers.size > 0
    }
    element.addEventListener('pointerup', release)
    element.addEventListener('pointerleave', release)

    element.addEventListener('pointermove', e => {
      if (!this.active) return
      this.lastCoords = [e.clientX, e.clientY]
      this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY))
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY]
    })
  }

  updateScale(scale: number) {
    this.scale = scale
  }

  get count() {
    return this.pointers.size
  }

  get move(): Vec2 {
    return this.moves
  }

  get coords(): number[] {
    return this.pointers.size > 0 ? Array.from(this.pointers.values()).flat() : [0, 0]
  }

  get first(): Vec2 {
    return this.pointers.values().next().value ?? this.lastCoords
  }
}

// Reusable Shader Background Hook
const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl2')
    if (!gl) return // WebGL2 unsupported — leave the plain background

    let animationFrame = 0
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio)
    const renderer = new WebGLRenderer(canvas, gl, dpr)
    const pointers = new PointerHandler(canvas, dpr)

    renderer.setup()
    renderer.init()

    const resize = () => {
      const scale = Math.max(1, 0.5 * window.devicePixelRatio)
      canvas.width = window.innerWidth * scale
      canvas.height = window.innerHeight * scale
      renderer.updateScale(scale)
      pointers.updateScale(scale)
    }
    resize()

    if (renderer.test(defaultShaderSource) === null) {
      renderer.updateShader(defaultShaderSource)
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const loop = (now: number) => {
      renderer.updateMouse(pointers.first)
      renderer.updatePointerCount(pointers.count)
      renderer.updatePointerCoords(pointers.coords)
      renderer.updateMove(pointers.move)
      renderer.render(now)
      if (!reducedMotion) animationFrame = requestAnimationFrame(loop)
    }
    animationFrame = requestAnimationFrame(loop)

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
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
