<script setup lang="ts">
import type { ToDoXMomentResponse } from '~/types/todox'

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-tech', 'comm-group'])

useSeoMeta({
	title: '瞬间',
	description: '来自 ToDoX 的生活记录与即时动态',
})

const { data, pending, error } = await useAsyncData<ToDoXMomentResponse>(
	'todox:moments',
	() => $fetch('/api/todox-moments?limit=20'),
	{ default: () => ({ success: true, updated: 0, items: [] }) },
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
<BlogHeader class="mobile-only" to="/" suffix="瞬间" tag="h1" />

<div class="moments-page">
	<header class="moments-hero gradient-card">
		<p class="eyebrow">
			Moments
		</p>
		<h1>瞬间</h1>
		<p>来自 ToDoX 的生活记录与即时动态。</p>
	</header>

	<p v-if="pending" class="moments-state">
		正在加载瞬间……
	</p>
	<p v-else-if="error" class="moments-state error">
		瞬间加载失败，请稍后再试。
	</p>
	<p v-else-if="!moments.length" class="moments-state">
		暂时还没有瞬间。
	</p>

	<TransitionGroup v-else tag="menu" class="moments-list proper-height" name="float-in">
		<MomentCard
			v-for="moment, index in moments"
			:key="moment.id"
			:moment="moment"
			:style="getFixedDelay(index * 0.05)"
		/>
	</TransitionGroup>
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

.error {
	color: var(--c-text);
}

.float-in-leave-to {
	position: absolute;
}
</style>
