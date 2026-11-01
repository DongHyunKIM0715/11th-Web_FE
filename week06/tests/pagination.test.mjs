import assert from "node:assert/strict";
import { test } from "node:test";
import { createServer } from "vite";

 test("페이지 번호와 이전·다음 버튼이 올바른 페이지로 이동한다", async () => {
  const server = await createServer({ server: { middlewareMode: true } });
  try {
    const { default: Pagination } = await server.ssrLoadModule("/src/components/movies/pagination.tsx");
    for (const [page, totalPages, expectedPages] of [
      [1, 12, [1, 2, 3, 4, 5]],
      [6, 12, [6, 7, 8, 9, 10]],
      [12, 12, [11, 12]],
      [1, 1, [1]],
    ]) {
      const selected = [];
      const nav = Pagination({ page, totalPages, onPageChange: (value) => selected.push(value) });
      const [previous, buttons, next] = nav.props.children;
      assert.deepEqual(buttons.map((button) => button.props.children), expectedPages);
      assert.equal(previous.props.disabled, page === 1);
      assert.equal(next.props.disabled, page === totalPages);
      assert.equal(buttons.find((button) => button.props["aria-current"] === "page").props.children, page);
      for (const button of buttons) button.props.onClick();
      assert.deepEqual(selected, expectedPages);
      if (!previous.props.disabled) {
        previous.props.onClick();
        assert.equal(selected.at(-1), page - 1);
      }
      if (!next.props.disabled) {
        next.props.onClick();
        assert.equal(selected.at(-1), page + 1);
      }
    }
  } finally {
    await server.close();
  }
});
