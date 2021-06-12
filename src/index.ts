import createBackground from './gameObjects/background'
import createReady from './gameObjects/ready/panel'
import Bird from './gameObjects/bird'
import createGameOver from './gameObjects/over/panel'
import createPipeGroup from './gameObjects/pipe'
import createScore from './gameObjects/score'

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
const sceneWidth = 750
const sceneHeight = 750 * (window.innerHeight / window.innerWidth)
// (canvasHeight / canvasWidth) * 750

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

const gameState = {
  ready: true,
  playing: false,
  over: false,
}

let readyHidden = false
let initedBirdPysics = false
let initBirdPosition = {
  x: 100,
  y: 660,
}
let birdPosition = {
  ...initBirdPosition,
}

const background = createBackground(sceneWidth, sceneHeight, game)
const ready = createReady(game)
const gameOver = createGameOver(game)
// const barsInstance = new Bars(sceneWidth, sceneHeight, game)
const birdInstance = new Bird()

birdInstance.init(initBirdPosition)

const evt = game.scene.addComponent(
  new Event({
    type: HIT_AREA_TYPE.Rect,
  })
)

evt.on('tap', () => {
  if (gameState.over) return

  if (gameState.playing && initedBirdPysics) {
    birdInstance.jump()
  }
})

game.on('on-game-ready', (e) => {
  gameState.ready = true
  gameState.over = false
  gameState.playing = false

  birdPosition = {
    ...initBirdPosition,
  }
  birdInstance.setPosition(birdPosition)

  if (initedBirdPysics) {
    birdInstance.bird.removeComponent(birdInstance.birdPhysics)
    initedBirdPysics = false
    game.scene.removeChild(gameOver.gameOver)
    // barsInstance.destroy()
  }

  gameOver.animation.play('hidden', 1)

  readyHidden = false
  ready.animation.play('show', 1)
  console.log('game ready', e)

  console.log(game.scene)
  const pipes = game.scene.gameObjects.filter((itm) => itm._name == 'pipe')
  pipes.forEach((pipe) => {
    game.scene.removeChild(pipe)
    pipe.destroy()
  })
})

game.on('on-game-start', (e) => {
  if (!readyHidden) {
    game.start()
    gameState.ready = false
    gameState.over = false

    readyHidden = true
    ready.animation.play('hidden', 1)

    !initedBirdPysics && birdInstance.initPhysics()
    console.log(birdInstance)
    initedBirdPysics = true

    const [top, bottom] = createPipeGroup()
    game.scene.addChild(top)
    game.scene.addChild(bottom)

    gameState.playing = true
  }
})

game.on('on-game-over', (e) => {
  gameState.ready = false
  gameState.playing = false
  gameState.over = true

  gameOver.animation.play('show', 1)

  game.scene.addChild(gameOver.gameOver)
  console.log('game over', e)
  game.started = false
  game.playing = false
  game.pause()
})

initGameScene(game)
window.game = game

function initGameScene(game: Game) {
  game.scene.addChild(background)
  game.scene.addChild(birdInstance.bird)
  game.scene.addChild(ready.readyBox)
  game.scene.addChild(createScore('0'))
}
