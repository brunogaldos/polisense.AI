'use client'

import { useEffect, useRef } from 'react'

export default function TerritoryLayers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    if (!containerRef.current || !sceneRef.current) return

    const layers = document.querySelectorAll('.layer')
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const frame = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
      const ep = ease(Math.min(scrollProgress / 0.80, 1))

      layers.forEach((el, i) => {
        const layer = el as HTMLElement
        const baseZ = i * 120
        const additionalZ = i * 180 * ep
        layer.style.transform = `translateZ(${baseZ + additionalZ}px)`
        layer.style.opacity = '1'
        el.classList.toggle('open', i > 0 || ep > 0.10)
      })

      animationFrameRef.current = requestAnimationFrame(frame)
    }

    // Show scene after mount
    requestAnimationFrame(() => {
      if (sceneRef.current) {
        sceneRef.current.classList.add('show')
      }
    })

    animationFrameRef.current = requestAnimationFrame(frame)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;500;700&display=swap');

        #stage {
          position: sticky;
          top: 0;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: transparent;
        }

        #persp {
          perspective: 1200px;
          perspective-origin: 50% 45%;
        }

        #scene {
          position: relative;
          width: 700px;
          height: 950px;
          transform-style: preserve-3d;
          transform: rotateX(15deg) rotateZ(-30deg) scale(0.7);
          opacity: 0;
          transition: opacity 1.2s ease 0.2s;
        }

        #scene.show {
          opacity: 1;
        }

        .layer {
          position: absolute;
          width: 700px;
          height: 950px;
          top: 0;
          left: 0;
          transform-style: preserve-3d;
          will-change: transform;
          transform: translateZ(0px);
        }

        .lf {
          width: 100%;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          overflow: hidden;
          background: transparent;
          position: relative;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lf img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .llabel {
          position: absolute;
          right: calc(100% + 15px);
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .layer.open .llabel {
          opacity: 1;
        }

        .ll-line {
          width: 30px;
          height: 1px;
          background: rgba(255, 255, 255, 0.4);
          flex-shrink: 0;
        }

        .ll-text {
          text-align: right;
        }

        .ll-n {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          font-weight: 700;
          font-style: italic;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.85);
          display: block;
          text-transform: uppercase;
        }

        .ll-s {
          font-size: 9px;
          font-weight: 400;
          font-style: italic;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.45);
          display: block;
          margin-top: 2px;
        }
      `}</style>

      <div id="stage">
        <div id="persp">
          <div id="scene" ref={sceneRef}>
            <div className="layer" id="l0">
              <div className="lf">
                <img src="/svg-example.svg" alt="Territory Layers" />
              </div>
              <div className="llabel">
                <div className="ll-line"></div>
                <div className="ll-text">
                  <span className="ll-n">Terrain</span>
                  <span className="ll-s">Elevation contours</span>
                </div>
              </div>
            </div>

            <div className="layer" id="l1">
              <div className="lf" style={{ background: 'rgba(255, 240, 240, 0.85)' }}>
              </div>
              <div className="llabel">
                <div className="ll-line"></div>
                <div className="ll-text">
                  <span className="ll-n">Hydrology</span>
                  <span className="ll-s">River networks</span>
                </div>
              </div>
            </div>

            <div className="layer" id="l2">
              <div className="lf" style={{ background: 'rgba(245, 245, 250, 0.75)' }}>
              </div>
              <div className="llabel">
                <div className="ll-line"></div>
                <div className="ll-text">
                  <span className="ll-n">Infrastructure</span>
                  <span className="ll-s">Roads and rail</span>
                </div>
              </div>
            </div>

            <div className="layer" id="l3">
              <div className="lf" style={{ background: 'rgba(240, 245, 255, 0.80)' }}>
              </div>
              <div className="llabel">
                <div className="ll-line"></div>
                <div className="ll-text">
                  <span className="ll-n">Urban</span>
                  <span className="ll-s">Building density</span>
                </div>
              </div>
            </div>

            <div className="layer" id="l4">
              <div className="lf" style={{ background: 'rgba(240, 255, 245, 0.75)' }}>
              </div>
              <div className="llabel">
                <div className="ll-line"></div>
                <div className="ll-text">
                  <span className="ll-n">Landscape</span>
                  <span className="ll-s">Green spaces</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
