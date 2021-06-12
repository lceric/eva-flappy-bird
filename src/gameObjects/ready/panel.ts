import { Game, GameObject } from '@eva/eva.js'
import { Transition } from '@eva/plugin-transition'
import { Render } from '@eva/plugin-renderer-render'
import createTitle from './title'
import createTap from './tap'
// import createBird from '../bird'
import { sceneHeight } from '../../helper/const'

export default function createReady(game: Game): {
  readyBox: any
  animation: any
} {
  const readyBox = new GameObject('readyBox', {
    size: { width: 320, height: 80 },
    position: {
      x: 128,
      y: sceneHeight / 4,
    },
  })

  readyBox.addChild(createTitle())
  readyBox.addChild(createTap(game))

  const animation = readyBox.addComponent(new Transition())
  const render = readyBox.addComponent(
    new Render({
      alpha: 1,
      zIndex: 8,
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

  return { readyBox, animation }
}
