import type { FeedEntry } from './app/types/feed'

const basicConfig = {
	title: "Axel's BLOG",
	subtitle: 'Axel的个人小站',
	// 长 description 利好于 SEO
	description: 'Axel的个人博客，分享Web技术、学习笔记、日常记录与生活感悟。无限进步，随缘更新。',
	author: {
		name: 'Axel',
		avatar: 'https://weavatar.com/avatar/07d8afb61135e89b88613c8ef646584d18932f5c5149792258f950d553c2909b',
		email: 'hi@axelx.cn',
		homepage: 'https://blog.axelx.cn/',
	},
	copyright: {
		abbr: 'CC BY-NC-SA 4.0',
		name: '署名-非商业性使用-相同方式共享 4.0 国际',
		url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
	},
	favicon: '/public/assets/web-icon-blog.webp',
	language: 'zh-CN',
	timeEstablished: '2023-11-10',
	timeZone: 'Asia/Shanghai',
	url: 'https://blog.axelx.cn/',
	defaultCategory: '未分类',
}

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
// @keep-sorted
const blogConfig = {
	...basicConfig,

	article: {
		categories: {
			[basicConfig.defaultCategory]: { icon: 'ph:folder-dotted-bold' },
			/** 技术：工具/系统/部署/排障 */
			TECH: { icon: 'ph:star-four-bold', color: '#33aaff' },
			/** 思考：观点讨论/复盘反思/行业或产品观察 */
			杂谈思考: { icon: 'ph:quotes-bold', color: '#0891b2' },
			/** 记录叙事：个人经历/校园家庭/日常片段 */
			LIFE: { icon: 'ph:cards-three-bold', color: '#eab308' },
			/** TOUR：旅行/活动 */
			TOUR: { icon: 'ph:airplane-takeoff-bold', color: '#ff7777' },
		},
		defaultCategoryIcon: 'ph:folder-bold',
		/** 文章版式，首个为默认版式 */
		types: {
			tech: {},
			story: {},
		},
		/** 分类排序方式，键为排序字段，值为显示名称 */
		order: {
			date: '创建日期',
			updated: '更新日期',
			// title: '标题',
		},
		/** 使用 pnpm new 新建文章时自动生成自定义链接（permalink/abbrlink） */
		useRandomPremalink: false,
		/** 隐藏基于文件路由（不是自定义链接）的 URL /post 路径前缀 */
		hidePostPrefix: true,
		/** 禁止搜索引擎收录的路径 */
		robotsNotIndex: ['/preview', '/previews/*'],
	},

	/** 博客 Atom 订阅源 */
	feed: {
		/** 订阅源最大文章数量 */
		limit: 12,
		/** 订阅源是否启用XSLT样式 */
		enableStyle: true,
	},

	/** 向 <head> 中添加脚本 */
	scripts: [
		// 自己部署的 Umami 统计服务
		{ 'src': 'https://analysis.x-lab.top/script.js', 'data-website-id': '97f81d6e-e39c-4dd1-b5e1-30c374c575f2', 'defer': true },
		// 自己网站的 Cloudflare Insights 统计服务
		{ 'src': 'https://-', 'data-cf-beacon': '{"token": "-"}', 'defer': true },
		// Twikoo 评论系统
		{ src: 'https://lib.baomitu.com/twikoo/1.6.44/twikoo.min.js', defer: true },
	],

	/** 自己部署的 Twikoo 服务 */
	twikoo: {
		envId: 'https://twikoo.541111.xyz/',
		preload: 'https://twikoo.541111.xyz/',
	},
}

/** 用于生成 OPML 和友链页面配置 */
export const myFeed: FeedEntry = {
	author: blogConfig.author.name,
	sitenick: '一万博客',
	title: blogConfig.title,
	desc: blogConfig.subtitle || blogConfig.description,
	link: blogConfig.url,
	feed: new URL('/atom.xml', blogConfig.url).toString(),
	icon: blogConfig.favicon,
	avatar: blogConfig.author.avatar,
	archs: ['Nuxt', 'Vercel'],
	date: blogConfig.timeEstablished,
	comment: "It's me,Hi!",
}

export default blogConfig
