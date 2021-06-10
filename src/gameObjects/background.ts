import { Game, GameObject } from '@eva/eva.js'
import { Physics, PhysicsType } from '@eva/plugin-matterjs'
import { Img } from '@eva/plugin-renderer-img'
import { TilingSprite } from '@eva/plugin-renderer-tiling-sprite'

export default function createBackground(
  sceneWidth: number,
  sceneHeight: number,
  game: Game
) {
  const bg = new GameObject('bg', {
    size: { width: sceneWidth, height: sceneHeight },
    origin: { x: 0.5, y: 1 },
    position: {
      x: 0,
      y: 0,
    },
    anchor: {
      x: 0.5,
      y: 1,
    },
  })

  bg.addComponent(
    new Img({
      resource: 'bg',
    })
  )

  const ground = new GameObject('ground', {
    size: { width: sceneWidth * 2, height: 560 },
    position: { x: 0, y: 0 },
    anchor: {
      x: 0,
      y: 1,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    },
    scale: { x: 1, y: 1 }, // 缩放比例
  })

  const groundTilingSprite = new TilingSprite({
    resource: 'ground',
    tileScale: { x: 1, y: 1 },
    tilePosition: { x: 0, y: 0 },
  })

  ground.addComponent(groundTilingSprite)
  ground.addComponent(
    new Physics({
      type: PhysicsType.RECTANGLE,
      bodyOptions: {
        isStatic: true,
      },
    })
  )

  bg.addChild(ground)

  game.ticker.add(() => {
    groundTilingSprite.tilePosition.x -= 1
  })

  return bg
}
