import { resolve } from 'path'
import { defineConfig } from 'vite'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

// https://antfu.me/posts/isomorphic-dirname
const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(_dirname, 'src/lib/main.js'),
      name: '@fredElJolo-Core',
      // the proper extensions will be added
      fileName: 'fred-el-jolo-core'
    },
    // rollupOptions: {
    //   input: [
    //     resolve(_dirname, 'src/components/Hello-user.ts'),
    //     resolve(_dirname, 'src/components/Hello-world.ts')
    //   ],
    //   output: {
    //     preserveModules: false,
    //   }
    // }
  }
})