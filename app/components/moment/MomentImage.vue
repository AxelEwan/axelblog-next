<script setup lang="ts">
import { LazyPopoverLightbox } from '#components'

const props = defineProps<{
	src: string
	alt: string
}>()

const image = useTemplateRef<HTMLImageElement>('image')
const modalStore = useModalStore()

const { open } = modalStore.use(
	() => h(LazyPopoverLightbox, {
		el: unrefElement(image)!,
		caption: props.alt,
	}),
	{ unique: true },
)
</script>

<template>
<button class="moment-image-button" type="button" :aria-label="`预览${alt}`" @click.stop="open()">
	<img ref="image" :src :alt loading="lazy" referrerpolicy="no-referrer">
</button>
</template>

<style lang="scss" scoped>
.moment-image-button {
	display: block;
	overflow: hidden;
	width: 100%;
	height: 100%;
	padding: 0;
	background: transparent;
	cursor: zoom-in;
}

img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
