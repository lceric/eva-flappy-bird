import createBackground from './gameObjects/background'
import createReadyPanel from './gameObjects/ready/penel'
import createBird from './gameObjects/bird'
// import createBasketFront from './gameObjects/board/basketFront'
// import createBoard from './gameObjects/board/board'
// import createBall from './gameObjects/ball'
// import createBtn from './gameObjects/btn'
import resources from './resources'

import { Game, GameObject, resource } from '@eva/eva.js'
import { RendererSystem } from '@eva/plugin-renderer'
import { ImgSystem } from '@eva/plugin-renderer-img'
import { Event, EventSystem, HIT_AREA_TYPE } from '@eva/plugin-renderer-event'
import { SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation'
import { RenderSystem } from '@eva/plugin-renderer-render'
import { TransitionSystem } from '@eva/plugin-transition'
import { GraphicsSystem } from '@eva/plugin-renderer-graphics'
import { TextSystem } from '@eva/plugin-renderer-text'
import { SpriteSystem } from '@eva/plugin-renderer-sprite'
import { TilingSpriteSystem } from '@eva/plugin-renderer-tiling-sprite'
import { PhysicsSystem, Physics, PhysicsType } from '@eva/plugin-matterjs'

resource.addResource(resources)

const canvasEl: HTMLElement = document.querySelector('#canvas')
const canvasWidth = canvasEl.offsetWidth
const canvasHeight = canvasEl.offsetHeight
const sceneWidth = 750
const sceneHeight = (canvasHeight / canvasWidth) * 750

const game = new Game({
  frameRate: 70, // 兼容Eva自身bug, 帧率必须大于60
  // autoStart: false,
  systems: [
    new RendererSystem({
      canvas: canvasEl,
      width: sceneWidth,
      height: sceneHeight,
      transparent: true,
      resolution: window.devicePixelRatio / 2,
    }),
    new ImgSystem(),
    new TransitionSystem(),
    new SpriteSystem(),
    new SpriteAnimationSystem(),
    new RenderSystem(),
    new EventSystem(),
    new GraphicsSystem(),
    new PhysicsSystem({
      resolution: window.devicePixelRatio / 2,
      // isTest: true, // 是否开启调试模式
      // element: document.getElementById('game-container'), // 调试模式下canvas节点的挂载点
      // isTest: true, // 是否开启调试模式
      // element: document.getElementById('container'), // 调试模式下canvas节点的挂载点
      world: {
        gravity: {
          y: 5, // 重力
        },
      },
    }),
    new TextSystem(),
    new TilingSpriteSystem(),
  ],
})

game.scene.transform.size.width = sceneWidth
game.scene.transform.size.height = sceneHeight

let readyPanelHidden = false
let birdPosition = {
  x: 100,
  y: 660,
}

const background = createBackground(sceneWidth, sceneHeight, game)
const readyPanel = createReadyPanel()
const { bird, updateBirdPosition, initBirdPysics } = createBird(birdPosition)

const evt = background.addComponent(
  new Event({
    type: HIT_AREA_TYPE.Rect,
  })
)

evt.on('tap', (e: TouchEvent) => {
  const { x, y } = birdPosition

  birdPosition = {
    x: x,
    y: y - 20,
  }

  updateBirdPosition(game, birdPosition)

  if (!readyPanelHidden) {
    readyPanelHidden = true
    readyPanel.animation.play('hidden', 1)
    initBirdPysics()
  }
})

game.scene.addChild(background)
game.scene.addChild(bird)
game.scene.addChild(readyPanel.readyBox)

window.game = game
