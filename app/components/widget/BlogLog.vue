<script setup lang="ts">
const { timeEstablished } = useAppConfig()

const blogLog = [
	{ label: '2026-03', value: '重构到 Nuxt 4 + Nuxt Content v3，全面静态' },
	{ label: '2025-01', value: '转回 Halo，优化博客' },
	{ label: '2024-05', value: '性能受限+误删，转回WordPress，启用新主题' },
	{ label: '2024-02', value: '更换框架为 Halo，升级博客' },
	{ label: '2023-11', value: '使用 Axelx.cn 域名，使用WordPress框架' },
	{ label: timeEstablished, value: '发布第一篇文章' },
]
</script>

<template>
<BlogWidget card title="更新日志">
	<ZDlGroup size="large" :items="blogLog" />
</BlogWidget>
</template>
