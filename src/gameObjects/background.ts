import { Game, GameObject } from '@eva/eva.js'
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

  const ground = new GameObject('sprite', {
    size: { width: sceneWidth, height: 300 },
    position: { x: 0, y: sceneHeight - 300 },
  })

  const groundTilingSprite = new TilingSprite({
    resource: 'ground',
    tileScale: { x: 1, y: 1.1 },
    tilePosition: { x: 0, y: 0 },
  })

  ground.addComponent(groundTilingSprite)

  bg.addChild(ground)

  game.ticker.add(() => {
    groundTilingSprite.tilePosition.x -= 1
  })

  return bg
}
