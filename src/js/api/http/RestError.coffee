RestError = (message, status, response) ->
  @status = status or -1
  @message = message
  @response = response
  @stack = (new Error()).stack
  return

RestError:: = new Error()
RestError::constructor = RestError


module.exports = RestError
