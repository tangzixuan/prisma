import Debug from '@prisma/debug'
import fs from 'fs'
import pMap from 'p-map'
import path from 'path'
import { rimraf } from 'rimraf'

import { getRootCacheDir } from './utils'

const debug = Debug('cleanupCache')

export async function cleanupCache(n = 5): Promise<void> {
  try {
    const rootCacheDir = await getRootCacheDir()
    if (!rootCacheDir) {
      debug('no rootCacheDir found')
      return
    }
    const channel = 'master'
    const cacheDir = path.join(rootCacheDir, channel)
    const dirs = await fs.promises.readdir(cacheDir)
    const dirsWithMeta = await Promise.all(
      dirs.map(async (dirName) => {
        const dir = path.join(cacheDir, dirName)
        const statResult = await fs.promises.stat(dir)

        return {
          dir,
          created: statResult.birthtime,
        }
      }),
    )
    dirsWithMeta.sort((a, b) => (a.created < b.created ? 1 : -1))
    const dirsToRemove = dirsWithMeta.slice(n)
    await pMap(dirsToRemove, (dir) => rimraf(dir.dir), { concurrency: 20 })
  } catch (e) {
    // fail silently
  }
}
