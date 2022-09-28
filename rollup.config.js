import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import inlinePostCSS from 'rollup-plugin-inline-postcss';
import { terser } from "rollup-plugin-terser";
import peerDependencies from 'rollup-plugin-peer-deps-external'
import generatePackageJson from 'rollup-plugin-generate-package-json'
import copy from 'rollup-plugin-copy'

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: 'dist/' + packageJson.main,
                format: "cjs",
                exports: 'default'
            },
            {
                file: 'dist/' + packageJson.module,
                format: "esm",
                exports: 'default'
            },
        ],
        plugins: [
            resolve(),
            peerDependencies(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            postcss(),
            inlinePostCSS({
                styleRegex: /(?:<style>)((.|\n)+?)(?=(<\/style>))/gi,
                styleDelimiter: /<\/?style>/g,
            }),
            terser(),
            generatePackageJson({
                baseContents: (pkg) => ({
                    name: pkg.name,
                    version: pkg.version,
                    description: pkg.description,
                    main: pkg.main,
                    module: pkg.module,
                    author: pkg.author,
                    repository: pkg.repository,
                    homepage: pkg.homepage,
                    license: pkg.license,
                    peerDependencies: pkg.peerDependencies,
                    types: pkg.types
                }),
                outputFolder: "dist"
            }),
            copy({ targets: [{ src: './README.md', dest: 'dist' }] })
        ],
        external: ["react", "react-dom"]
    },
    {
        input: "dist/esm/src/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm", exports: 'default' }],
        plugins: [dts()],
        external: [/\.css$/],
    },
];