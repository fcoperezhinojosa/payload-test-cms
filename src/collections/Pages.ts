import type { CollectionConfig } from 'payload'
import { DestinationCardsBlock } from '../blocks/DestinationCardsBlock'
import { FaqBlock } from '../blocks/FaqBlock'
import { IconCardsBlock } from '../blocks/IconCardsBlock'
import { ImageCardsBlock } from '../blocks/ImageCardsBlock'
import { NewsletterBlock } from '../blocks/NewsletterBlock'
import { PillsSectionBlock } from '../blocks/PillsSectionBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'template', 'status', 'updatedAt'],
    preview: (doc) => {
      const slug = typeof doc?.slug === 'string' ? doc.slug : ''
      if (!slug) return null
      return slug === 'home' ? '/' : `/${slug}`
    },
    livePreview: {
      url: ({ data }) => {
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        return slug === 'home' ? '/' : `/${slug}`
      },
    },
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
        description: 'Ruta de la página (ej. home, about-us, terms-and-conditions, reviews)',
      },
    },
    {
      name: 'template',
      type: 'select',
      required: true,
      defaultValue: 'default',
      options: [
        { label: 'Estándar / Bloques (About Us, Reviews...)', value: 'default' },
        { label: 'Landing / Homepage', value: 'landing' },
        { label: 'Documento Legal (Terms & Conditions, Privacy...)', value: 'legal' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Define el estilo de plantilla con el que se renderiza la página',
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
      name: 'pageFont',
      type: 'select',
      label: 'Tipografía de la Página (Font)',
      defaultValue: 'inherit',
      options: [
        { label: 'Heredar configuración global (Poppins por defecto)', value: 'inherit' },
        { label: 'Poppins', value: 'poppins' },
        { label: 'Inter', value: 'inter' },
        { label: 'Plus Jakarta Sans', value: 'jakarta' },
        { label: 'Montserrat', value: 'montserrat' },
        { label: 'Playfair Display + Poppins (Editorial)', value: 'editorial' },
        { label: 'System UI', value: 'system' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Permite usar una fuente específica en esta página o heredar la global.',
      },
    },
    {
      name: 'pageTheme',
      type: 'select',
      label: 'Tema / Color de Fondo',
      defaultValue: 'inherit',
      options: [
        { label: 'Heredar tema global (Claro #f8fafc por defecto)', value: 'inherit' },
        { label: 'Claro Suave (#f8fafc)', value: 'light' },
        { label: 'Blanco Puro (#ffffff)', value: 'white' },
        { label: 'Crema / Editorial Cálido (#faf7f2)', value: 'warm' },
        { label: 'Azul Cielo Suave (#f0f7ff)', value: 'sky' },
        { label: 'Oscuro Slate (#0f172a)', value: 'slate' },
        { label: 'Oscuro Noche (#0b0c10)', value: 'dark' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Cambia el color de fondo de esta página o usa el tema global.',
      },
    },
    {
      name: 'customBackgroundColor',
      type: 'text',
      label: 'Color de fondo Hex personalizado (Opcional)',
      admin: {
        position: 'sidebar',
        placeholder: 'Ej. #f8fafc o #fffbeb',
        description: 'Opcional: código Hex para el fondo exclusivo de esta página.',
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
              defaultValue: 'imageOverlayUsp',
              label: 'Tipo de Hero',
              options: [
                {
                  label: 'Image Overlay + USPs (Imagen de fondo con Título y USPs encima y debajo)',
                  value: 'imageOverlayUsp',
                },
                { label: 'High Impact (Destacado con gradiente/imagen)', value: 'highImpact' },
                { label: 'Medium Impact (Compacto / Editorial)', value: 'mediumImpact' },
                { label: 'None (Sin Hero)', value: 'none' },
              ],
            },
            {
              name: 'heroHeading',
              type: 'text',
              label: 'Título del Hero (Encima de la imagen)',
              defaultValue: 'Reliable airport transfers private taxi or shared shuttle',
            },
            {
              name: 'heroSubheading',
              type: 'textarea',
              label: 'Descripción del Hero (Encima de la imagen)',
              defaultValue: 'Private transfers & shared shuttles to 700+ airports.',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagen de fondo del Hero (desde Media Library)',
            },
            {
              name: 'heroImageUrl',
              type: 'text',
              label: 'URL de imagen de fondo alternativa (opcional si no subes a Media)',
              defaultValue: '/suntransfers-hero.jpg',
              admin: {
                placeholder: '/suntransfers-hero.jpg o https://images.unsplash.com/...',
              },
            },
            {
              name: 'heroOverlayUsps',
              type: 'array',
              label: 'USPs encima de la imagen (Overlay USPs)',
              minRows: 0,
              maxRows: 6,
              admin: {
                description:
                  'Aparecen en texto blanco con icono directamente sobre la imagen del Hero.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      defaultValue: 'check',
                      label: 'Icono',
                      options: [
                        { label: '✓ Check (Free cancellation)', value: 'check' },
                        { label: '✈ Plane (Flight monitoring)', value: 'plane' },
                        { label: '💳 Card (No hidden fees)', value: 'card' },
                        { label: '🎧 Headset (24/7 support)', value: 'support' },
                      ],
                      admin: {
                        width: '40%',
                      },
                    },
                    {
                      name: 'text',
                      type: 'text',
                      required: true,
                      label: 'Texto del USP',
                      admin: {
                        width: '60%',
                        placeholder: 'Free cancellation',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'heroBottomUsps',
              type: 'array',
              label: 'USPs debajo de la imagen (Bottom Bar USPs)',
              minRows: 0,
              maxRows: 6,
              admin: {
                description:
                  'Aparecen en la franja inferior justo debajo de la imagen del Hero (ej. 18+ Years of experience).',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      defaultValue: 'badge',
                      label: 'Icono',
                      options: [
                        { label: '★ Badge (Years of experience)', value: 'badge' },
                        { label: '👥 Users (Satisfied travellers)', value: 'users' },
                        { label: '🌍 Globe (Locations worldwide)', value: 'globe' },
                      ],
                      admin: {
                        width: '30%',
                      },
                    },
                    {
                      name: 'highlight',
                      type: 'text',
                      required: true,
                      label: 'Cifra / Destacado en azul',
                      admin: {
                        width: '30%',
                        placeholder: '18+',
                      },
                    },
                    {
                      name: 'text',
                      type: 'text',
                      required: true,
                      label: 'Texto descriptivo',
                      admin: {
                        width: '40%',
                        placeholder: 'Years of experience',
                      },
                    },
                  ],
                },
              ],
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
                ImageCardsBlock,
                IconCardsBlock,
                PillsSectionBlock,
                DestinationCardsBlock,
                FaqBlock,
                NewsletterBlock,
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
                  slug: 'features',
                  labels: {
                    singular: 'Features / Pillars Grid',
                    plural: 'Features / Pillars Grids',
                  },
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                    },
                    {
                      name: 'subheading',
                      type: 'textarea',
                    },
                    {
                      name: 'items',
                      type: 'array',
                      required: true,
                      minRows: 1,
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'description',
                          type: 'textarea',
                          required: true,
                        },
                        {
                          name: 'badge',
                          type: 'text',
                          admin: {
                            placeholder: 'Ej. 01, Misión, +10 años...',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  slug: 'reviewsBlock',
                  labels: {
                    singular: 'Reviews Section',
                    plural: 'Reviews Sections',
                  },
                  fields: [
                    {
                      name: 'heading',
                      type: 'text',
                      defaultValue: 'Lo que dicen nuestros visitantes',
                    },
                    {
                      name: 'subheading',
                      type: 'textarea',
                    },
                    {
                      name: 'showAllFeatured',
                      type: 'checkbox',
                      defaultValue: true,
                      label: 'Mostrar automáticamente todas las reviews destacadas',
                    },
                    {
                      name: 'selectedReviews',
                      type: 'relationship',
                      relationTo: 'reviews',
                      hasMany: true,
                      admin: {
                        description:
                          'Opcional: si desmarcas la opción anterior, puedes elegir manualmente qué reviews mostrar aquí.',
                      },
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
