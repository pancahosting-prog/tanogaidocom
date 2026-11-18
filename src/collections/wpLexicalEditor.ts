import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

export const wpLexicalEditor = lexicalEditor({
  features: () => [
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    InlineCodeFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    ChecklistFeature(),
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    AlignFeature(),
    IndentFeature(),
    LinkFeature({
      enabledCollections: ['posts', 'pages', 'services', 'products'],
    }),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'text',
              label: 'Image Caption (SEO & Figcaption)',
            },
          ],
        },
      },
    }),
    EXPERIMENTAL_TableFeature(),
    BlocksFeature({
      blocks: [
        {
          slug: 'travelTip',
          labels: {
            singular: 'Travel Tip Callout',
            plural: 'Travel Tip Callouts',
          },
          fields: [
            {
              name: 'tone',
              type: 'select',
              defaultValue: 'tip',
              options: [
                { label: 'Insider Tip', value: 'tip' },
                { label: 'Important Note', value: 'note' },
                { label: 'Checklist Summary', value: 'checklist' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'body',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          slug: 'serviceEmbed',
          labels: {
            singular: 'Recommended Service Card',
            plural: 'Recommended Service Cards',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'serviceSlug',
              type: 'text',
              required: true,
              admin: {
                description: 'Service slug to link to (e.g. japan-visa-processing, jr-pass-tickets)',
              },
            },
            {
              name: 'ctaLabel',
              type: 'text',
              defaultValue: 'Explore Service',
            },
          ],
        },
      ],
    }),
  ],
});
