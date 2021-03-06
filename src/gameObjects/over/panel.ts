import { Game, GameObject } from '@eva/eva.js'
import { Transition } from '@eva/plugin-transition'
import { Render } from '@eva/plugin-renderer-render'
import createTitle from './title'
import createPlay from './play'
import { Text } from '@eva/plugin-renderer-text'

import { sceneHeight, scoreTextStyles } from '../../helper/const'
import store from '../../helper/store'

export default function createGameOver(game: Game): {
  gameOver: any
  animation: any
} {
  const gameOver = new GameObject('gameOver', {
    size: { width: 320, height: 80 },
    position: {
      x: 128,
      y: sceneHeight / 3,
    },
  })

  const overScore = new GameObject('score', {
    size: { width: 179, height: 79 },
    position: { x: 180, y: 320 },
    anchor: {
      x: 0,
      y: 0,
    },
  })

  overScore.addComponent(
    new Text({
      text: `得分：${store.score}`,
      style: scoreTextStyles,
    })
  )

  gameOver.addChild(createTitle())
  gameOver.addChild(createPlay(game))
  gameOver.addChild(overScore)


  const animation = gameOver.addComponent(new Transition())
  const render = gameOver.addComponent(
    new Render({
      alpha: 1,
      zIndex: 10
    })
  )

  animation.group = {
    hidden: [
      {
        name: 'alpha',
        component: render,
        values: [
          {
            time: 0,
            value: 1,
            tween: 'linear',
          },
          {
            time: 20,
            value: 0,
            tween: 'linear',
          },
        ],
      },
    ],
    show: [
      {
        name: 'alpha',
        component: render,
        values: [
          {
            time: 0,
            value: 0,
            tween: 'linear',
          },
          {
            time: 20,
            value: 1,
            tween: 'linear',
          },
        ],
      },
    ],
  }

  animation.play('hidden', 1)

  return { gameOver, animation }
}
