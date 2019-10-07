export const indentData = (data, indentChar = '\t', depth = 0) => {
  let result = ''
  if (Array.isArray(data)) {
    return data
      .map(val => indentChar.repeat(depth).concat(val))
      .join('\n')
      .concat('\n')
  }

  for (let key in data) {
    result += indentChar.repeat(depth).concat(key, '\n')
    result += indentData(data[key], indentChar, depth + 1)
  }

  return result
}

export const groupTabularData = data => {
  if (data[0].length <= 1) return flatAndUniq(data)

  const grouped = groupByHead(data)

  for (let [key, value] of Object.entries(grouped)) {
    grouped[key] = groupTabularData(value)
  }

  return grouped
}

const groupByHead = data => {
  const result = {}

  for (let row of data) {
    if (result[row[0]]) {
      result[row[0]].push(row.slice(1))
    } else {
      result[row[0]] = [row.slice(1)]
    }
  }

  return result
}

const flatAndUniq = arr => {
  const result = []
  const flattened = arr.flat()

  for (let val of flattened) {
    if (!result.includes(val)) {
      result.push(val)
    }
  }

  return result
}
