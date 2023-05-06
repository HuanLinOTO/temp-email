// @ts-nocheck

const glob = require('glob');
const esbuild = require('esbuild');
const { dtsPlugin } = require('esbuild-plugin-d.ts');
const fs = require('fs');
const chalk = require('chalk');

// 限制事件触发的最小间隔时间（毫秒）⏰
const MIN_EVENT_INTERVAL = 1000;

// 上次事件触发的时间戳 ⏲️
var lastEventTime = 0;

// 编译函数 🛠️
const build = async (srcPath, libPath) => {
	// 使用 glob 模块获取所有 TypeScript 文件路径 📂
	const files = glob.sync(`${srcPath}/**/*.ts`);

	try {
		// 使用 esbuild 编译 TypeScript 文件为 CommonJS 格式 🚀
		const result = await esbuild.build({
			entryPoints: files,
			outdir: libPath,
			minify: true,
			sourcemap: true,
			format: 'cjs',
			plugins: [dtsPlugin()],
		});

		// 打印编译完成消息和错误和警告的数量 👍
		console.log(
			chalk.green(
				`✔ ${srcPath} build completed, errors: ${result.errors.length}, warnings: ${result.warnings.length}`
			)
		);
	} catch (e) {
		// 打印错误信息 👎
		console.log(
			chalk.red(
				`⚠️ ${srcPath} build failed: errors: ${e.errors.length}, warnings: ${e.warnings.length}`
			)
		);
	}
};

// 第一次编译 TypeScript 文件 🚀
console.log(chalk.blueBright('🚧 First building...'));
build('src', 'lib');

// 监听文件更改，并避免短时间内的重复事件触发 ⚠️
console.log(chalk.yellow('👀 Started watching file changes'));
fs.watch(
	'src',
	{ recursive: true },
	async (eventType, filename) => {
		const now = Date.now();
		if (now - lastEventTime >= MIN_EVENT_INTERVAL) {
			console.log(
				chalk.blue(
					`📝 File ${filename} has been ${eventType} in src, start to build`
				)
			);
			lastEventTime = now;
			// 使用 esbuild 编译 TypeScript 文件为 CommonJS 格式 🛠️
			await build('src', 'lib');
		}
	}
);

