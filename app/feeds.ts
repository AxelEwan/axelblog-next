import type { FeedGroup } from '../app/types/feed'
// 友链检测 CLI 需要使用显式导入和相对路径
import { myFeed } from '../blog.config'
// eslint-disable-next-line unused-imports/no-unused-imports
import { getFavicon, getGithubAvatar, getGithubIcon, getOciqGroupAvatar, getOicqAvatar, OicqAvatarSize } from './utils/img'

export default [
	// #region Clarity
	{
		name: '朋友圈',
		desc: '正在整理中',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			myFeed,
			{
				author: 'Axel',
				sitenick: 'ToDo!',
				title: 'ToDo!',
				desc: 'Axel 的待办事项与计划记录。',
				link: 'https://todo.axelx.cn/',
				feed: '',
				icon: 'https://todo.axelx.cn/favicon.ico',
				avatar: 'https://weavatar.com/avatar/07d8afb61135e89b88613c8ef646584d18932f5c5149792258f950d553c2909b',
				archs: ['ToDo'],
				date: '2026-07-11',
				comment: '把想做的事逐步变成已完成。',
			},
		],
	},
	// #endregion
] satisfies FeedGroup[]
