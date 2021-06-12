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
      text: text || '得分：0',
      style: {
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#fff'], // gradient
        fillGradientType: 1,
        fillGradientStops: [0.1, 0.4],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 400,
        breakWords: true,
      },
    })
  )

  return score
}
