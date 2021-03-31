const fs = require('fs')
const path = require('path')

const currentPath = path.resolve(__dirname, './src/@types/slide.d.ts')
const targetPath = path.resolve(__dirname, './dist/types.d.ts')

const createTypes = () => {
  return {
    name: 'create-types',
    generateBundle() {
      fs.copyFile(currentPath, targetPath, err => {
        if (err) {
          console.log('types.d.ts', err)
        } else {
          console.log('types.d.ts')
        }
      })
    }
  }
}

export default createTypes
