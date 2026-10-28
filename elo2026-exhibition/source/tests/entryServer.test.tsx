import { describe, it, expect, vi } from "vitest";

// Keep the citation engine out of the per-work SSR render (covered elsewhere).
vi.mock("../src/components/citation/CitationWidget", () => ({
  CitationWidget: () => null,
}));

import { render as ssrRender, getStaticRoutes } from "../src/entry-server";
import { works } from "../src/data/works";

describe("entry-server render", () => {
  it.each(["/", "/search", "/playlist", "/about"])(
    "renders %s to a non-empty HTML string",
    (route) => {
      const { html } = ssrRender(route);
      expect(typeof html).toBe("string");
      expect(html.length).toBeGreaterThan(0);
      expect(html).toContain("<main");
    },
  );

  it("renders a work route", () => {
    const { html } = ssrRender(`/work/${works[0].workInformation.workId}`);
    expect(html.length).toBeGreaterThan(0);
  });

  it("accepts a custom base path", () => {
    const { html } = ssrRender("/search", "/elo2026");
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });

  it("getStaticRoutes covers static and per-work routes", () => {
    expect(getStaticRoutes().length).toBe(4 + works.length);
  });
});
