# Axel's BLOG

Axel 的个人博客，用于记录 Web 技术、学习笔记、旅行见闻与日常生活。本站基于 Nuxt 4、Nuxt Content 与 Clarity 主题二次开发，从现在开始将作为 Axel 自己维护和演进的个人项目。

## 项目定位

- **内容方向**：Web 技术、部署实践、学习笔记、生活记录、旅行活动。
- **站点地址**：<https://blog.axelx.cn/>
- **作者**：Axel
- **联系邮箱**：<hi@axelx.cn>
- **订阅源**：<https://blog.axelx.cn/atom.xml>

## 技术栈

- [Nuxt](https://nuxt.com/)：应用框架与静态站点生成。
- [Nuxt Content](https://content.nuxt.com/)：Markdown 内容管理。
- [Vue](https://vuejs.org/) / [Pinia](https://pinia.vuejs.org/)：前端视图与状态管理。
- [Nuxt Image](https://image.nuxt.com/)：图片优化。
- ESLint / Stylelint / TypeScript：代码质量与类型约束。
- Twikoo / Umami：评论与访问统计（按当前配置启用）。

## 目录结构

```sh
.
├── app                    # Nuxt 前端应用
│   ├── assets             # 样式、图标等资源
│   ├── components         # 页面、文章、内容与通用组件
│   ├── composables        # 组合式函数
│   ├── pages              # 页面路由
│   ├── plugins            # Nuxt / Vue 插件
│   ├── stores             # Pinia 状态
│   ├── types              # 类型定义
│   ├── utils              # 前端工具函数
│   ├── app.config.ts      # 运行期应用配置
│   └── feeds.ts           # 友链与订阅源配置
├── content                # Markdown 内容
│   ├── posts              # 正式文章
│   ├── previews           # 预览/草稿内容
│   ├── link.md            # 友链页面说明
│   └── theme.md           # 主题说明
├── modules                # 自定义 Nuxt 模块
├── patches                # 依赖补丁
├── public                 # 静态资源
├── remark-plugins         # Markdown / rehype 插件
├── scripts                # 项目脚本
├── server                 # 服务端 API 与路由
├── blog.config.ts         # 博客基础配置
├── content.config.ts      # Nuxt Content 配置
├── nuxt.config.ts         # Nuxt 配置
└── redirects.json         # 旧链接重定向
```

## 本地开发

### 环境要求

- Node.js：遵循 `package.json` 中的 `engines.node`。
- pnpm：遵循 `package.json` 中的 `packageManager` 与 `engines.pnpm`。

### 安装依赖

```sh
pnpm i
```

### 启动开发环境

```sh
pnpm dev
```

如需局域网访问：

```sh
pnpm dev:host
```

### 新建文章

```sh
pnpm new
```

### 构建与预览

```sh
pnpm generate
pnpm preview
```

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动本地开发服务 |
| `pnpm dev:host` | 以 host 模式启动开发服务 |
| `pnpm build` | 构建 Nuxt 应用 |
| `pnpm generate` | 生成静态站点 |
| `pnpm preview` | 预览构建产物 |
| `pnpm lint` | 运行 ESLint 与 Stylelint |
| `pnpm lint:fix` | 自动修复可修复的代码风格问题 |
| `pnpm new` | 交互式创建新文章 |
| `pnpm check:feed` | 检测单个友链 / URL |
| `pnpm check:feed/all` | 检测全部友链并生成报告 |

## 内容维护

- 正式文章放在 `content/posts`。
- 预览或草稿内容放在 `content/previews`。
- 友链页面说明在 `content/link.md`。
- 友链数据在 `app/feeds.ts`。
- 站点标题、作者、统计、评论、订阅源等基础信息在 `blog.config.ts`。
- 导航、页脚、主题与分页等前端展示配置在 `app/app.config.ts`。

## 部署

推荐采用静态站点生成（SSG）方式部署：

- 构建命令：`pnpm generate`
- 输出目录：`dist`
- 安装命令：`pnpm i`

可部署到 Vercel、Netlify、Cloudflare Pages、EdgeOne 等支持 Nuxt 静态产物的平台。若使用平台内置 Nuxt 预设，请确认最终模式是否符合预期，避免误切换为 SSR。

## 许可证

- 项目代码：继承原项目的 [MIT](LICENSE) 许可。
- 博客文章与原创内容：遵循 [CC BY-NC-SA 4.0](LICENCE-CC-BY-NC-SA) 或页面中另行标注的许可。

## 致谢

本站从 [L33Z22L11/blog-v3](https://github.com/L33Z22L11/blog-v3) fork 并二次开发，感谢原作者提供的 Clarity 主题与工程基础。
