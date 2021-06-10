import { RESOURCE_TYPE } from '@eva/eva.js'
export default [
  {
    name: 'bg',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url: './statics/bg.png',
      },
    },
    preload: true,
  },
  {
    name: 'blue',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url: 'https://gw.alicdn.com/tfs/TB11hpw1kY2gK0jSZFgXXc5OFXa-200-200.png',
      },
    },
    preload: true,
  },
  {
    name: 'ground',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url: './statics/ground.png',
      },
    },
    preload: true,
  },
  {
    name: 'ready',
    type: RESOURCE_TYPE.SPRITE,
    src: {
      image: {
        type: 'png',
        url: './statics/ready/ready.png',
      },
      json: {
        type: 'json',
        url: './statics/ready/ready.json',
      },
    },
    preload: true,
  },
  {
    name: 'bird',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
      image: {
        type: 'png',
        url:
          './statics/bird/bird.png',
      },
      json: {
        type: 'json',
        url:
          './statics/bird/bird.json',
      },
    },
    preload: true,
  },
  {
    name: 'over',
    type: RESOURCE_TYPE.SPRITE,
    src: {
      image: {
        type: 'png',
        url:
          './statics/over/over.png',
      },
      json: {
        type: 'json',
        url:
          './statics/over/over.json',
      },
    },
    preload: true,
  },
  {
    name: 'bar',
    type: RESOURCE_TYPE.SPRITE,
    src: {
      image: {
        type: 'png',
        url:
          './statics/bar/bar.png',
      },
      json: {
        type: 'json',
        url:
          './statics/bar/bar.json',
      },
    },
    preload: true,
  },
]
