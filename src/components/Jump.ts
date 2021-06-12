import { Component, GameObject } from '@eva/eva.js'
import { Physics } from '@eva/plugin-matterjs'

export default class Jump extends Component {
  gameObject: GameObject
  static componentName = 'jump'

  constructor() {
    super()
  }

  jump() {
    const physics: Physics = this.gameObject.getComponent(Physics)

    if (physics.body) {
      physics.body.force.y = -0.5
    }
  }
}
