// Dev-only server for the StreamlyTV static site + /api serverless functions.
// Zero external dependencies (Node built-ins only) so it runs in the v0 preview
// without requiring `vercel login`. It does NOT affect production: Vercel still
// serves the static files and /api functions natively when deployed.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

// Minimal Vercel-style (req, res) shim around Node's ServerResponse.
function decorateRes(res) {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (obj) => {
    const body = JSON.stringify(obj);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(body);
    return res;
  };
  res.send = (data) => {
    res.end(data);
    return res;
  };
  return res;
}

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve(raw);
      }
    });
    req.on("error", () => resolve({}));
  });
}

async function handleApi(req, res, pathname) {
  const name = pathname.replace(/^\/api\//, "").replace(/\/+$/, "");
  const modPath = join(__dirname, "api", `${name}.js`);
  try {
    await stat(modPath);
  } catch {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }
  try {
    const mod = await import(pathToFileURL(modPath).href);
    const handler = mod.default || mod.handler;
    req.body = await readBody(req);
    decorateRes(res);
    await handler(req, res);
    if (!res.writableEnded) res.end();
  } catch (err) {
    console.error("[dev-server] API error:", err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
    }
    res.end(JSON.stringify({ error: "Internal error" }));
  }
}

async function resolveStatic(pathname) {
  // Clean URLs: "/business-card" -> "business-card.html", "/" -> "index.html"
  let rel = decodeURIComponent(pathname);
  const safe = normalize(rel).replace(/^(\.\.[/\\])+/, "");
  const candidates = [];
  if (safe === "/" || safe === "") {
    candidates.push("index.html");
  } else {
    const trimmed = safe.replace(/^\/+/, "").replace(/\/+$/, "");
    if (extname(trimmed)) {
      candidates.push(trimmed);
    } else {
      candidates.push(`${trimmed}.html`, join(trimmed, "index.html"));
    }
  }
  for (const c of candidates) {
    const full = join(__dirname, c);
    try {
      const s = await stat(full);
      if (s.isFile()) return full;
    } catch {}
  }
  return null;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  if (pathname.startsWith("/api/")) {
    return handleApi(req, res, pathname);
  }

  const file = await resolveStatic(pathname);
  if (!file) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end("<h1>404 - Not found</h1>");
    return;
  }
  try {
    const data = await readFile(file);
    res.statusCode = 200;
    res.setHeader("Content-Type", MIME[extname(file)] || "application/octet-stream");
    res.end(data);
  } catch {
    res.statusCode = 500;
    res.end("Internal error");
  }
});

server.listen(PORT, () => {
  console.log(`[dev-server] StreamlyTV running at http://localhost:${PORT}`);
});
