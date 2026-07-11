import type { ToDoXMomentResponse } from '~/types/todox'

function normalizeLimit(value: unknown) {
	const raw = Array.isArray(value) ? value[0] : value
	const parsed = Number.parseInt(String(raw || '20'), 10)
	if (!Number.isFinite(parsed) || parsed <= 0)
		return 20
	return Math.min(parsed, 50)
}

function normalizeBaseUrl(value: string) {
	return value.replace(/\/+$/, '')
}

export default defineEventHandler(async (event): Promise<ToDoXMomentResponse> => {
	const config = useRuntimeConfig(event)
	const todoxSyncKey = config.todoxSyncKey
	const todoxSyncBase = normalizeBaseUrl(config.todoxSyncBase || 'https://todo.axelx.cn')

	if (!todoxSyncKey) {
		throw createError({
			statusCode: 500,
			message: 'TODOX_SYNC_FEED_KEY 未配置',
		})
	}

	const query = getQuery(event)
	const limit = normalizeLimit(query.limit)
	const since = Array.isArray(query.since) ? query.since[0] : query.since
	const url = new URL('/', todoxSyncBase)
	url.searchParams.set('todox_sync_feed', '1')
	url.searchParams.set('limit', String(limit))
	if (typeof since === 'string' && since.trim())
		url.searchParams.set('since', since.trim())

	const response = await $fetch<ToDoXMomentResponse>(url.toString(), {
		headers: {
			'X-ToDoX-Sync-Key': todoxSyncKey,
		},
	})

	if (response.success !== true) {
		throw createError({
			statusCode: 502,
			message: response.message || 'ToDoX 同步接口返回异常',
		})
	}

	return {
		success: true,
		updated: response.updated,
		items: response.items || [],
	}
})
