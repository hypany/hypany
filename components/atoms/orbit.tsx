interface OrbitingObjectProps {
  /** Radius of the orbit in pixels */
  radiusPx?: number
  /** Center element */
  children: React.ReactNode
  /** Array of elements to orbit around the center */
  orbitingObjects: React.ReactNode[]
  /** Default size of orbiting objects (in pixels) for positioning */
  defaultObjectSize?: number
  /** Duration of one complete orbit in seconds */
  durationSeconds?: number
  /** Keep orbiting upright */
  keepUpright?: boolean
}

export const Orbit = ({
  radiusPx = 144,
  children,
  orbitingObjects = [],
  defaultObjectSize = 32,
  durationSeconds = 8,
  keepUpright = false,
}: OrbitingObjectProps) => {
  const orbitDiameter = radiusPx * 2
  const containerSize = orbitDiameter + defaultObjectSize
  const initialOffset = radiusPx + defaultObjectSize / 2

  const positionedObjects = orbitingObjects.map((object, index) => {
    const delaySeconds = -(index * (durationSeconds / orbitingObjects.length))

    return (
      <div
        key={index}
        className='absolute flex items-center justify-center'
        style={{
          animationDelay: `${delaySeconds}s`,
          animationDuration: `${durationSeconds}s`,
          animationIterationCount: 'infinite',
          animationName: 'spin',
          animationTimingFunction: 'linear',
          height: `${defaultObjectSize}px`,
          left: `calc(50% - ${initialOffset}px)`,
          top: `calc(50% - ${defaultObjectSize / 2}px)`,
          transformOrigin: `calc(50% + ${radiusPx}px) 50%`,
          width: `${defaultObjectSize}px`,
        }}
      >
        {/* Counter-rotating container to keep object upright */}
        <div
          className='flex h-full w-full items-center justify-center'
          style={
            keepUpright
              ? {
                  animationDelay: `${delaySeconds}s`,
                  animationDirection: 'reverse',
                  animationDuration: `${durationSeconds}s`,
                  animationIterationCount: 'infinite',
                  animationName: 'spin',
                  animationTimingFunction: 'linear',
                }
              : undefined
          }
        >
          {object}
        </div>
      </div>
    )
  })

  return (
    <div
      className='relative flex items-center justify-center'
      style={{
        height: `${containerSize}px`,
        width: `${containerSize}px`,
      }}
    >
      {/* Orbital path */}
      <div
        className='absolute animate-pulse rounded-full border border-gray-300 bg-gray-500/5'
        style={{
          height: `${orbitDiameter}px`,
          width: `${orbitDiameter}px`,
        }}
      />

      {/* Orbiting objects */}
      {positionedObjects}

      {/* Center object (children) */}
      {children}
    </div>
  )
}
