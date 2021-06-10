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

export default function buildBars(
  sceneWidth: number,
  sceneHeight: number,
  game: Game
) {
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
  // bars.addComponent(
  //   new Img({
  //     resource: 'blue',
  //   })
  // )
  const containerHeight = sceneHeight * 2 - 560
  const height = (containerHeight - 1000) / 2
  const container = {
    width: sceneWidth,
    height: containerHeight,
  }

  const barAtTop = buildBar('BarFaceTop', 'top', height, container)
  const barAtBottom = buildBar('BarFaceBottom', 'bottom', height, container)

  const phyTop = barAtTop.getComponent(Physics)
  const phyBottom = barAtBottom.getComponent(Physics)
  console.log(phyTop)
  game.ticker.add((e: any) => {
    // phyTop.body.velocity.x += 1
    // phyTop.body.velocity.x -= 1
    phyTop.body.position.x -= 1
    barAtTop.transform.position.x -= 1
    // phyBottom.body.position.x -= 1
    // barAtBottom.transform.position.x -= 1
  })
  bars.addChild(barAtTop)
  bars.addChild(barAtBottom)

  return bars
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

function buildBar(
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

  bar.addComponent(
    new Physics({
      type: PhysicsType.RECTANGLE,
      bodyOptions: {
        isStatic: true,
        restitution: 0.4,
        density: 0.002,
        // restitution: 0.1,
        // frictionAir: 0,
        // friction: 0,
        // frictionStatic: 0,
        // force: {
        //   x: 0,
        //   y: 0,
        // },
      },
    })
  )
  return bar
}
