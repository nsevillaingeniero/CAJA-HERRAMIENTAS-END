import type { ReactNode } from "react";

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i++}`;
    if (match[1]) {
      nodes.push(
        <strong key={key} className="font-semibold text-end-800">
          {match[1]}
        </strong>,
      );
    } else if (match[2]) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-paper px-1.5 py-0.5 font-mono text-[0.85em] text-end-700"
        >
          {match[2]}
        </code>,
      );
    } else if (match[3]) {
      nodes.push(
        <a
          key={key}
          href={match[4]}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-end-600 underline underline-offset-4 hover:text-end-700"
        >
          {match[3]}
        </a>,
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Minimal markdown renderer for the migrated tutorial bodies. */
export function Markdown({ content }: { content: string }) {
  const blocks: ReactNode[] = [];
  const lines = content.split("\n");
  let list: string[] = [];
  let ordered = false;

  const flushList = (key: string) => {
    if (list.length === 0) return;
    const items = list.map((item, index) => (
      <li key={index}>{inline(item, `${key}-${index}`)}</li>
    ));
    blocks.push(
      ordered ? (
        <ol key={key} className="ml-5 list-decimal space-y-2 text-ink-soft">
          {items}
        </ol>
      ) : (
        <ul key={key} className="ml-5 list-disc space-y-2 text-ink-soft">
          {items}
        </ul>
      ),
    );
    list = [];
  };

  lines.forEach((raw, index) => {
    const line = raw.trim();
    const key = `b${index}`;
    if (line === "") {
      flushList(`l${index}`);
      return;
    }
    const heading = /^(#{2,4})\s+(.*)$/.exec(line);
    if (heading) {
      flushList(`l${index}`);
      const level = heading[1]!.length;
      const text = inline(heading[2]!, key);
      if (level === 2) {
        blocks.push(
          <h2
            key={key}
            className="mt-8 font-display text-xl font-bold text-end-800 first:mt-0"
          >
            {text}
          </h2>,
        );
      } else {
        blocks.push(
          <h3 key={key} className="mt-6 font-display text-base font-bold text-end-700">
            {text}
          </h3>,
        );
      }
      return;
    }
    const ol = /^\d+[.)]\s+(.*)$/.exec(line);
    if (ol) {
      if (!ordered) flushList(`l${index}`);
      ordered = true;
      list.push(ol[1]!);
      return;
    }
    const ul = /^[-*]\s+(.*)$/.exec(line);
    if (ul) {
      if (ordered) flushList(`l${index}`);
      ordered = false;
      list.push(ul[1]!);
      return;
    }
    flushList(`l${index}`);
    blocks.push(
      <p key={key} className="leading-relaxed text-ink-soft">
        {inline(line, key)}
      </p>,
    );
  });
  flushList("l-final");

  return <div className="space-y-4">{blocks}</div>;
}
