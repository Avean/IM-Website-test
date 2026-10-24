// Renderowanie Markdownu z pól tekstowych (np. treść angielska wpisana w formularzu).
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeBase from '../plugins/rehype-base.mjs';

let processor: Awaited<ReturnType<typeof createMarkdownProcessor>> | undefined;

export async function renderMarkdown(src: string | undefined): Promise<string> {
  if (!src) return '';
  if (!processor) {
    processor = await createMarkdownProcessor({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, [rehypeBase, { base: import.meta.env.BASE_URL }]],
    } as any);
  }
  const result = await processor.render(src);
  return result.code;
}
