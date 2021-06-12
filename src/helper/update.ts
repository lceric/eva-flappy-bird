import { Game, GameObject } from '@eva/eva.js'
import { Text } from '@eva/plugin-renderer-text'

/**
 * 更新分数
 * @param game Game
 * @param score number
 */
export function updateScore(game: Game, score: number) {
  const scoreObjs = game.scene.gameObjects.filter(
    (itm: GameObject) => itm._name.indexOf('score') >= 0
  )
  scoreObjs.forEach((scoreObj) => {
    const text: Text = scoreObj.getComponent(Text)
    text.text = `得分：${score}`
  })
}
