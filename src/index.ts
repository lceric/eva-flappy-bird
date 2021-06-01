import createBackground from './gameObjects/background'
import createReady from './gameObjects/ready/panel'
import createBird from './gameObjects/bird'
import createGameOver from './gameObjects/over/panel'

import resources from './resources'

import { Game, resource } from '@eva/eva.js'
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
import { PhysicsSystem } from '@eva/plugin-matterjs'

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
    new TilingSpriteSystem(),
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
  ],
})

game.scene.transform.size.width = sceneWidth
game.scene.transform.size.height = sceneHeight

let readyHidden = false
let gameStart = false
let initedBirdPysics = false
let initBirdPosition = {
  x: 100,
  y: 660,
}
let birdPosition = {
  ...initBirdPosition,
}

const background = createBackground(sceneWidth, sceneHeight, game)
const ready = createReady()
const { bird, updateBirdPosition, initBirdPysics } =
  createBird(initBirdPosition)
const gameOver = createGameOver(game)

const evt = background.addComponent(
  new Event({
    type: HIT_AREA_TYPE.Rect,
  })
)

evt.on('tap', (e: TouchEvent) => {
  const { x, y } = birdPosition

  if (gameStart) {
    birdPosition = {
      x: x,
      y: y - 20,
    }

    updateBirdPosition(game, birdPosition)
  }
  gameStart = true

  if (!readyHidden) {
    readyHidden = true
    ready.animation.play('hidden', 1)
    !initedBirdPysics && initBirdPysics()
    initedBirdPysics = true
  }
})

function initGameScene(game: Game) {
  game.scene.addChild(background)
  game.scene.addChild(bird)
  game.scene.addChild(ready.readyBox)
  game.scene.addChild(gameOver.gameOver)
}

game.on('on-game-start', (e) => {
  birdPosition = {
    ...initBirdPosition,
  }
  updateBirdPosition(game, birdPosition)
  console.log(birdPosition)

  gameOver.animation.play('hidden', 1)

  readyHidden = false
  ready.animation.play('show', 1)

  console.log('game start', e)
})

game.on('on-game-over', (e) => {
  gameStart = false
  gameOver.animation.play('show', 1)
  console.log('game over', e)
})

initGameScene(game)
window.game = game
