import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Ruta de la página (ej. home, about, visit)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroType',
              type: 'select',
              defaultValue: 'highImpact',
              options: [
                { label: 'None', value: 'none' },
                { label: 'High Impact', value: 'highImpact' },
                { label: 'Medium Impact', value: 'mediumImpact' },
              ],
            },
            {
              name: 'heroHeading',
              type: 'text',
            },
            {
              name: 'heroSubheading',
              type: 'textarea',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Page Layout (Blocks)',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                {
                  slug: 'content',
                  labels: {
                    singular: 'Content Block',
                    plural: 'Content Blocks',
                  },
                  fields: [
                    {
                      name: 'richText',
                      type: 'richText',
                      required: true,
                    },
                  ],
                },
                {
                  slug: 'mediaBlock',
                  labels: {
                    singular: 'Media Block',
                    plural: 'Media Blocks',
                  },
                  fields: [
                    {
                      name: 'media',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                    {
                      name: 'caption',
                      type: 'text',
                    },
                  ],
                },
                {
                  slug: 'cta',
                  labels: {
                    singular: 'Call to Action',
                    plural: 'Calls to Action',
                  },
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'text',
                      type: 'textarea',
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'buttonLabel',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'buttonUrl',
                          type: 'text',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  slug: 'featuredExhibitions',
                  labels: {
                    singular: 'Featured Exhibitions',
                    plural: 'Featured Exhibitions',
                  },
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                    },
                    {
                      name: 'exhibitions',
                      type: 'relationship',
                      relationTo: 'exhibitions',
                      hasMany: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
