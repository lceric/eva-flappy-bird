import { Game, Component, GameObject } from '@eva/eva.js'
import { Physics } from '@eva/plugin-matterjs'
import Matter from 'matter-js'
import GameComponent from './Game'

export default class Move extends Component {
  gameObject: GameObject
  static componentName = 'move'

  constructor() {
    super()
  }

  update() {
    const gameComponent: GameComponent =
      this.gameObject.getComponent(GameComponent)
    const physics: Physics = this.gameObject.getComponent(Physics)

    if (gameComponent && physics.body) {
      const game: Game = gameComponent.game
      if (game.playing) {
        let pushVec = Matter.Vector.create(-5, 0)
        Matter.Body.translate(physics.body, pushVec)
      }
    }
  }
}
