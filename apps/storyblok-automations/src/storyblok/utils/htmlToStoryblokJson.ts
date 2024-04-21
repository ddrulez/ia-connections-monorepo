import { JSDOM } from 'jsdom';

// Enums for node types and mark types
enum NodeType {
  Doc = 'doc',
  Paragraph = 'paragraph',
  Heading = 'heading',
  BulletList = 'bullet_list',
  OrderedList = 'ordered_list',
  ListItem = 'list_item',
  Text = 'text',
}

enum MarkType {
  Bold = 'bold',
  Link = 'link',
}

interface Mark {
  type: MarkType;
  attrs?: {
    href?: string;
    linktype?: string;
  };
}

interface TextNode {
  type: NodeType.Text;
  text: string;
  marks?: Mark[];
}

interface ContentNode {
  type: NodeType;
  content?: ContentNode[] | TextNode[];
  attrs?: {
    level?: number;
    order?: number;
  };
}

// Exportable function for converting HTML to JSON
export const htmlToJson = (htmlContent: string): ContentNode => {
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;
  return {
    type: NodeType.Doc,
    content: processNodes(Array.from(doc.body.childNodes)),
  };
};

const processNodes = (nodes: Node[]): ContentNode[] =>
  nodes
    .map((node) => {
      if (['H1', 'H2', 'H3', 'H4'].includes(node.nodeName)) {
        const level = parseInt(node.nodeName.substring(1));
        return {
          type: NodeType.Heading,
          attrs: { level },
          content: processContentItems(node as Element),
        };
      } else if (node.nodeName === 'P') {
        return {
          type: NodeType.Paragraph,
          content: processContentItems(node as Element),
        };
      } else if (node.nodeName === 'UL') {
        return {
          type: NodeType.BulletList,
          content: processListItems(node.childNodes),
        };
      } else if (node.nodeName === 'OL') {
        return {
          type: NodeType.OrderedList,
          attrs: { order: 1 },
          content: processListItems(node.childNodes),
        };
      }
      return null;
    })
    .filter((node) => node !== null);

const processListItems = (listNodes: NodeList): ContentNode[] =>
  Array.from(listNodes)
    .map((node) => {
      if (node.nodeName === 'LI') {
        return {
          type: NodeType.ListItem,
          content: processContentItems(node as Element),
        };
      }
      return null;
    })
    .filter((node) => node !== null);

const processContentItems = (element: Element): TextNode[] =>
  Array.from(element.childNodes)
    .map((node) => {
      if (node.nodeType === 3) {
        // Node.TEXT_NODE
        return {
          type: NodeType.Text as NodeType.Text, // Fix: Assign type as NodeType.Text
          text: node.textContent.trim(),
        };
      } else if (node.nodeType === 1 && (node.nodeName === 'B' || node.nodeName === 'STRONG')) {
        // Node.ELEMENT_NODE
        return {
          type: NodeType.Text as NodeType.Text, // Fix: Assign type as NodeType.Text
          text: node.textContent.trim(),
          marks: [{ type: MarkType.Bold }],
        };
      } else if (node.nodeType === 1 && node.nodeName === 'A') {
        return {
          type: NodeType.Text as NodeType.Text, // Fix: Assign type as NodeType.Text
          text: ' ' + node.textContent.trim(),
          marks: [
            {
              type: MarkType.Link,
              attrs: {
                href: (node as HTMLAnchorElement).href,
                linktype: 'url',
              },
            },
          ],
        };
      }
      return null;
    })
    .filter((node) => node !== null);
