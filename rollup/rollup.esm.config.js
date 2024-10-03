import basicConfig from './rollup.config';
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";

const config = {
  ...basicConfig,
  output: [
    {
      file: 'dist/index.js',
      format: 'es'
    }
  ],
  plugins: [
    ...basicConfig.plugins,
    excludeDependenciesFromBundle(),
  ]
}

export default config