export function formatStringWithLink(text, linkClass, noLink = false) {
  // regex to match links, hashtags and mentions
  const regex = /((https?:\/\/\S*)|(#\S*))|(@\S*)/gi

  const modifiedText = text.replace(regex, (match) => {
    let url, label

    if (match.startsWith('#')) {
      // it is a hashtag
      url = match
      label = match
    } else if (match.startsWith('@')) {
      // it is a mention
      url = `/${match.replace('@', '')}`
      label = match
    } else {
      // it is a link
      url = match
      label = url.replace('https://', '')
    }

    const tag = noLink ? 'span' : 'a'

    return `<${tag} class="${
      noLink ? '' : linkClass
    }" href="${url}">${label}</${tag}>`
  })

  return modifiedText
}
