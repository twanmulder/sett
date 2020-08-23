exports.handler = async (event, context) => {
  console.log(context)
  const { user } = context.clientContext
  const roles = user ? user.app_metadata.roles : false

  return {
    statusCode: 200,
    body: JSON.stringify(roles[0]),
  }

  if (!roles || !roles.some((role) => allowedRoles.includes(role))) {
    return {
      statusCode: 402,
      body: JSON.stringify({
        src: "https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1592618179/stripe-subscription/subscription-required.jpg",
        alt: "corgi in a crossed circle with the text “subscription required”",
        credit: "Jason Lengstorf",
        creditLink: "https://dribbble.com/jlengstorf",
        message: `This content requires a ${type} subscription.`,
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(content[type]),
  }
}
