import createBackground from './gameObjects/background'
import createReadyPanel from './gameObjects/ready/penel'
import createBird from './gameObjects/bird'
// import createBasketFront from './gameObjects/board/basketFront'
// import createBoard from './gameObjects/board/board'
// import createBall from './gameObjects/ball'
// import createBtn from './gameObjects/btn'
import resources from './resources'

import { Game, resource } from '@eva/eva.js'
import { RendererSystem } from '@eva/plugin-renderer'
import { ImgSystem } from '@eva/plugin-renderer-img'
import { EventSystem } from '@eva/plugin-renderer-event'
import { SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation'
import { RenderSystem } from '@eva/plugin-renderer-render'
import { TransitionSystem } from '@eva/plugin-transition'
import { GraphicsSystem } from '@eva/plugin-renderer-graphics'
import { TextSystem } from '@eva/plugin-renderer-text'
import { SpriteSystem } from '@eva/plugin-renderer-sprite'
import {
  TilingSpriteSystem,
} from '@eva/plugin-renderer-tiling-sprite'

resource.addResource(resources)

const canvasEl: HTMLElement = document.querySelector('#canvas')
const canvasWidth = canvasEl.offsetWidth
const canvasHeight = canvasEl.offsetHeight
const sceneWidth = 750
const sceneHeight = (canvasHeight / canvasWidth) * 750

const game = new Game({
  frameRate: 60,
  // autoStart: false,
  systems: [
    new RendererSystem({
      canvas: canvasEl,
      width: sceneWidth,
      height: sceneHeight,
      transparent: true,
      resoution: 0.5,
    }),
    new ImgSystem(),
    new TransitionSystem(),
    new SpriteSystem(),
    new SpriteAnimationSystem(),
    new RenderSystem(),
    new EventSystem(),
    new GraphicsSystem(),
    new TextSystem(),
    new TilingSpriteSystem(),
  ],
})

game.scene.transform.size.width = sceneWidth
game.scene.transform.size.height = sceneHeight

const pos = {
  x: 500,
  y: 1100,
}

const birdPosition = {
  x: 100,
  y: 660,
}

const readyPanel = createReadyPanel()
const { bird } = createBird(birdPosition)
// const ball = createBall(pos)
// const { basetFront, playAnim } = createBasketFront()
// const btn = createBtn({
//   text: '投球',
//   transform: {
//     position: {
//       x: 0,
//       y: -120,
//     },
//     origin: {
//       x: 0.5,
//       y: 0.5,
//     },
//     anchor: {
//       x: 0.5,
//       y: 1,
//     },
//   },
//   callback: () => {
//     alert('还没做呢～一起来完善吧')
//   },
// })
game.scene.addChild(createBackground(sceneWidth, sceneHeight, game))
game.scene.addChild(bird)
game.scene.addChild(readyPanel)

window.game = game
