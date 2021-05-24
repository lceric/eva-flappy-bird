import { GameObject } from '@eva/eva.js'
import { Sprite } from '@eva/plugin-renderer-sprite';

export default function createTitle() {
  const title = new GameObject('title', {
    size: { width: 508, height: 158 },
    position: {
      x: 0,
      y: 0,
    },
  })

  const spriteTitle = new Sprite({
    resource: 'ready',
    spriteName: 'ready_title.png',
  });

  title.addComponent(spriteTitle)

  return title
}
