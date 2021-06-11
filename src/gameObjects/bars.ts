import { Game, GameObject } from '@eva/eva.js'
import { Physics, PhysicsType } from '@eva/plugin-matterjs'
import { Img } from '@eva/plugin-renderer-img'
import { TilingSprite } from '@eva/plugin-renderer-tiling-sprite'
import { Sprite } from '@eva/plugin-renderer-sprite'

type BarPosEnum = 'top' | 'bottom'

interface BarSprite {
  top: string
  bottom: string
}
interface Position {
  x: number
  y: number
}

interface RawPosition {
  top: Position
  bottom: Position
}

interface ContainerBounds {
  width: number
  height: number
}

export default class {
  sceneWidth: number
  sceneHeight: number
  game: Game
  moving: boolean
  bars: GameObject
  currTopBar: GameObject
  currBottomBar: GameObject

  constructor(sceneWidth: number, sceneHeight: number, game: Game) {
    this.sceneWidth = sceneWidth
    this.sceneHeight = sceneHeight
    this.game = game
  }

  init() {
    const { sceneWidth, sceneHeight } = this
    const bars = new GameObject('bars', {
      size: { width: sceneWidth, height: sceneHeight - 280 },
      position: {
        x: 0,
        y: 0,
      },
      anchor: {
        x: 0,
        y: 0,
      },
    })
    this.bars = bars
    // bars.addComponent(
    //   new Img({
    //     resource: 'blue',
    //   })
    // )
    this.create()
    return bars
  }

  pause() {
    this.moving = false
  }

  play() {
    this.moving = true
  }

  destroy() {
    this.moving = false
    // removePhysics(this.currTopBar)
    // removePhysics(this.currBottomBar)

    this.bars.removeChild(this.currTopBar)
    this.bars.removeChild(this.currBottomBar)
  }

  create() {
    const { sceneWidth, sceneHeight } = this
    const containerHeight = sceneHeight * 2 - 560
    const height = (containerHeight - 1000) / 2
    const container = {
      width: sceneWidth,
      height: containerHeight,
    }

    const barAtTop = createBar('BarFaceTop', 'top', height, container)
    const barAtBottom = createBar('BarFaceBottom', 'bottom', height, container)

    this.currTopBar = barAtTop
    this.currBottomBar = barAtBottom

    this.game.ticker.add((e: any) => {
      if (barAtTop && barAtBottom && this.moving) {
        removePhysics(barAtTop)
        removePhysics(barAtBottom)

        barAtTop.transform.position.x -= 1
        barAtBottom.transform.position.x -= 1

        addPhysics(barAtTop)
        addPhysics(barAtBottom)
      }
    })

    this.bars.addChild(barAtTop)
    this.bars.addChild(barAtBottom)
  }
}

function getRawPosition(
  pos: BarPosEnum,
  height: number,
  container: ContainerBounds
) {
  const rawPosition: RawPosition = {
    top: {
      x: container.width / 2,
      y: 0,
    },
    bottom: {
      x: container.width / 2,
      y: (container.height - height) / 2,
    },
  }
  return rawPosition[pos]
}

function createBar(
  name: string,
  pos: BarPosEnum,
  height: number,
  container: {
    width: number
    height: number
  }
) {
  const position = getRawPosition(pos, height, container)
  console.log(position)

  const spriteName: BarSprite = {
    bottom: 'bar.png',
    top: 'bar_r.png',
  }

  const bar = new GameObject(name, {
    size: { width: 80, height },
    position,
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

  bar.addComponent(
    new Sprite({
      resource: 'bar',
      spriteName: spriteName[pos],
    })
  )

  return bar
}

function addPhysics(gameObj: GameObject) {
  gameObj.addComponent(
    new Physics({
      type: PhysicsType.RECTANGLE,
      bodyOptions: {
        isStatic: true,
        frictionAir: 0,
        friction: 0,
        frictionStatic: 0,
        force: {
          x: 0,
          y: 0,
        },
      },
    })
  )
}

function removePhysics(gameObj: GameObject) {
  const p = gameObj.getComponent(Physics)
  if (p) {
    gameObj.removeComponent(Physics)
  }
}
