import { Game, GameObject } from '@eva/eva.js'
import { Sprite } from '@eva/plugin-renderer-sprite'
import { Event, HIT_AREA_TYPE } from '@eva/plugin-renderer-event'

export default function createTap(game: Game) {
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
  })

  tap.addComponent(spriteTap)

  const evt = tap.addComponent(
    new Event({
      type: HIT_AREA_TYPE.Rect,
    })
  )

  evt.on('tap', () => {
    game.emit('on-game-start')
  })

  return tap
}
