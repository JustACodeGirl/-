function handleList (list, mediaList) {
  if (mediaList[0]) {
    list.forEach((item) => {
      if (item.recId === mediaList[0].recId) {
         //mediaList.forEach((item,index) => {
         //  item.recId = item.mediaId + 1000
         //})
        item.children = mediaList
      }
    })
  }
  return list
}

module.exports = {
  handle: handleList,
}
