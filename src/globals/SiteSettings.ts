import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { DEFAULT_FOOTER, DEFAULT_HEADER } from '../lib/siteChrome'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    readVersions: authenticated,
  },
  versions: {
    max: 50,
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
      localized: true,
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
      admin: {
        description:
          'Enlaces del sitio. Elige dónde se muestra cada uno: Header, Footer (en una columna) o barra legal del Footer.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'location',
          type: 'select',
          label: 'Ubicación',
          required: true,
          defaultValue: 'header',
          options: [
            { label: 'Header', value: 'header' },
            { label: 'Footer (columna de enlaces)', value: 'footer' },
            { label: 'Footer (barra legal inferior)', value: 'footerLegal' },
          ],
        },
        {
          name: 'footerColumn',
          type: 'text',
          localized: true,
          label: 'Columna del footer',
          admin: {
            description: 'Título de la columna donde aparece (ej. Support, Partners, Suntransfers).',
            condition: (_, siblingData) => siblingData?.location === 'footer',
          },
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
      admin: { description: 'Se muestran en la columna "Socials" del footer.' },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
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
      name: 'header',
      type: 'group',
      label: 'Header (Cabecera)',
      admin: {
        description: 'Cabecera del sitio, con el diseño de suntransfers.com: logo, enlaces, idioma/moneda y botón.',
      },
      fields: [
        {
          name: 'showLanguageCurrency',
          type: 'checkbox',
          label: 'Mostrar selector de idioma y moneda',
          defaultValue: DEFAULT_HEADER.showLanguageCurrency,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'languageLabel',
              type: 'text',
              localized: true,
              label: 'Texto de idioma (opcional)',
              admin: {
                width: '50%',
                placeholder: 'Automático según idioma de la URL',
                description: 'Déjalo vacío para mostrar automáticamente el idioma activo (English, Deutsch, Español…).',
                condition: (_, siblingData) => siblingData?.showLanguageCurrency !== false,
              },
            },
            {
              name: 'currencyLabel',
              type: 'text',
              label: 'Texto de moneda',
              defaultValue: DEFAULT_HEADER.currencyLabel,
              admin: { width: '50%', condition: (_, siblingData) => siblingData?.showLanguageCurrency !== false },
            },
          ],
        },
        {
          name: 'showCta',
          type: 'checkbox',
          label: 'Mostrar botón (My booking)',
          defaultValue: DEFAULT_HEADER.showCta,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'ctaLabel',
              type: 'text',
              localized: true,
              label: 'Texto del botón',
              defaultValue: DEFAULT_HEADER.ctaLabel,
              admin: { width: '50%', condition: (_, siblingData) => siblingData?.showCta !== false },
            },
            {
              name: 'ctaUrl',
              type: 'text',
              label: 'URL del botón',
              defaultValue: DEFAULT_HEADER.ctaUrl,
              admin: { width: '50%', condition: (_, siblingData) => siblingData?.showCta !== false },
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer (Pie de página)',
      admin: {
        description:
          'Pie de página con el diseño de suntransfers.com: columnas de enlaces, soporte, métodos de pago y copyright.',
      },
      fields: [
        {
          name: 'supportText',
          type: 'text',
          localized: true,
          label: 'Texto de soporte',
          defaultValue: DEFAULT_FOOTER.supportText,
        },
        {
          name: 'showPaymentLogos',
          type: 'checkbox',
          label: 'Mostrar logos de métodos de pago',
          defaultValue: DEFAULT_FOOTER.showPaymentLogos,
        },
        {
          name: 'copyright',
          type: 'text',
          localized: true,
          label: 'Copyright',
          defaultValue: DEFAULT_FOOTER.copyright,
          admin: { description: 'Usa {year} para insertar el año actual automáticamente.' },
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
