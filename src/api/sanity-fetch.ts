import "server-only";

import { draftMode } from "next/headers";
import { type QueryOptions, type QueryParams } from "next-sanity";
import { client } from "../../sanity/client";


export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 100,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  const isDraftMode = draftMode().isEnabled;

  let dynamicRevalidate = revalidate;
  if (isDraftMode) {
    dynamicRevalidate = 0;
  } else if (tags.length) {
    dynamicRevalidate = false;
  }

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode &&
      ({
        perspective: "previewDrafts",
        stega: true,
      } satisfies QueryOptions)),
    next: {
      revalidate: dynamicRevalidate,
      tags,
    },
  });
}