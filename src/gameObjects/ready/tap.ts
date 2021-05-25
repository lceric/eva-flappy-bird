import { GameObject } from '@eva/eva.js'
import { Sprite } from '@eva/plugin-renderer-sprite';

export default function createTap() {
  const tap = new GameObject('tap', {
    size: { width: 286, height: 246 },
    position: {
      x: 120,
      y: 188,
    },
  })

  const spriteTap = new Sprite({
    resource: 'ready',
    spriteName: 'ready_tap.png',
  });

  tap.addComponent(spriteTap)

  return tap
}
