import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Payload Museum & CMS',
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'collapsible',
      label: 'Apariencia Global (Tipografía y Fondo)',
      admin: {
        initCollapsed: false,
        description:
          'Define la fuente tipográfica y el tema de color de fondo para todo el sitio web (puede sobrescribirse individualmente en cada página).',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'fontFamily',
              type: 'select',
              label: 'Tipografía Principal (Font)',
              defaultValue: 'poppins',
              required: true,
              options: [
                { label: 'Poppins (Geométrica y moderna)', value: 'poppins' },
                { label: 'Inter (Limpia y neutra)', value: 'inter' },
                { label: 'Plus Jakarta Sans ( Contemporánea)', value: 'jakarta' },
                { label: 'Montserrat (Amplia y versátil)', value: 'montserrat' },
                { label: 'Playfair Display + Poppins (Editorial)', value: 'editorial' },
                { label: 'System UI (Fuente nativa del sistema)', value: 'system' },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'backgroundTheme',
              type: 'select',
              label: 'Tema / Color de Fondo',
              defaultValue: 'light',
              required: true,
              options: [
                { label: 'Claro Suave (#f8fafc · Texto oscuro)', value: 'light' },
                { label: 'Blanco Puro (#ffffff · Texto oscuro)', value: 'white' },
                { label: 'Crema / Editorial Cálido (#faf7f2 · Texto oscuro)', value: 'warm' },
                { label: 'Azul Cielo Suave (#f0f7ff · Texto oscuro)', value: 'sky' },
                { label: 'Oscuro Slate (#0f172a · Texto claro)', value: 'slate' },
                { label: 'Oscuro Noche (#0b0c10 · Texto claro)', value: 'dark' },
              ],
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'customBackgroundColor',
          type: 'text',
          label: 'Color de fondo personalizado (Opcional - Código Hex o CSS)',
          admin: {
            placeholder: 'Ej. #f8fafc, #fefce8 o #eef2ff (deja vacío para usar el tema seleccionado)',
            description:
              'Si introduces un código de color (ej. #f1f5f9), se aplicará como color de fondo principal.',
          },
        },
      ],
    },
    {
      name: 'navigation',
      type: 'array',
      label: 'Main Navigation Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'X / Twitter', value: 'x' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'contactEmail',
          type: 'email',
          admin: { width: '50%' },
        },
        {
          name: 'contactPhone',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
  ],
}
