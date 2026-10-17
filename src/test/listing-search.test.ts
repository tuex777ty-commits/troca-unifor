import { describe, expect, it } from "vitest";

import { filterListings, listings } from "@/components/swap/data";

describe("filterListings", () => {
  it("matches listing fields without case or accent differences", () => {
    const results = filterListings(listings, "Todos", "ingles", []);

    expect(results.map((listing) => listing.id)).toEqual([3]);
  });

  it("combines the selected category with the search term", () => {
    const results = filterListings(listings, "Jogos", "controle", []);

    expect(results.map((listing) => listing.id)).toEqual([6]);
  });

  it("shows only saved listings when the saved filter is selected", () => {
    const results = filterListings(listings, "Salvos", "", [2, 5]);

    expect(results.map((listing) => listing.id)).toEqual([2, 5]);
  });
});
