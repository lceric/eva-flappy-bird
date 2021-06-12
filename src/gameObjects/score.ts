import { GameObject } from '@eva/eva.js'
import { Text } from '@eva/plugin-renderer-text'

export default function createScore(text?: string) {
  const score = new GameObject('score', {
    size: { width: 179, height: 79 },
    origin: { x: 0.5, y: 0.5 },
    position: { x: 120, y: 120 },
    anchor: {
      x: 0,
      y: 0,
    },
  })

  score.addComponent(
    new Text({
      text: text || '0',
    })
  )
  return score
}
