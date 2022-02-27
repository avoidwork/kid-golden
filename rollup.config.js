const {terser} = require('rollup-plugin-terser');

export default [
	{
		input: './src/kg.js',
		output: [
			{
				file: 'dist/kg.cjs.js',
				format: 'cjs',
				exports: 'named'
			},
			{
				file: 'dist/kg.esm.js',
				format: 'es',
				compact: true,
				plugins: [terser()]
			},
			{
				file: 'dist/kg.js',
				name: 'kg',
				format: 'umd',
				compact: true,
				plugins: [terser()]
			}
		]
	}
];
