import { createServer } from "http";
const PORT = process.env.PORT || 3000;
const users = [
  { id: 1, name: "post one" },
  { id: 1, name: "chuk1" },
  { id: 1, name: "post one" },
  { id: 2, name: "post two" },
  { id: 4, name: "post four" },
];

//loger middle

const server = createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(users));
    res.end();
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    const user = users.find((user) => user.id === parseInt(id));
    if (user) {
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(user));
      res.end();
    } else {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 404;
      res.write(JSON.stringify({ message: "user not found" }));
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ message: "not found" }));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
