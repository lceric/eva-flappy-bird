import { Game, GameObject } from '@eva/eva.js'
import { Sprite } from '@eva/plugin-renderer-sprite'
import { Event, HIT_AREA_TYPE } from '@eva/plugin-renderer-event'

export default function createPlay(game: Game) {
  const play = new GameObject('gameOverPlay', {
    size: { width: 126, height: 86 },
    position: {
      x: 187,
      y: 188,
    },
  })

  const spritePlay = new Sprite({
    resource: 'over',
    spriteName: 'play.png',
  })

  play.addComponent(spritePlay)

  const evt = play.addComponent(
    new Event({
      type: HIT_AREA_TYPE.Rect,
    })
  )

  evt.on('tap', () => {
    game.emit('on-game-start')
  })

  return play
}
