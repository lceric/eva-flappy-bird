import { Game, GameObject } from '@eva/eva.js'
import { Physics, PhysicsType } from '@eva/plugin-matterjs'
import { Img } from '@eva/plugin-renderer-img'
import { Sprite } from '@eva/plugin-renderer-sprite'
import Matter from 'matter-js'

import Enemy from '../components/Enemy'
import Move from '../components/Move'
import GameComponent from '../components/Game'

const sceneWidth = 750
const sceneHeight = 750 * (window.innerHeight / window.innerWidth)

interface BarSprite {
  top: string
  bottom: string
}

const spriteName: PipeSprite = {
  bottom: 'bar.png',
  top: 'bar_r.png',
}

/**
 * 创建一个流水线
 * @returns nextPipe Fn
 */
export function createNextPipeFactor() {
  const mem: Array<GameObject> = []

  return (): GameObject => {
    if (mem.length) return mem.shift()
    const [top, bottom] = createPipeGroup()
    mem.push(bottom)
    return top
  }
}

export const nextPipe = createNextPipeFactor()

/**
 * 创建一组管道
 * @returns [top, bottom]
 */
export default function createPipeGroup() {
  const { height, restHeight, containerWidth, offsetHeight, containerHeight } =
    genPipeGroupSize()
  // const padHeight = Math.random
  const top = createPipe(restHeight, containerWidth, 0, 'top')
  const bottom = createPipe(
    height,
    containerWidth,
    containerHeight - restHeight + offsetHeight / 2,
    'bottom'
  )
  return [top, bottom]
}

export function createPipe(
  height: number,
  containerWidth: number,
  y: number,
  distance: string
) {
  // const containerHeight = sceneHeight * 2 - 560
  // const container = {
  //   width: sceneWidth,
  //   height: containerHeight,
  // }

  // const offsetHeight = Math.random() * 330
  // const height = (containerHeight - 1000 - offsetHeight) / 2
  console.log(arguments)
  const pipe = new GameObject('pipe', {
    size: { width: 80, height: height },
    position: {
      x: containerWidth + 80,
      y: y / 2,
    },
    anchor: {
      x: 0,
      y: 0,
      // y: pos == 'top' ? 0 : 1,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    },
    scale: { x: 1, y: 1 }, // 缩放比例
  })

  pipe.addComponent(
    new Sprite({
      resource: 'bar',
      spriteName: spriteName[distance],
    })
  )

  const physics = new Physics({
    type: PhysicsType.RECTANGLE,
    bodyOptions: {
      isStatic: true, // Whether the object is still, any force acting on the object in a static state will not produce any effect
      restitution: 0,
      frictionAir: 0,
      friction: 0,
      frictionStatic: 0,
      force: {
        x: 0,
        y: 0,
      },
      stopRotation: true, // default false, usually do not need to be set
    },
  })
  const pipePhysics = pipe.addComponent(physics)

  pipePhysics.on('collisionStart', (body, gameObject1, gameObject2) => {
    console.log(body, gameObject1)
  })

  const gameComponent: GameComponent = new GameComponent()
  console.log(gameComponent)

  pipe.addComponent(new Enemy(distance))
  pipe.addComponent(new Move())
  pipe.addComponent(gameComponent)

  return pipe
}

export function genPipeGroupSize() {
  const containerHeight = sceneHeight * 2 - 560
  const containerWidth = sceneWidth
  const container = {
    width: sceneWidth,
    height: containerHeight,
  }

  const offsetHeight = Math.random() * 330 + 330
  const height = (containerHeight - 1000 - offsetHeight) / 2

  const restHeight = (containerHeight - 1000) / 2

  return {
    height,
    restHeight,
    containerHeight,
    containerWidth,
    sceneWidth,
    sceneHeight,
    container,
    offsetHeight,
  }
}
