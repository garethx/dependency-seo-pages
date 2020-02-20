const fetch = require('node-fetch')
const crypto = require('crypto')
const algoliasearch = require('algoliasearch')
var uniqid = require('uniqid')
const fs = require('fs')
const { addMethods } = require('@algolia/client-common')
const customBrowse = require('./browse')

const sandboxesFile = './sandboxes.json'

const editedTime = () => {
  const week = 604800
  const stats = fs.statSync(sandboxesFile)
  const seconds = (new Date().getTime() - stats.mtime) / 1000
  return seconds > week
}

exports.sourceNodes = async ({ actions }, configOptions) => {
  const { createNode } = actions

  const index = addMethods(
    algoliasearch('ZACZHDBO7S', configOptions.apiKey).initIndex(
      configOptions.index
    ),
    { customBrowse }
  )

  function getEverything() {
    const hits = []
    return index
      .customBrowse({
        limit: '10000',
        batch(batch) {
          console.log('getting sandboxes')
          hits.push(...batch)
        }
      })
      .then(() => hits)
  }

  const getInfo = async name => {
    const data = await fetch(
      `https://api.npms.io/v2/package/${name
        .replace(/\//g, '%2F')
        .replace(/@/g, '%40')}`
    ).then(rsp => rsp.json())

    return data.collected
  }

  const getSize = async name => {
    const data = await fetch(
      `https://bundlephobia.com/api/size?package=${name}`
    ).then(rsp => rsp.json())

    return data
  }

  let data = []
  if (!fs.existsSync(sandboxesFile) || editedTime()) {
    const hits = await getEverything()
    console.log('getting info')

    const npmDeps = hits.reduce((accumulator, currentValue) => {
      currentValue.npm_dependencies.map(dep => {
        const found = accumulator.find(a => a.dependency === dep.dependency)

        if (found) {
          if (found.sandboxes.length > 50) return accumulator
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

    data = await Promise.all(finalData)
    fs.writeFileSync(sandboxesFile, JSON.stringify(data))
  } else {
    data = JSON.parse(fs.readFileSync(sandboxesFile))
  }
  console.log('creating data')
  data.forEach(datum =>
    createNode({
      ...datum,
      id: uniqid(),
      parent: null,
      children: [],
      internal: {
        type: 'SandboxDependency',
        contentDigest: crypto
          .createHash('md5')
          .update(JSON.stringify(datum))
          .digest('hex')
      }
    })
  )
  // We're done, return.
}
