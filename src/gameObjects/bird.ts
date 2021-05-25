import { GameObject } from '@eva/eva.js'
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation'
import { Physics, PhysicsType } from '@eva/plugin-matterjs'

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
    origin: {
      x: 0.5,
      y: 0.5,
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

  function updateBirdPosition(game: any, pos: BirdPosition) {
    game.ticker.add(() => {
    })
    bird.transform.position = pos
  }

  function initBirdPysics() {
    const physics = bird.addComponent(
      new Physics({
        type: PhysicsType.RECTANGLE,
        bodyOptions: {
          isStatic: false,
          // restitution: 0.4,
          // density: 0.002,
        },
      })
    )

    physics.on('collisionStart', (body: GameObject, body1: GameObject, body2: GameObject) => {
      console.log(body, body1, body2)
    })
  }

  return { bird, playAnim, updateBirdPosition, initBirdPysics }
}
