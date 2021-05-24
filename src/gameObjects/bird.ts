import { GameObject } from '@eva/eva.js'
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation'

interface BirdPosition {
  x: number
  y: number
}

export default function createBird(position: BirdPosition) {
  const bird = new GameObject('bird', {
    size: {
      width: 86,
      height: 60,
    },
    position,
    anchor: {
      x: 0,
      y: 0,
    },
  })

  const anim = bird.addComponent(
    new SpriteAnimation({
      resource: 'bird',
      speed: 100,
    })
  )

  const playAnim = () => {
    anim.resource = 'bird'
  }

  return { bird, playAnim }
}
