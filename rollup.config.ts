import { RollupOptions } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import copy from 'rollup-plugin-copy'
import generatePackageJson from 'rollup-plugin-generate-package-json'
import { terser } from "rollup-plugin-terser";

// @ts-ignore - Types Package for rollup-plugin-peer-deps-external is not available
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import packageJson from "./package.json";

const config: RollupOptions[] = [
	{
		input: "src/index.ts",
		output: [
			{
				file: "dist/" + packageJson.main,
				format: "cjs",
				sourcemap: true,
				exports: "default"
			},
			{
				file: "dist/" + packageJson.module,
				format: "esm",
				sourcemap: true,
				exports: "default"
			},
		],
		plugins: [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.json" }),
			postcss({ modules: false, inject: true }),
			terser(),
			generatePackageJson({
				baseContents: (pkg) => ({
					name: pkg.name,
					version: pkg.version,
					description: pkg.description,
					main: pkg.main,
					module: pkg.module,
					author: pkg.author,
					keywords: pkg.keywords,
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
		external: ['react', 'react-dom']
	},
	{
		input: "dist/esm/src/index.d.ts",
		output: [{ file: "dist/" + packageJson.types, format: "esm", exports: "default" }],
		plugins: [resolve(), dts()],
		external: [/\.css$/]
	},
];

export default config;