exports.handler = async (event, context) => {
  console.log(context)
  const { user } = context.clientContext
  const roles = user ? user.app_metadata.roles : false

  return {
    statusCode: 200,
    body: JSON.stringify(roles[0]),
  }
}
