import { GameObject } from '@eva/eva.js'
import { Sprite } from '@eva/plugin-renderer-sprite';

export default function createTitle() {
  const title = new GameObject('tap', {
    size: { width: 286, height: 246 },
    position: {
      x: 120,
      y: 188,
    },
  })

  const spriteTitle = new Sprite({
    resource: 'ready',
    spriteName: 'ready_tap.png',
  });

  title.addComponent(spriteTitle)

  return title
}
