
export const sceneWidth = 750

export const sceneHeight = 750 * (window.innerHeight / window.innerWidth)

export const scoreTextStyles = {
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
}
