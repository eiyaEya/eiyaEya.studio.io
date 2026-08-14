import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = resolve(root, "data/site.json");
const errors = [];

let data;
try {
  data = JSON.parse(readFileSync(dataPath, "utf8"));
} catch (error) {
  console.error(`site.json 无法解析：${error.message}`);
  process.exit(1);
}

for (const key of ["site", "github", "profile", "modules", "feed", "projects", "blog", "contact"]) {
  if (!(key in data)) errors.push(`缺少顶层字段：${key}`);
}

for (const key of ["modules", "feed", "projects", "blog", "contact"]) {
  if (!Array.isArray(data[key])) errors.push(`${key} 必须是数组`);
}

function validateWebUrl(value, label, { allowMail = false, allowEmpty = false } = {}) {
  if (allowEmpty && !value) return;
  try {
    const url = new URL(value);
    const protocols = allowMail ? ["https:", "http:", "mailto:"] : ["https:", "http:"];
    if (!protocols.includes(url.protocol)) errors.push(`${label} 使用了不安全或不支持的协议`);
  } catch {
    errors.push(`${label} 不是有效链接`);
  }
}

function validateAsset(value, label) {
  if (typeof value !== "string" || !value.startsWith("assets/")) {
    errors.push(`${label} 必须位于 assets/ 目录`);
    return;
  }
  const assetPath = resolve(root, value);
  const assetRoot = resolve(root, "assets") + sep;
  if (!assetPath.startsWith(assetRoot) || !existsSync(assetPath)) errors.push(`${label} 对应文件不存在：${value}`);
}

validateWebUrl(data.site?.url, "site.url");
validateAsset(data.site?.qrImage, "site.qrImage");
validateAsset(data.profile?.avatar, "profile.avatar");

for (const [group, items] of [["feed", data.feed], ["projects", data.projects], ["blog", data.blog]]) {
  if (!Array.isArray(items)) continue;
  items.forEach((item, index) => validateAsset(item.image, `${group}[${index}].image`));
}

for (const [index, project] of (data.projects || []).entries()) {
  validateWebUrl(project.sourceUrl, `projects[${index}].sourceUrl`, { allowEmpty: true });
  validateWebUrl(project.downloadUrl, `projects[${index}].downloadUrl`, { allowEmpty: true });
}

for (const [index, item] of (data.contact || []).entries()) {
  validateWebUrl(item.href, `contact[${index}].href`, { allowMail: true });
}

for (const group of ["feed", "blog"]) {
  const ids = new Set();
  for (const item of data[group] || []) {
    if (!item.id) errors.push(`${group} 中存在缺少 id 的内容`);
    else if (ids.has(item.id)) errors.push(`${group} 中存在重复 id：${item.id}`);
    ids.add(item.id);
  }
}

if (errors.length) {
  console.error(errors.map((message) => `- ${message}`).join("\n"));
  process.exit(1);
}

console.log("site.json 与本地资源检查通过");
