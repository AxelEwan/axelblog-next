<script setup lang="ts">
import type { ToDoXMomentResponse } from '~/types/todox'

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-tech', 'comm-group'])

useSeoMeta({
	title: '动态',
	description: '来自 ToDoX 的生活记录与即时动态',
})

const { data, pending, error } = await useAsyncData<ToDoXMomentResponse>(
	'todox:moments',
	() => $fetch('/api/todox-moments?limit=20'),
	{
		default: () => ({ success: true, updated: 0, items: [] }),
		server: false,
	},
)

if (import.meta.dev) {
	watchEffect(() => {
		if (error.value)
			console.error('ToDoX moments load failed:', error.value)
	})
}

const moments = computed(() => data.value?.items || [])
</script>

<template>
<BlogHeader class="mobile-only" to="/" suffix="动态" tag="h1" />

<div class="moments-page">
	<header class="moments-hero gradient-card">
		<p class="eyebrow">
			Updates
		</p>
		<h1>动态</h1>
		<p>来自 ToDoX 的生活记录与即时动态。</p>
	</header>

	<ClientOnly>
		<p v-if="pending" class="moments-state">
			正在加载动态……
		</p>
		<p v-else-if="error" class="moments-state error">
			动态加载失败，请稍后再试。
		</p>
		<p v-else-if="!moments.length" class="moments-state">
			暂时还没有动态。
		</p>

		<TransitionGroup v-else tag="menu" class="moments-list proper-height" name="float-in">
			<MomentCard
				v-for="moment, index in moments"
				:key="moment.id"
				:moment="moment"
				:style="getFixedDelay(index * 0.05)"
			/>
		</TransitionGroup>

		<template #fallback>
			<p class="moments-state">
				正在加载动态……
			</p>
		</template>
	</ClientOnly>

	<a class="more-todox" href="https://todo.axelx.cn/" target="_blank" rel="noopener noreferrer">
		<span>前往 ToDo 查看更多</span>
		<Icon name="tabler:arrow-up-right" />
	</a>
</div>
</template>

<style lang="scss" scoped>
.moments-page {
	margin: 1rem;
}

.moments-hero {
	margin-bottom: 1rem;
	padding: clamp(1rem, 3vw, 1.5rem);
	border-radius: 1rem;

	.eyebrow {
		margin: 0 0 0.35rem;
		font-size: 0.8em;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--c-text-3);
	}

	h1 {
		margin: 0;
		font-size: clamp(1.8rem, 5vw, 2.5rem);
		color: var(--c-text);
	}

	p:last-child {
		margin: 0.5rem 0 0;
		color: var(--c-text-2);
	}
}

.moments-list {
	display: grid;
	gap: 1rem;
	padding: 0;
}

.moments-state {
	padding: 2rem 1rem;
	border: 1px solid var(--c-border);
	border-radius: 1rem;
	background: var(--c-bg-soft);
	text-align: center;
	color: var(--c-text-2);
}

.more-todox {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	margin-top: 1rem;
	padding: 0.8rem 1rem;
	border: 1px solid var(--c-border);
	border-radius: 0.75rem;
	background: var(--c-bg-soft);
	text-decoration: none;
	color: var(--c-text-2);
	transition: color 0.2s, background-color 0.2s;

	&:hover {
		background: color-mix(in srgb, var(--c-bg-soft) 86%, var(--c-text) 4%);
		color: var(--c-text);
	}
}

.error {
	color: var(--c-text);
}

.float-in-leave-to {
	position: absolute;
}
</style>
