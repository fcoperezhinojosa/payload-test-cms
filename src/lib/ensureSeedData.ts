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
      // 0. Ensure Site Settings global defaults (Poppins + Light theme)
      const currentSettings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
      if (currentSettings && (!currentSettings.fontFamily || !currentSettings.backgroundTheme)) {
        await payload.updateGlobal({
          slug: 'site-settings',
          data: {
            siteName: currentSettings.siteName || 'Payload Museum & CMS',
            fontFamily: currentSettings.fontFamily || 'poppins',
            backgroundTheme: currentSettings.backgroundTheme || 'light',
          },
        })
      }

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

      const samplePillsSectionBlock = {
        blockType: 'pillsSection' as const,
        title: '700+ destinations worldwide',
        description: 'Select a country to see available options for your trip.',
        pills: [
          { icon: '🇪🇸', label: 'Spain', href: '#spain' },
          { icon: '🇵🇹', label: 'Portugal', href: '#portugal' },
          { icon: '🇬🇷', label: 'Greece', href: '#greece' },
          { icon: '🇹🇷', label: 'Turkey', href: '#turkey' },
          { icon: '🇨🇾', label: 'Cyprus', href: '#cyprus' },
          { icon: '🇪🇬', label: 'Egypt', href: '#egypt' },
          { icon: '🇩🇴', label: 'Dominican Republic', href: '#dominican-republic' },
          { icon: '🇲🇦', label: 'Morocco', href: '#morocco' },
          { icon: '🇦🇪', label: 'United Arab Emirates', href: '#uae' },
          { icon: '🇹🇭', label: 'Thailand', href: '#thailand' },
          { icon: '🇭🇷', label: 'Croatia', href: '#croatia' },
          { icon: '🇲🇹', label: 'Malta', href: '#malta' },
          { icon: '🇮🇹', label: 'Italy', href: '#italy' },
          { icon: '🇫🇷', label: 'France', href: '#france' },
          { icon: '🇦🇱', label: 'Albania', href: '#albania' },
          { icon: '🇲🇽', label: 'Mexico', href: '#mexico' },
          { icon: '🇧🇷', label: 'Brazil', href: '#brazil' },
          { icon: '🇬🇧', label: 'United Kingdom', href: '#uk' },
          { icon: '🇩🇪', label: 'Germany', href: '#germany' },
          { icon: '🇳🇱', label: 'Netherlands', href: '#netherlands' },
        ],
        moreLabel: 'See more countries',
        moreUrl: '#all-countries',
      }

      const sampleDestinationCardsBlock = {
        blockType: 'destinationCards' as const,
        title: 'Airports we go to every day',
        description: 'We get you to and from the airport, wherever you go.',
        cards: [
          {
            title: 'Palma de Mallorca Airport (PMI)',
            description: '325 routes available',
            imageUrl:
              'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
            href: '#pmi',
          },
          {
            title: 'Alicante–Elche Miguel Hernández Airport (ALC)',
            description: '325 routes available',
            imageUrl:
              'https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&w=800&q=80',
            href: '#alc',
          },
          {
            title: 'Tenerife South Airport (TFS)',
            description: '325 routes available',
            imageUrl:
              'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80',
            href: '#tfs',
          },
          {
            title: 'Gran Canaria Airport (LPA)',
            description: '325 routes available',
            imageUrl:
              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            href: '#lpa',
          },
          {
            title: 'Antalya Airport (AYT)',
            description: '325 routes available',
            imageUrl:
              'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
            href: '#ayt',
          },
          {
            title: 'Dalaman Airport (DLM)',
            description: '325 routes available',
            imageUrl:
              'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
            href: '#dlm',
          },
          {
            title: 'Hurghada Airport (HRG)',
            description: '325 routes available',
            imageUrl:
              'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
            href: '#hrg',
          },
          {
            title: 'Barcelona Airport (BCN)',
            description: '325 routes available',
            imageUrl:
              'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80',
            href: '#bcn',
          },
        ],
        moreLabel: 'See all 399 routes',
        moreUrl: '#all-routes',
      }

      const sampleFaqBlock = {
        blockType: 'faq' as const,
        title: 'FAQs',
        description: 'What travellers ask before booking a transfer.',
        items: [
          {
            question: 'Is it worth booking an airport transfer in advance?',
            answer:
              "Yes. Booking an airport transfer in advance means your trip is confirmed and a driver is assigned before you travel. So someone is there to meet you on arrival, the price is fixed, and you're with a professional, vetted service. Whether you're arriving or departing, it's all arranged ahead, and you can head straight to your hotel, villa, resort, or airport terminal.",
          },
          {
            question: "What's the best option for airport transfers?",
            answer:
              'Private transfers are ideal for comfort, speed, and door-to-door convenience, while shared shuttles offer a budget-friendly option for solo travellers or small groups heading to popular resorts.',
          },
          {
            question: 'What is the difference between airport shuttle and private airport transfer?',
            answer:
              'A private transfer takes you and your group directly to your accommodation in a dedicated vehicle with no stops. An airport shuttle is shared with other passengers travelling in the same direction and may make multiple stops along the route.',
          },
          {
            question: 'Are private airport transfers worth it?',
            answer:
              'Yes, especially for families, groups, or travellers carrying luggage. Your driver meets you at arrivals, helps with bags, and drives you straight to your destination at a fixed upfront price.',
          },
          {
            question: 'Are private transfers cheaper than taxis?',
            answer:
              'Pre-booked private transfers often cost less than airport taxis because the fare is locked in advance—with no meter running in traffic, no night surcharges, and no hidden fees.',
          },
          {
            question: 'What happens if my flight is delayed?',
            answer:
              'We monitor your flight number in real time and automatically adjust your pickup time at no extra cost, so your driver will be waiting whenever you land.',
          },
          {
            question: 'Where exactly will I meet my driver at the airport?',
            answer:
              'Your booking voucher includes clear meeting point instructions for your arrival terminal. Typically, your driver waits in the arrivals hall holding a sign with your name.',
          },
          {
            question: "What's included in the price of the private transfer?",
            answer:
              'All taxes, tolls, meet-and-greet service, flight tracking, luggage allowance, and free cancellation up to 48 hours before pickup are included in the confirmed price.',
          },
        ],
        footerText: 'Do you have more questions?',
        footerLinkLabel: 'Visit our Help Centre',
        footerLinkUrl: '#help-centre',
      }

      const sampleIconCardsBlock = {
        blockType: 'iconCards' as const,
        title: 'Why book your transfers with Suntransfers?',
        cards: [
          {
            iconType: 'piggyBank' as const,
            title: 'Great value',
            description:
              'Low, low prices without sacrificing great service. No charges apply to debit or credit card payments.',
          },
          {
            iconType: 'calendar' as const,
            title: 'Easy & flexible booking',
            description:
              'Book in 5 minutes. Free changes and cancellations up to 48 hours before pickup.',
          },
          {
            iconType: 'headset' as const,
            title: '24/7 customer service',
            description:
              "Our office is staffed 24 hours a day, 365 days a year - we're always here to help you.",
          },
        ],
      }

      const sampleNewsletterBlock = {
        blockType: 'newsletter' as const,
        title: 'Join Our Community',
        description: 'Receive special deals and save up to 20% on bookings.',
        inputPlaceholder: 'Your email address',
        buttonLabel: 'Subscribe',
        disclaimerText: 'By signing up, you agree to our',
        termsLabel: 'Terms and Conditions.',
        termsUrl: '/terms-and-conditions',
        imageUrl:
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      }

      const homeHeroData = {
        heroType: 'imageOverlayUsp' as const,
        heroHeading: 'Reliable airport transfers private taxi or shared shuttle',
        heroSubheading: 'Private transfers & shared shuttles to 700+ airports.',
        heroImageUrl: '/suntransfers-hero.jpg',
        heroOverlayUsps: [
          { icon: 'check' as const, text: 'Free cancellation' },
          { icon: 'plane' as const, text: 'Flight monitoring' },
          { icon: 'card' as const, text: 'No hidden fees' },
          { icon: 'support' as const, text: '24/7 support' },
        ],
        heroBottomUsps: [
          { icon: 'badge' as const, highlight: '18+', text: 'Years of experience' },
          { icon: 'users' as const, highlight: '4M+', text: 'Satisfied travellers yearly' },
          { icon: 'globe' as const, highlight: '700+', text: 'Locations worldwide' },
        ],
      }

      const aboutHeroData = {
        heroType: 'imageOverlayUsp' as const,
        heroHeading: 'Sobre Nosotros · Moving travellers worldwide',
        heroSubheading:
          'Este Hero usa el mismo componente configurable pero sin barra buscadora, con otra imagen de fondo y sus propios USPs encima y debajo.',
        heroImageUrl:
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80',
        heroOverlayUsps: [
          { icon: 'check' as const, text: 'Vetted local drivers' },
          { icon: 'plane' as const, text: 'Global airport coverage' },
          { icon: 'support' as const, text: 'Multilingual 24/7 team' },
        ],
        heroBottomUsps: [
          { icon: 'badge' as const, highlight: '2008', text: 'Founded in Europe' },
          { icon: 'users' as const, highlight: '98%', text: 'Customer satisfaction' },
          { icon: 'globe' as const, highlight: '125+', text: 'Countries covered' },
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
            ...homeHeroData,
            layout: [
              sampleImageCardsBlock,
              sampleIconCardsBlock,
              samplePillsSectionBlock,
              sampleDestinationCardsBlock,
              sampleFaqBlock,
              sampleNewsletterBlock,
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
            ...aboutHeroData,
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

      // 6. Ensure existing 'home' and 'about-us' pages also include the new 'imageCards' and 'pillsSection' blocks if created previously
      for (const targetSlug of ['home', 'about-us']) {
        const existingDoc = existingPages.docs.find((p) => p.slug === targetSlug)
        if (existingDoc) {
          const currentLayout = [...(existingDoc.layout || [])]
          let needsUpdate = false

          const hasImageCards = currentLayout.some((b) => b.blockType === 'imageCards')
          if (!hasImageCards) {
            currentLayout.unshift(sampleImageCardsBlock)
            needsUpdate = true
          }

          const hasIconCards = currentLayout.some((b) => b.blockType === 'iconCards')
          if (!hasIconCards) {
            const imgIdx = currentLayout.findIndex((b) => b.blockType === 'imageCards')
            if (imgIdx >= 0) {
              currentLayout.splice(imgIdx + 1, 0, sampleIconCardsBlock)
            } else {
              currentLayout.unshift(sampleIconCardsBlock)
            }
            needsUpdate = true
          }

          const hasPillsSection = currentLayout.some((b) => b.blockType === 'pillsSection')
          if (!hasPillsSection) {
            const imageCardsIdx = currentLayout.findIndex((b) => b.blockType === 'imageCards')
            if (imageCardsIdx >= 0) {
              currentLayout.splice(imageCardsIdx + 1, 0, samplePillsSectionBlock)
            } else {
              currentLayout.unshift(samplePillsSectionBlock)
            }
            needsUpdate = true
          }

          const hasDestinationCards = currentLayout.some(
            (b) => b.blockType === 'destinationCards',
          )
          if (!hasDestinationCards) {
            const pillsIdx = currentLayout.findIndex((b) => b.blockType === 'pillsSection')
            if (pillsIdx >= 0) {
              currentLayout.splice(pillsIdx + 1, 0, sampleDestinationCardsBlock)
            } else {
              currentLayout.unshift(sampleDestinationCardsBlock)
            }
            needsUpdate = true
          }

          const hasFaq = currentLayout.some((b) => b.blockType === 'faq')
          if (!hasFaq) {
            const destIdx = currentLayout.findIndex((b) => b.blockType === 'destinationCards')
            if (destIdx >= 0) {
              currentLayout.splice(destIdx + 1, 0, sampleFaqBlock)
            } else {
              currentLayout.push(sampleFaqBlock)
            }
            needsUpdate = true
          }

          const hasNewsletter = currentLayout.some((b) => b.blockType === 'newsletter')
          if (!hasNewsletter) {
            const faqIdx = currentLayout.findIndex((b) => b.blockType === 'faq')
            if (faqIdx >= 0) {
              currentLayout.splice(faqIdx + 1, 0, sampleNewsletterBlock)
            } else {
              currentLayout.push(sampleNewsletterBlock)
            }
            needsUpdate = true
          }

          const hasOverlayUsps =
            Array.isArray(existingDoc.heroOverlayUsps) && existingDoc.heroOverlayUsps.length > 0

          if (needsUpdate || !hasOverlayUsps) {
            const heroPatch = targetSlug === 'home' ? homeHeroData : aboutHeroData
            await payload.update({
              collection: 'pages',
              id: existingDoc.id,
              data: {
                ...(hasOverlayUsps ? {} : heroPatch),
                layout: currentLayout,
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
