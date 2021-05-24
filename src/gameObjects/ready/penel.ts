import { GameObject } from '@eva/eva.js'
import { Img } from '@eva/plugin-renderer-img'
import createTitle from './title'
import createTap from './tap'
// import createBird from '../bird'

export default function createReadyScene() {
  const readyBox = new GameObject('readyBox', {
    size: { width: 320, height: 80 },
    position: {
      x: 128,
      y: 360,
    },
  })


  readyBox.addChild(createTitle())
  readyBox.addChild(createTap())

  return readyBox
}
