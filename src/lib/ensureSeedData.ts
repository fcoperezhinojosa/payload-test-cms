import type { Payload } from 'payload'

type LexicalParagraph = {
  type: 'heading' | 'paragraph'
  tag?: 'h2' | 'h3'
  text: string
}

function buildLexicalRichText(nodes: LexicalParagraph[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: nodes.map((node) => {
        if (node.type === 'heading') {
          return {
            type: 'heading',
            tag: node.tag || 'h2',
            format: '' as const,
            indent: 0,
            version: 1,
            direction: 'ltr' as const,
            children: [
              {
                type: 'text',
                text: node.text,
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                version: 1,
              },
            ],
          }
        }
        return {
          type: 'paragraph',
          format: '' as const,
          indent: 0,
          version: 1,
          direction: 'ltr' as const,
          textFormat: 0,
          textStyle: '',
          children: [
            {
              type: 'text',
              text: node.text,
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              version: 1,
            },
          ],
        }
      }),
    },
  }
}

let seedPromise: Promise<void> | null = null

export async function ensureSeedData(payload: Payload): Promise<void> {
  if (seedPromise) {
    return seedPromise
  }

  seedPromise = (async () => {
    try {
      // 1. Seed initial reviews if none exist
      const existingReviews = await payload.find({
        collection: 'reviews',
        limit: 1,
      })

      if (existingReviews.totalDocs === 0) {
        const sampleReviews = [
          {
            author: 'Laura Méndez',
            role: 'Cliente Verificada',
            rating: 5,
            featured: true,
            comment:
              'La experiencia es impecable. Poder gestionar tanto las páginas editoriales como los módulos dinámicos desde un mismo sitio nos ahorra semanas de trabajo.',
          },
          {
            author: 'Carlos Soriano',
            role: 'Viajero Frecuente',
            rating: 5,
            featured: true,
            comment:
              'Una plataforma rapidísima y muy intuitiva. Toda la información de reservas, horarios y condiciones está siempre clara y actualizada.',
          },
          {
            author: 'Elena Rostova',
            role: 'Directora de Operaciones',
            rating: 5,
            featured: true,
            comment:
              'El equilibrio perfecto entre diseño a medida y flexibilidad editorial en el CMS. Cada página mantiene una identidad visual cuidada.',
          },
          {
            author: 'David Vila',
            role: 'Product Manager',
            rating: 4,
            featured: true,
            comment:
              'Nos permite usar Payload como CMS tradicional para páginas completas y al mismo tiempo consultar su API en modo headless cuando necesitamos un template especial.',
          },
        ]

        for (const review of sampleReviews) {
          await payload.create({
            collection: 'reviews',
            data: review,
          })
        }
      }

      const existingPages = await payload.find({
        collection: 'pages',
        limit: 100,
      })
      const existingSlugs = new Set(existingPages.docs.map((p) => p.slug))

      const sampleImageCardsBlock = {
        blockType: 'imageCards' as const,
        heading: 'All set before you land',
        cards: [
          {
            title: 'Peace of mind',
            description:
              'No surprises. Your price is confirmed at the time of booking, free cancellation up to 48 hours before pickup, and 24/7 support.',
            imageUrl:
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
          },
          {
            title: 'On time, every time',
            description:
              'We track your flight and coordinate your pickup around it. No queues, no delays, just a direct ride to your hotel door.',
            imageUrl:
              'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
          },
          {
            title: 'Whatever your trip needs',
            description:
              "Child seats, group vehicles, wheelchair access. Just tell us what you need and we'll take care of the rest.",
            imageUrl:
              'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=900&q=80',
          },
        ],
      }

      // 2. Seed Home Page if not present
      if (!existingSlugs.has('home')) {
        await payload.create({
          collection: 'pages',
          data: {
            title: 'Homepage',
            slug: 'home',
            template: 'landing',
            status: 'published',
            heroType: 'highImpact',
            heroHeading: 'Tus páginas gestionadas desde Payload CMS',
            heroSubheading:
              'Esta Homepage, igual que About Us, Reviews o Terms & Conditions, está montada directamente desde la colección Pages de Payload.',
            layout: [
              sampleImageCardsBlock,
              {
                blockType: 'features',
                heading: 'Dos modos de trabajo en un mismo proyecto',
                subheading:
                  'Payload 3.0 convive con Next.js para que elijas cómo renderizar cada sección de tu web.',
                items: [
                  {
                    badge: 'Modo 01 · CMS Directo',
                    title: 'Páginas por Bloques (Page Builder)',
                    description:
                      'Crea páginas como About Us, Homepage o Terms & Conditions desde /admin. Se publican automáticamente en su ruta /[slug] sin tocar código.',
                  },
                  {
                    badge: 'Modo 02 · Plantillas',
                    title: 'Selector de Template por Página',
                    description:
                      'Cada página en Payload puede elegir si se muestra con plantilla Landing, Estándar o Documento Legal.',
                  },
                  {
                    badge: 'Modo 03 · Headless / API',
                    title: 'Consulta desde Templates Propios',
                    description:
                      'Cuando tengas un diseño 100% fijo en React o una app externa, consulta los datos con payload.find() o vía REST en /api/pages y /api/reviews.',
                  },
                ],
              },
              {
                blockType: 'reviewsBlock',
                heading: 'Últimas Reviews (Bloque conectado a la colección Reviews)',
                subheading:
                  'Este bloque está insertado desde el CMS dentro de la Homepage y carga automáticamente las reseñas destacadas.',
                showAllFeatured: true,
              },
            ],
            metaTitle: 'Inicio | Payload CMS Híbrido',
            metaDescription:
              'Homepage renderizada dinámicamente desde Payload CMS combinando bloques y colecciones.',
          },
        })
      }

      // 3. Seed About Us Page if not present
      if (!existingSlugs.has('about-us')) {
        await payload.create({
          collection: 'pages',
          data: {
            title: 'About Us',
            slug: 'about-us',
            template: 'default',
            status: 'published',
            heroType: 'mediumImpact',
            heroHeading: 'Sobre Nosotros (About Us)',
            heroSubheading:
              'Una página corporativa montada 100% vía CMS usando bloques editoriales, tarjetas de valores y llamadas a la acción.',
            layout: [
              {
                blockType: 'content',
                richText: buildLexicalRichText([
                  {
                    type: 'heading',
                    tag: 'h2',
                    text: 'Nuestra Historia y Visión',
                  },
                  {
                    type: 'paragraph',
                    text: 'Creemos que el equipo de contenido debe tener control total sobre páginas clave como About Us, sin depender de despliegues de código para cambiar textos, añadir secciones o actualizar cifras.',
                  },
                  {
                    type: 'paragraph',
                    text: 'Gracias a los bloques de Payload, esta página combina texto enriquecido (Lexical RichText) con grillas de pilares estratégicos y testimonios reales de nuestros usuarios.',
                  },
                ]),
              },
              {
                blockType: 'features',
                heading: 'Nuestros Valores',
                subheading: 'Pilares configurables directamente desde el editor de páginas de Payload.',
                items: [
                  {
                    badge: '01',
                    title: 'Autonomía Editorial',
                    description:
                      'Cualquier editor puede crear nuevas páginas, modificar textos o añadir bloques sin necesidad de tocar el repositorio.',
                  },
                  {
                    badge: '02',
                    title: 'Tipado y Seguridad',
                    description:
                      'Cada bloque y campo de Payload genera tipos de TypeScript automáticamente para garantizar que el frontend nunca se rompa.',
                  },
                  {
                    badge: '03',
                    title: 'Arquitectura Híbrida',
                    description:
                      'Combina páginas renderizadas por el CMS con vistas a medida que consultan la API de Payload cuando lo necesites.',
                  },
                ],
              },
              {
                blockType: 'cta',
                heading: '¿Qué opinan nuestros clientes y visitantes?',
                text: 'Descubre todas las valoraciones en nuestra página de Reviews gestionada también desde el CMS.',
                buttonLabel: 'Ver todas las Reviews',
                buttonUrl: '/reviews',
              },
            ],
            metaTitle: 'About Us | Sobre Nosotros',
            metaDescription: 'Conoce nuestra historia, misión y valores.',
          },
        })
      }

      // 4. Seed Terms and Conditions Page if not present
      if (!existingSlugs.has('terms-and-conditions')) {
        await payload.create({
          collection: 'pages',
          data: {
            title: 'Terms and Conditions',
            slug: 'terms-and-conditions',
            template: 'legal',
            status: 'published',
            heroType: 'none',
            heroHeading: 'Términos y Condiciones de Uso',
            heroSubheading:
              'Documento legal gestionado desde Payload CMS utilizando la plantilla "Documento Legal" (template: legal).',
            layout: [
              {
                blockType: 'content',
                richText: buildLexicalRichText([
                  {
                    type: 'heading',
                    tag: 'h2',
                    text: '1. Aceptación de los Términos',
                  },
                  {
                    type: 'paragraph',
                    text: 'Al acceder y utilizar este sitio web, aceptas cumplir con los presentes Términos y Condiciones. Este texto se gestiona íntegramente desde el panel de administración de Payload CMS para que el equipo legal pueda actualizarlo en cualquier momento.',
                  },
                  {
                    type: 'heading',
                    tag: 'h2',
                    text: '2. Uso Permitido de la Plataforma',
                  },
                  {
                    type: 'paragraph',
                    text: 'El contenido publicado en las páginas del sitio (incluyendo textos, imágenes, servicios y reseñas) tiene fines informativos y comerciales. Queda prohibida su reproducción no autorizada.',
                  },
                  {
                    type: 'heading',
                    tag: 'h2',
                    text: '3. Propiedad Intelectual',
                  },
                  {
                    type: 'paragraph',
                    text: 'Todos los derechos de propiedad intelectual del diseño, código fuente y contenidos editoriales pertenecen a sus respectivos titulares.',
                  },
                  {
                    type: 'heading',
                    tag: 'h2',
                    text: '4. Modificaciones del Documento',
                  },
                  {
                    type: 'paragraph',
                    text: 'Nos reservamos el derecho de actualizar estas condiciones en cualquier momento desde el CMS. La fecha de última actualización reflejada arriba se sincroniza automáticamente con el campo updatedAt de Payload.',
                  },
                ]),
              },
            ],
            metaTitle: 'Terms and Conditions | Términos Legales',
            metaDescription: 'Términos y condiciones legales del sitio web.',
          },
        })
      }

      // 5. Seed Reviews Page if not present
      if (!existingSlugs.has('reviews')) {
        await payload.create({
          collection: 'pages',
          data: {
            title: 'Reviews',
            slug: 'reviews',
            template: 'default',
            status: 'published',
            heroType: 'mediumImpact',
            heroHeading: 'Reviews y Experiencias',
            heroSubheading:
              'Página montada en el CMS que incluye el bloque dinámico de Reviews conectado a la colección "reviews".',
            layout: [
              {
                blockType: 'reviewsBlock',
                heading: 'Valoraciones verificadas',
                subheading:
                  'Puedes añadir nuevas reseñas en /admin/collections/reviews y aparecerán automáticamente aquí y en cualquier página que incluya este bloque.',
                showAllFeatured: true,
              },
              {
                blockType: 'cta',
                heading: '¿Quieres ver cómo se consulta esto en modo Headless?',
                text: 'Además de esta página renderizada por bloques del CMS, hemos preparado una ruta con un template fijo que consulta los datos en modo Headless.',
                buttonLabel: 'Ver Demo Headless / Template',
                buttonUrl: '/headless-demo',
              },
            ],
            metaTitle: 'Reviews | Opiniones de Usuarios',
            metaDescription: 'Lee las opiniones y reseñas de nuestros visitantes y clientes.',
          },
        })
      }

      // 6. Ensure existing 'home' and 'about-us' pages also include the new 'imageCards' block if created previously
      for (const targetSlug of ['home', 'about-us']) {
        const existingDoc = existingPages.docs.find((p) => p.slug === targetSlug)
        if (existingDoc) {
          const hasImageCards = (existingDoc.layout || []).some(
            (b) => b.blockType === 'imageCards',
          )
          if (!hasImageCards) {
            await payload.update({
              collection: 'pages',
              id: existingDoc.id,
              data: {
                layout: [sampleImageCardsBlock, ...(existingDoc.layout || [])],
              },
            })
          }
        }
      }
    } catch (err) {
      console.error('Error seeding initial CMS pages:', err)
    }
  })()

  return seedPromise
}
