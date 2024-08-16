import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";

// Set a default port if not provided
const PORT = process.env.PORT || 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname, __filename);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filepath;
      if (req.url === "/") {
        filepath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        filepath = path.join(__dirname, "public", "about.html");
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("404 Not Found");
      }

      const data = await fs.readFile(filepath);
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    } else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("405 Method Not Allowed");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
