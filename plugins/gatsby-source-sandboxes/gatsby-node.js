const fetch = require('node-fetch')
const crypto = require('crypto')
const algoliasearch = require('algoliasearch')
var uniqid = require('uniqid')

exports.sourceNodes = async ({ actions }, configOptions) => {
  const { createNode } = actions
  const client = algoliasearch('ZACZHDBO7S', configOptions.apiKey)
  const index = client.initIndex(configOptions.index)

  let hits = []

  await index.browseObjects({
    query: '',
    facets: ['npm_dependencies.dependency'],
    attributesToRetrieve: [
      'objectID',
      'title',
      'description',
      'like_count',
      'fork_count',
      'view_count',
      'template',
      'npm_dependencies'
    ],
    batch: batch => {
      console.log(batch)
      hits = hits.concat(batch)
    }
  })

  const getInfo = async name => {
    const data = await fetch(
      `https://api.npms.io/v2/package/${name
        .replace(/\//g, '%2F')
        .replace(/\@/g, '%40')}`
    ).then(rsp => rsp.json())

    return data.collected
  }

  const getSize = async name => {
    const data = await fetch(
      `https://bundlephobia.com/api/size?package=${name}`
    ).then(rsp => rsp.json())

    return data
  }

  const npmDeps = hits.reduce((accumulator, currentValue) => {
    currentValue.npm_dependencies.map(dep => {
      const found = accumulator.find(a => a.dependency === dep.dependency)
      if (found) {
        found.sandboxes.push(currentValue)
        return accumulator
      } else {
        accumulator.push({
          dependency: dep.dependency,
          sandboxes: [currentValue]
        })
        return accumulator
      }
    })

    return accumulator
  }, [])

  const finalData = npmDeps.map(async dep => {
    const name = dep.dependency
    let info = {}
    let size = {}
    try {
      info = await getInfo(name)
    } catch (e) {}
    try {
      size = await getSize(name)
    } catch (e) {}

    return {
      ...dep,
      info,
      size
    }
  })

  const data = await Promise.all(finalData)
  data.forEach(datum =>
    createNode({
      ...datum,
      id: uniqid(),
      parent: null,
      children: [],
      internal: {
        type: `SandboxDependency`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(datum))
          .digest(`hex`)
      }
    })
  )
  // We're done, return.
  return
}
