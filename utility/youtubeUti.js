const uti = {
  getYoutubeLink(link) {
    const result = link.split("v=")
    let vdo_full = ""
    if(result[1]){
      const videoId = result[1].split("&")
      if(videoId[0]){
        vdo_full =  'https://www.youtube.com/embed/' + videoId[0]
      }
    }
    return vdo_full
  }
}

export default uti
