<script setup lang="ts">
import type { ToDoXMoment } from '~/types/todox'

const props = defineProps<{
	moment: ToDoXMoment
}>()

const appConfig = useAppConfig()

const fallbackAvatar = 'https://weavatar.com/avatar/47c0f2e82b76d9b10eb3023df9e02e4e3fdbeaf5b74b842063f207971e7fbe7b?s=160'
const author = computed(() => {
	const configuredAuthor = appConfig.author as typeof appConfig.author & { nickname?: string, username?: string }
	return {
		name: configuredAuthor.name || 'Axel',
		username: configuredAuthor.username || configuredAuthor.nickname || '@todo',
		avatar: configuredAuthor.avatar || fallbackAvatar,
		homepage: configuredAuthor.homepage || 'https://todo.axelx.cn/',
	}
})

const postUrl = computed(() => props.moment.url || 'https://todo.axelx.cn/')
const title = computed(() => props.moment.title?.trim() || '无标题记录')
const excerpt = computed(() => truncateText(props.moment.text || '', 180))
const firstImage = computed(() => extractFirstImage(props.moment.html || ''))
const relativeTime = computed(() => formatRelativeTime(props.moment.created))

function truncateText(text: string, max = 180) {
	const normalized = text.trim()
	if (normalized.length <= max)
		return normalized
	return `${normalized.slice(0, max).trimEnd()}…`
}

function extractFirstImage(html: string) {
	const match = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)
	return match?.[1] || ''
}

function formatRelativeTime(timestamp: number): string {
	if (!Number.isFinite(timestamp) || timestamp <= 0)
		return '刚刚'

	const seconds = Math.max(0, Math.floor(Date.now() / 1000 - timestamp))
	if (seconds < 60)
		return `${seconds || 1}秒前`

	const minutes = Math.floor(seconds / 60)
	if (minutes < 60)
		return `${minutes}分钟前`

	const hours = Math.floor(minutes / 60)
	if (hours < 24)
		return `${hours}小时前`

	const days = Math.floor(hours / 24)
	if (days <= 30)
		return `${days}天前`

	const date = new Date(timestamp * 1000)
	if (Number.isNaN(date.getTime()))
		return '刚刚'

	const now = new Date()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	if (date.getFullYear() === now.getFullYear())
		return `${month}月${day}日`
	return `${date.getFullYear()}年${month}月${day}日`
}
</script>

<template>
<article class="moment-card">
	<a class="moment-link" :href="postUrl" target="_blank" rel="noopener noreferrer" :aria-label="`查看瞬间：${title}`">
		<header class="moment-header">
			<img class="moment-avatar" :src="author.avatar" :alt="author.name" loading="lazy">
			<div class="moment-author">
				<div class="moment-author-line">
					<strong>{{ author.name }}</strong>
					<Icon class="verified" name="tabler:circle-check-filled" aria-label="已认证" />
				</div>
				<div class="moment-meta">
					<span>{{ author.username }}</span>
					<span aria-hidden="true">·</span>
					<time :datetime="new Date(moment.created * 1000).toISOString()">{{ relativeTime }}</time>
				</div>
			</div>
			<span v-if="moment.category" class="moment-category">{{ moment.category }}</span>
		</header>

		<div class="moment-body">
			<h2>{{ title }}</h2>
			<p v-if="excerpt" class="moment-excerpt">{{ excerpt }}</p>
			<img v-if="firstImage" class="moment-image" :src="firstImage" alt="瞬间配图" loading="lazy" referrerpolicy="no-referrer">
		</div>

		<footer class="moment-actions" aria-label="互动数据">
			<span>
				<Icon name="tabler:message-circle" />
				{{ moment.comments || 0 }}
			</span>
			<span>
				<Icon name="tabler:heart" />
				{{ moment.likes || 0 }}
			</span>
			<span>
				<Icon name="tabler:share" />
				{{ moment.shares || 0 }}
			</span>
			<span class="read-more">查看原文</span>
		</footer>
	</a>
</article>
</template>

<style lang="scss" scoped>
.moment-card {
	border: 1px solid var(--c-border);
	border-radius: 1rem;
	background: var(--c-bg-soft);
	transition: transform 0.2s, border-color 0.2s, background-color 0.2s;

	&:hover {
		border-color: color-mix(in srgb, var(--c-text-3), var(--c-border));
		background: color-mix(in srgb, var(--c-bg-soft) 86%, var(--c-text) 4%);
		transform: translateY(-1px);
	}
}

.moment-link {
	display: block;
	padding: 1rem;
	text-decoration: none;
	color: inherit;
}

.moment-header {
	display: flex;
	align-items: center;
	gap: 0.75rem;
}

.moment-avatar {
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	background: var(--c-border);
	object-fit: cover;
}

.moment-author {
	flex: 1;
	min-width: 0;
}

.moment-author-line {
	display: flex;
	align-items: center;
	gap: 0.25rem;
	color: var(--c-text);

	strong {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}

.verified {
	flex: none;
	color: #1D9BF0;
}

.moment-meta {
	display: flex;
	align-items: center;
	gap: 0.35rem;
	font-size: 0.85em;
	color: var(--c-text-3);
}

.moment-category {
	flex: none;
	overflow: hidden;
	max-width: 8rem;
	padding: 0.2rem 0.55rem;
	border: 1px solid var(--c-border);
	border-radius: 999px;
	background: color-mix(in srgb, var(--c-bg-soft) 82%, var(--c-text) 6%);
	font-size: 0.78em;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: var(--c-text-2);
}

.moment-body {
	margin-top: 1rem;

	h2 {
		margin: 0 0 0.5rem;
		font-size: 1.15rem;
		line-height: 1.35;
		color: var(--c-text);
	}
}

.moment-excerpt {
	margin: 0;
	line-height: 1.8;
	white-space: pre-wrap;
	color: var(--c-text-2);
}

.moment-image {
	display: block;
	width: 100%;
	max-height: 28rem;
	margin-top: 0.9rem;
	border: 1px solid var(--c-border);
	border-radius: 0.85rem;
	background: var(--c-border);
	object-fit: cover;
}

.moment-actions {
	display: flex;
	align-items: center;
	gap: clamp(1rem, 4vw, 2rem);
	margin-top: 1rem;
	font-size: 0.9em;
	color: var(--c-text-3);

	span {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.iconify {
		font-size: 1.15em;
	}
}

.read-more {
	margin-left: auto;
	color: var(--c-text-2);
}

@media (max-width: $breakpoint-mobile) {
	.moment-link {
		padding: 0.9rem;
	}

	.moment-actions {
		gap: 1rem;
	}
}
</style>
