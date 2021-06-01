import { GameObject } from '@eva/eva.js'
import { Sprite } from '@eva/plugin-renderer-sprite';

export default function createTitle() {
  const title = new GameObject('gameOverTitle', {
    size: { width: 398, height: 108 },
    position: {
      x: 58,
      y: 0,
    },
  })

  const spriteTitle = new Sprite({
    resource: 'over',
    spriteName: 'game_over.png',
  });

  title.addComponent(spriteTitle)

  return title
}
