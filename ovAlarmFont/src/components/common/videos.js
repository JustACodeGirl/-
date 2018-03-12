import React, { Component } from 'react'
// import { DefaultPlayer as Video } from 'react-html5video'
// import 'react-html5video/dist/styles.css'
// import Hls from 'hls.js'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls'
let player

class Videos extends Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  componentDidMount () {
    const options = {
      width: '100%',
      height: '100%',
      hls: {
        withCredentials: true,
      },
    }
    const mediaPath = this.state.mediaPath
    let mediaSrc = mediaPath.substring(mediaPath.indexOf('getm3u8'), mediaPath.length)
    player = videojs('my-player', options).ready(() =>
      console.log('i am ready')
    )
    player.src({ src: mediaSrc, type: 'application/x-mpegURL' })
     //player.play();
     //setTimeout(() => { player.play() }, 1000)
  }

  componentWillUnmount () {
    player.dispose()
  }

  render () {
    const { screenshotPath } = this.props
    return (
        <video
          id="my-player"
          className="video-js vjs-default-skin"
          style={{ width: 400, height: 350 }}
          poster={screenshotPath}
          controls />
    )
  }
}

export default Videos
