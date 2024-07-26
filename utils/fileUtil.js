const logger = console
const fs = require('fs/promises')
const { createReadStream } = require('fs')
const csv = require('csv-parser')

/**
 * read CSV file async
 * @param {string} filePath - CSV source file path
 * @returns {Promise<any[]>} - return CSV data as json array
 */
module.exports.readCSV = async (filePath) => {
  try {
    // check if the file exists
    await fs.access(filePath)

    const dataArray = []

    // parsing CSV content using csv-parser
    await new Promise((resolve, reject) => {
      createReadStream(filePath).pipe(csv()).on('data', (row) => {
        dataArray.push(row)
      }).on('end', () => {
        resolve()
      }).on('error', (error) => {
        reject(error)
      })
    })

    return dataArray
  } catch (error) {
    logger.error('Error reading CSV file:', error)
    throw error
  }
}

/**
 * read CSV file as json object
 * @param {string} filePath - CSV source file path
 * @param {string | number} key - CSV key column name
 * @returns {Promise<any>} - return CSV data as json array
 */
module.exports.readCSVtoJSON = async (filePath, key = 0) => {
  try {
    // check if the file exists
    await fs.access(filePath)

    const data = {}

    // parsing CSV content using csv-parser
    await new Promise((resolve, reject) => {
      createReadStream(filePath).pipe(csv()).on('data', (row) => {
        let keyName = undefined
        if (typeof key === 'number') {
          keyName = row[Object.keys(row)[key]]
        } else {
          keyName = row[key]
        }
        if (!keyName) {
          throw new Error('CSV key column name not found')
        }
        data[keyName] = row
      }).on('end', () => {
        resolve()
      }).on('error', (error) => {
        reject(error)
      })
    })

    return data
  } catch (error) {
    logger.error('Error reading CSV file as json object:', error)
    throw error
  }
}

/**
 * write to CSV file async
 * @param {string} filePath - output file path
 * @param {any[]} rows - CSV data rows
 * @param {string[]} headers - CSV headers. if not provided, will use the keys of the first row
 * @returns {Promise<void>}
 */
module.exports.writeCSV = async (filePath, rows, headers = null) => {
  try {
    // if headers not provided, use the keys of the first row
    if (!headers || !headers.length) {
      if (!rows || !rows.length) { return }
      headers = Object.keys(rows[0])
    }

    const headerLine = headers.join(',')
    const dataLines = rows.map(
      (row) => headers.map((header) => row[header] || '').join(','))
    const csvContent = [headerLine, ...dataLines].join('\n')
    await fs.writeFile(filePath, csvContent, 'utf-8')
  } catch (error) {
    logger.error('Error writing CSV file:', error)
    throw error
  }
}
