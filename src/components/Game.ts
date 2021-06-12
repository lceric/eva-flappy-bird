import { Game, Component } from '@eva/eva.js'

export default class extends Component {
  game: Game
  static componentName = 'game'

  constructor() {
    super()
    this.game = window.game
  }
}
