import { GameObject } from '@eva/eva.js'
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation'
import { Physics, PhysicsType } from '@eva/plugin-matterjs'

interface BirdPosition {
  x: number
  y: number
}

export default class {
  bird: GameObject
  birdPhysics: Physics
  anim: SpriteAnimation

  constructor() {}
  init(position: BirdPosition) {
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

    this.bird = bird
    this.anim = anim
  }

  setPosition(pos: BirdPosition) {
    this.bird.transform.position = { ...pos }
  }

  jump() {
    setTimeout(() => {
      this.birdPhysics.body.force.y = -0.5
    }, 16)
  }

  playAnim() {
    this.anim.resource = 'bird'
  }

  initPhysics() {
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

    const physics = this.bird.addComponent(birdPhysics)

    physics.on('collisionStart', (body: GameObject, body1: GameObject) => {
      console.log(body, body1)
      switch (body.name) {
        case 'ground':
        case 'BarFaceTop':
        case 'BarFaceBottom':
          window.game.emit('on-game-over')
          break
        default:
          break
      }
    })

    this.birdPhysics = birdPhysics
  }
}
