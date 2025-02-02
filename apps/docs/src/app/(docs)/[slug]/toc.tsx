import type { RichTextNode, RichTextTocNode } from "basehub/api-transaction";
import type { TOCItemType } from "fumadocs-core/server";
import type { ComponentProps } from "react";

import { RichText } from "~/components/rich-text";

export function parseToc(list: RichTextTocNode, level = 0): TOCItemType[] {
  const results: TOCItemType[] = [];
  if (list.type === "text") return [];

  for (const item of list.content ?? []) {
    if (item.type === "orderedList" || item.type === "listItem") {
      results.push(...parseToc(item, level + 1));
      continue;
    }

    if (item.type !== "paragraph" || !item.content) continue;

    const nodes = item.content[0] ? findTextNode(item.content[0]) : [];

    for (const node of nodes) {
      const mark = findLinkMark(node);
      if (!mark) continue;

      results.push({
        depth: level + 1,
        url: mark.href,
        title: (
          <RichText
            content={[node as RichTextNode]}
            // @ts-expect-error ???
            components={{
              a: (props: ComponentProps<"a">) => <span {...props} />,
            }}
          />
        ),
      });
    }
  }

  return results;
}

function findTextNode(
  n: RichTextTocNode,
): Extract<RichTextTocNode, { type: "text" }>[] {
  if (n.type === "text") return [n];
  return n.content?.flatMap(findTextNode) ?? [];
}

function findLinkMark(n: RichTextTocNode): { href: string } | undefined {
  if (n.type === "text") {
    const mark = n.marks?.[0];
    if (mark) return { href: mark.attrs.href };

    return;
  }

  for (const c of n.content ?? []) {
    const result = findLinkMark(c);
    if (result) return result;
  }
}
