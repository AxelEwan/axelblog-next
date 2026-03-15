import type { FeedGroup } from '../app/types/feed'
// 友链检测 CLI 需要使用显式导入和相对路径
import { get } from 'radash'
import { myFeed } from '../blog.config'
// eslint-disable-next-line unused-imports/no-unused-imports
import { getFavicon, getGithubAvatar, getGithubIcon, getOciqGroupAvatar, getOicqAvatar, OicqAvatarSize } from './utils/img'

export default [
	// #region Clarity
	{
		name: '朋友圈',
		desc: '一些互联网好友',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			myFeed,
			{
				author: 'Pending',
				sitenick: 'Pending',
				title: 'Pending',
				desc: '正在筹备中……',
				link: '/',
				feed: '/',
				icon: '/',
				avatar: '/',
				archs: ['Nuxt', 'EdgeOne'],
				date: '2026-03-24',
				comment: '这里还没开发完……',
			},
		],
	},
	// #endregion
			/* ========从此处新增友链======== */
		],
	},
	// #endregion
	// #region 漫游
	{
		name: '/',
		desc: '/',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			{
				author: '/',
				desc: '/',
				feed: '/',
				link: '/',
				icon: '/',
				avatar: '/',
				archs: ['WordPress', '服务器'],
				date: '2025-12-01',
			},
		],
	},
	// #endregion
] satisfies FeedGroup[]
