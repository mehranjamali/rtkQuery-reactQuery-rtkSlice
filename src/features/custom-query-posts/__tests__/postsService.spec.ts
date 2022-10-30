import "@jest/globals";
import { fetchAllPostsCommand } from "../postsService";

describe("posts service", () => {
   describe("fetching posts", () => {
      test("exists in the cache", async () => {
         // lastFetch tells us time of last fetching data from the server "good for caching"
         const lastFetch = Date.now(); // in this case time of last fetching is now

         const response = await fetchAllPostsCommand();

         expect(response).toBeFalsy();
      });
      describe("not exists in the cache", () => {
         test("fetch them from the server", async () => {
            const response = await fetchAllPostsCommand();

            expect(response).toHaveLength(1);
         });
      });
   });
});
