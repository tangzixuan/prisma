import { getClientEngineType, getPackedPackage } from '@prisma/internals'
import fs from 'fs'
import path from 'path'
import { rimraf } from 'rimraf'
import tsd, { formatter } from 'tsd'
import { promisify } from 'util'

import { compileFile } from '../../utils/compileFile'
import { generateInFolder } from '../../utils/generateInFolder'

jest.setTimeout(300_000)

let packageSource: string
beforeAll(async () => {
  packageSource = (await getPackedPackage('@prisma/client')) as string
})

describe('valid types', () => {
  const subDirs = getSubDirs(__dirname)
  test.concurrent.each(subDirs)('%s', async (dir) => {
    const testName = path.basename(dir)

    const nodeModules = path.join(dir, 'node_modules')
    if (fs.existsSync(nodeModules)) {
      await rimraf(nodeModules)
    }
    await generateInFolder({
      projectDir: dir,
      packageSource,
    })

    const indexPath = path.join(dir, 'test.ts')
    const tsdTestPath = path.join(dir, 'index.test-d.ts')
    const engineSpecificTestPath = path.join(dir, `test.${getClientEngineType()}.ts`)

    if (fs.existsSync(tsdTestPath)) {
      await runTsd(dir)
    }

    if (testName.startsWith('unhappy')) {
      await expect(compileFile(indexPath)).rejects.toThrow()
    } else {
      await expect(compileFile(indexPath)).resolves.not.toThrow()
    }

    if (fs.existsSync(engineSpecificTestPath)) {
      if (testName.startsWith('unhappy')) {
        await expect(compileFile(engineSpecificTestPath)).rejects.toThrow()
      } else {
        await expect(compileFile(engineSpecificTestPath)).resolves.not.toThrow()
      }
    }
  })
})

async function runTsd(dir: string) {
  const diagnostics = await tsd({
    cwd: dir,
    typingsFile: 'index.d.ts',
  })
  if (diagnostics && diagnostics.length > 0) {
    throw new Error(formatter(diagnostics))
  }
}

function getSubDirs(dir: string): string[] {
  const files = fs.readdirSync(dir)
  return files.map((file) => path.join(dir, file)).filter((file) => fs.lstatSync(file).isDirectory())
}
