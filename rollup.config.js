import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import babel from "rollup-plugin-babel"

export default {
  //入口文件
  input: "main.js",
  output: [
    {
      banner: "#!/usr/bin/env node",
      /**
       * 头部插入这段代码
       * */
      name: "fu",
      file: "bin/fu.js",
      //打包成umd模块规范
      format: "umd"
    }
  ],
  plugins: [
    commonjs(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    uglify()
  ],
};
