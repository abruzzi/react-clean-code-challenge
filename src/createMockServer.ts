import { createServer } from "miragejs";

export default function () {
  return createServer({
    routes() {
      this.urlPrefix = "https://5a2f495fa871f00012678d70.mockapi.io";

      this.get("/api/todos", () => {
        return [
          {
            createdAt: "2022-12-30T06:34:40.834Z",
            text: "index redundant transmitter",
            done: true,
            id: "1",
          },
          {
            createdAt: "2022-12-30T06:10:37.282Z",
            text: "bypass redundant bus",
            done: true,
            id: "2",
          },
          {
            createdAt: "2022-12-30T11:25:45.115Z",
            text: "navigate optical monitor",
            done: false,
            id: "3",
          },
        ];
      });
    },
  });
}
