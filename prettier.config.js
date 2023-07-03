module.exports = {
	// tab 缩进大小,默认为 2
	tabWidth: 2,
	// 单行代码最大长度，默认 80，如果这个值设置较小时，格式化时会把能分割的内容换行对齐展示，具体如下：
	// 格式化前
	//   syncBtnNode?: React.FunctionComponent<ISyncBtnNodeProps> | React.ComponentClass<ISyncBtnNodeProps, any> | React.ReactNode;
	// 格式化后
	//   syncBtnNode?:
	//    | React.FunctionComponent<ISyncBtnNodeProps>
	//    | React.ComponentClass<ISyncBtnNodeProps, any>
	//    | React.ReactNode;
	printWidth: 100,
	// 使用分号, 默认 true
	semi: true,
	// 在语句末尾添加分号，默认 none，可选值 none|es5|all
	trailingComma: 'all',
	// 使用单引号, 默认 false(在 jsx 中配置无效, 默认都是双引号)
	singleQuote: true,
	// 箭头函数参数括号 默认avoid 可选 avoid| always
	// avoid 能省略括号的时候就省略 例如 x => x
	// always 总是有括号
	// arrowParens: 'always',
	// 在 HTML、Vue、JSX 文件中，单个属性单独一行展示
	singleAttributePerLine: true,
	// 在对象，数组括号与文字之间加空格 "{ foo: bar }"
	bracketSpacing: true,
	// arrowParens: "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
	// 不让prettier使用eslint的代码格式进行校验
	// eslintIntegration: false,
	// jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
};