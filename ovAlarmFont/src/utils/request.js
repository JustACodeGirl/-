import Ajax from 'robe-ajax'

export  function requestLogin ( options) {
  var url = options.url;
  var data = options.paramPosition === 'BODY' ? JSON.stringify(options.data) : (options.data || {})
  return Ajax.ajax({
    url,
    method: options.method || 'get',
    traditional: true,
    dataType: 'JSON',
    data: data,
  }).done((data) => {
    return data
  })
}

export  function request (url, options) {
  return Ajax.ajax({
    url,
    method: options.method || 'get',
    dataType:"json",
    data:  options.data ,
  }).done((data) => {
    return data
  })
}
export  function requestPostJson (url, options) {
  return Ajax.ajax({
    url,
    method: options.method || 'get',
    dataType:"json",
    data:  JSON.stringify(options.data) ,
    contentType:  "application/json" ,
  }).done((data) => {
    return data
  })
}
export  function requestPostForm (url, options) {
  return Ajax.ajax({
    url,
    method: options.method || 'get',
    dataType:"json",
    data:  options.data ,
  }).done((data) => {
    return data
  })
}
