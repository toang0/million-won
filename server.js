const http = require("http");
const fs = require("fs");
const path = require("path");
const root = __dirname;
const PORT = 8753;
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const fp = path.join(root, p);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end("not found"); return; }
    const ext = path.extname(fp).toLowerCase();
    const type = ext === ".html" ? "text/html; charset=utf-8"
      : ext === ".js" ? "text/javascript"
      : ext === ".json" ? "application/manifest+json"
      : ext === ".svg" ? "image/svg+xml" : "text/plain";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
}).listen(PORT, () => console.log("serving on " + PORT));
