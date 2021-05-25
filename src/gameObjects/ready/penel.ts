import { GameObject } from '@eva/eva.js'
import { Img } from '@eva/plugin-renderer-img'
import { Transition } from '@eva/plugin-transition'
import { Render } from '@eva/plugin-renderer-render'
import createTitle from './title'
import createTap from './tap'
// import createBird from '../bird'

export default function createReadyScene(): {
  readyBox: any
  animation: any
} {
  const readyBox = new GameObject('readyBox', {
    size: { width: 320, height: 80 },
    position: {
      x: 128,
      y: 360,
    },
  })

  readyBox.addChild(createTitle())
  readyBox.addChild(createTap())

  const animation = readyBox.addComponent(new Transition())
  const render = readyBox.addComponent(
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
  }

  return { readyBox, animation }
}
