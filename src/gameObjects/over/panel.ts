import { Game, GameObject } from '@eva/eva.js'
import { Transition } from '@eva/plugin-transition'
import { Render } from '@eva/plugin-renderer-render'
import createTitle from './title'
import createPlay from './play'

export default function createGameOver(game: Game): {
  gameOver: any
  animation: any
} {
  const gameOver = new GameObject('gameOver', {
    size: { width: 320, height: 80 },
    position: {
      x: 128,
      y: 360,
    },
  })

  gameOver.addChild(createTitle())
  gameOver.addChild(createPlay(game))

  const animation = gameOver.addComponent(new Transition())
  const render = gameOver.addComponent(
    new Render({
      alpha: 1,
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
