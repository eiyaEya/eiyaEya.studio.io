# ruiquan.studio

Mobile-first personal homepage hosted by GitHub Pages.

面向手机端的个人主页，通过 GitHub Pages 免费托管。

## Public Site / 公开站点

The display brand is `ruiquan.studio`. The current live URL is configured in `data/site.json`, and the downloadable QR code points to the same address.

展示品牌为 `ruiquan.studio`。当前公开网址配置在 `data/site.json` 中，可下载二维码指向同一地址。

## Content / 内容

The site contains Home, Project, Blog, and Contact sections, with device-local likes and visitor messages through email.

网站包含首页、项目、随笔和联系模块；喜欢状态仅保存在当前设备，访客留言通过邮件完成。

## Data Maintenance / 数据维护

The public admin page was removed. Maintain content by editing `data/site.json` through GitHub after signing in.

公开后台页面已移除。维护者登录 GitHub 后，通过编辑 `data/site.json` 更新内容。

Before publishing / 发布前：

1. Put new public images in `assets/`. / 将新增公开图片放入 `assets/`。
2. Keep `feed` and `blog` IDs unique. / 保持 `feed` 与 `blog` 的 ID 唯一。
3. Do not add credentials, tokens, private notes, unpublished work, or personal files. The repository and every deployed asset are public. / 不要加入凭据、令牌、私密笔记、未公开成果或个人文件；仓库与部署资源全部公开。
4. Run `node tools/validate_site.mjs` and preview the site. / 运行 `node tools/validate_site.mjs` 并预览网站。
5. Check the public URL, email links, project status, and images before committing. / 提交前检查公开网址、邮件链接、项目状态和图片。

GitHub Actions runs the same data check on every push to `main`.

每次推送至 `main` 时，GitHub Actions 会运行相同的数据检查。

## Validation / 验证

Run the dependency-free validation script with Node.js 20 or newer:

使用 Node.js 20 或更高版本运行无第三方依赖的校验脚本：

```text
node tools/validate_site.mjs
```

## Known Limitations / 已知限制

- Likes are not shared between visitors or devices. / 喜欢状态不会在不同访客或设备间同步。
- Blog entries currently contain images and summaries rather than full articles. / 随笔目前以图片和摘要为主，尚无完整正文。
- Projects without a verified public package show no download link. / 没有可验证公开安装包的项目不会显示下载链接。

## License Status / 许可状态

No license is granted. Public access to this repository does not grant permission to copy, modify, redistribute, or reuse its contents.

本项目不授予任何许可。仓库公开访问不代表允许复制、修改、再分发或复用其中内容。
