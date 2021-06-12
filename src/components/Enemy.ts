import { GameObject, Scene } from '@eva/eva.js'
import { nextPipe } from '../gameObjects/pipe'
import { Text } from '@eva/plugin-renderer-text'
import { Physics } from '@eva/plugin-matterjs'
import GameComponent from './Game'
import store from '../helper/store'

type Distance = 'top' | 'bottom'

export default class Enemy extends GameComponent {
  gameObject: GameObject
  static componentName = 'enemy'
  ready: boolean
  started: boolean
  playing: boolean
  over: boolean
  appended: boolean
  distance: Distance

  constructor(distance: Distance) {
    super()
    this.distance = distance
  }

  update() {
    const sceneWidth = 750

    const physics = this.gameObject.getComponent(Physics)

    const scene: Scene = this.gameObject.scene

    this.started = this.game.started
    this.playing = this.game.playing

    // this.gameObject.transform.position.x -= 10
    if (!physics) return
    const x = physics.body && physics.body.position.x

    if (x <= -80 - 20) {
      store.pipePassedCount++

      this.gameObject.getComponent(Physics).removeAllListeners()
      scene.removeChild(this.gameObject)
      this.gameObject.destroy()
    }

    if (!this.appended && x < (sceneWidth * 2) / 3) {
      this.appended = true
      console.log('this.distance', this.distance)

      const pipe: GameObject = nextPipe()

      this.gameObject.scene.addChild(pipe)
    }
  }

  lateUpdate() {
    const scene: Scene = this.gameObject.scene
    const score: GameObject = scene.gameObjects.find((item) => {
      return item.name == 'score'
    })

    const text = score.getComponent(Text)
    if (store.pipePassedCount % 2 == 0) {
      store.score = store.pipePassedCount / 2

      text.text = String(store.score)
    }
  }
}
