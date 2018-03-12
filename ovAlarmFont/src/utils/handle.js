function partsObjectToArray (obj) {
  const arrs = []
  for (let i in obj) {
    if (obj[i].length > 1) {
      obj[i].forEach((item, index) => {
        arrs.push(Object.assign({}, item, { partid: i, index: index === 0 ? 1 : obj[i].length }))
      })
    } else {
      arrs.push(Object.assign({}, obj[i][0], { partid: i, index: 0 }))
    }
  }
  return arrs
}

function quarterlyObjectToArray (obj) {
  const res = {
    arrs: [],
    title: [],
  }
  let temp = true

  for (let i in obj) {
    if (obj[i].length > 1) {
      obj[i].forEach((item, index) => {
        let sum = 0
        for (let k in item) {
          if (k !== 'region') {
            sum += item[k]
          }
        }
        res.arrs.push(Object.assign({}, item, { confidencelevel: i, index: index === 0 ? obj[i].length : 0, total: sum.toFixed(2) }))
        if (temp) {
          for (let j in item) {
            if (j !== 'region') {
              res.title.push(j)
            }
          }
          temp = false
        }
      })
    } else {
      let sum = 0
      for (let k in obj[i][0]) {
        if (k !== 'region') {
          sum += obj[i][0][k]
        }
      }
      res.arrs.push(Object.assign({}, obj[i][0], { confidencelevel: i, index: 1, total: sum.toFixed(2) }))
    }
  }
  let quarterlyTotal = {
    confidencelevel: 'total',
    index: 1,
    region: 'all',
    total: 0,
  }
  res.title.forEach((item) => {
    quarterlyTotal[item] = 0
    quarterlyTotal.total = 0
    res.arrs.forEach((obj) => {
      console.log(obj.total)
      quarterlyTotal[item] += parseFloat(obj[item])
      quarterlyTotal.total += parseFloat(obj.total)
    })
    quarterlyTotal[item] = quarterlyTotal[item].toFixed(2)
  })
  res.arrs.push(quarterlyTotal)
  return res
}

function customerObjectToArray (obj) {
  const res = {
    arrs: [],
    title: [],
  }
  let temp = true
  let QR = {}
  for (let i in obj) {
    if (obj[i].length > 1) {
      obj[i].forEach((item, index) => {
        for (let k in item) {
          if (k !== 'part_id') {
            QR[k + 'Q'] = item[k].split(',')[0]
            QR[k + 'R'] = item[k].split(',')[1]
          }
        }
        res.arrs.push(Object.assign({}, QR, { customer: i, partid: item.part_id, index: index === 0 ? obj[i].length : 0 }))
        QR = {}
        if (temp) {
          for (let j in item) {
            if (j !== 'part_id') {
              res.title.push(j)
            }
          }
          temp = false
        }
      })
    } else {
      for (let k in obj[i][0]) {
        if (k !== 'part_id') {
          QR[k + 'Q'] = obj[i][0][k].split(',')[0]
          QR[k + 'R'] = obj[i][0][k].split(',')[1]
        }
      }
      res.arrs.push(Object.assign({}, QR, { customer: i, partid: obj[i][0].part_id, index: 1 }))
    }
  }
  return res
}

module.exports = {
  handledata: partsObjectToArray,
  handleQuarterlydata: quarterlyObjectToArray,
  handleCustomerdata: customerObjectToArray,
}
