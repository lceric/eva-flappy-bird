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

  const birdPhysics = new Physics({
    type: PhysicsType.RECTANGLE,
    bodyOptions: {
      isStatic: false,
      // restitution: 0,
      frictionAir: 0.1,
      friction: 0.06,
      frictionStatic: 0.3,
      force: {
        x: 0,
        y: 0,
      },
      // stopRotation: true,
    },
  })

  function updateBirdPosition(game: any, pos: BirdPosition) {
    game.ticker.add(() => {
      bird.transform.position = { ...pos }
    })
  }

  function jump() {
    birdPhysics.body.force.y = -0.6
  }

  function initBirdPysics() {
    const physics = bird.addComponent(birdPhysics)

    physics.on('collisionStart', (body: GameObject, body1: GameObject) => {
      console.log(body, body1)
      if (body.name == 'ground') {
        window.game.emit('on-game-over')
      }
    })
  }

  return { bird, playAnim, updateBirdPosition, initBirdPysics, jump }
}
