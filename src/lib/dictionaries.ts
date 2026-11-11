import { DEFAULT_LOCALE, isValidLocale, type LocaleCode } from './i18n'

export type Dictionary = {
  common: {
    noImage: string
    mainNavigation: string
    selectLanguage: string
    pageNotFound: string
    homeNotFoundTitle: string
    homeNotFoundDesc: string
    goToAdmin: string
  }
  inspector: {
    cmsPage: string
    headlessMode: string
    slug: string
    template: string
    font: string
    background: string
    globalTheme: string
    editInAdmin: string
    viewJson: string
    legalDocument: string
    lastUpdated: string
    landingEyebrow: string
  }
  reviews: {
    emptyState: string
    starsLabel: string
  }
  newsletter: {
    emailPlaceholder: string
    subscribeLabel: string
    successPrefix: string
  }
  headless: {
    metaTitle: string
    metaDescription: string
    fixedRoute: string
    eyebrow: string
    heading: string
    subheading: string
    avgRatingLabel: string
    reviewsWord: string
    activePagesLabel: string
    section1Title: string
    section1Hint: string
    cmsTitleLabel: string
    heroHeadingLabel: string
    heroSubheadingLabel: string
    blocksConfiguredLabel: string
    blocksWord: string
    aboutNotFound: string
    section2Title: string
    section2Hint: string
    indexTitle: string
    indexSubtitle: string
    colTitle: string
    colSlug: string
    colTemplate: string
    colWebView: string
    colHeadlessEndpoint: string
  }
}

const en: Dictionary = {
  common: {
    noImage: 'No image',
    mainNavigation: 'Main navigation',
    selectLanguage: 'Select language',
    pageNotFound: 'Page not found',
    homeNotFoundTitle: 'No page with slug “home” exists yet',
    homeNotFoundDesc: 'Create a page with the slug home in the admin panel to display it here.',
    goToAdmin: 'Go to /admin',
  },
  inspector: {
    cmsPage: 'CMS Page',
    headlessMode: 'Headless Mode / Custom Template',
    slug: 'Slug',
    template: 'Template',
    font: 'Font',
    background: 'Background',
    globalTheme: 'Global Theme',
    editInAdmin: 'Edit in /admin',
    viewJson: 'View JSON (Headless API)',
    legalDocument: 'Legal Document',
    lastUpdated: 'Last updated from CMS:',
    landingEyebrow: 'Landing Page · CMS',
  },
  reviews: {
    emptyState: 'No reviews published yet. Add them in /admin/collections/reviews.',
    starsLabel: '{rating} out of 5 stars',
  },
  newsletter: {
    emailPlaceholder: 'Your email address',
    subscribeLabel: 'Subscribe',
    successPrefix: 'Thanks for subscribing with',
  },
  headless: {
    metaTitle: 'Headless Mode (Custom Template) | Payload CMS',
    metaDescription: 'Example of a fixed React template querying Payload data in Headless mode.',
    fixedRoute: 'Fixed route',
    eyebrow: 'Fixed Code Layout + Payload Data',
    heading: 'Custom Template (Headless Mode)',
    subheading:
      'Unlike CMS block pages, this view uses a fixed React layout that queries Payload for the localized data it needs.',
    avgRatingLabel: 'Average rating',
    reviewsWord: 'reviews',
    activePagesLabel: 'Active pages in CMS',
    section1Title: '1. Data fetched from “About Us”',
    section1Hint: 'Queried with Payload Local API for the active locale:',
    cmsTitleLabel: 'CMS Title:',
    heroHeadingLabel: 'Hero Heading:',
    heroSubheadingLabel: 'Hero Subheading:',
    blocksConfiguredLabel: 'Configured blocks:',
    blocksWord: 'blocks',
    aboutNotFound: 'About-us page not found.',
    section2Title: '2. Ready-to-use REST / GraphQL Endpoints',
    section2Hint: 'From any external frontend or client component, pass ?locale= to fetch localized data:',
    indexTitle: 'Payload Pages Index (Live Query)',
    indexSubtitle: 'All pages in the pages collection with both their localized web route and REST endpoint:',
    colTitle: 'Title',
    colSlug: 'Slug',
    colTemplate: 'Template',
    colWebView: 'Web View (CMS)',
    colHeadlessEndpoint: 'Headless Endpoint (JSON)',
  },
}

const de: Dictionary = {
  common: {
    noImage: 'Kein Bild',
    mainNavigation: 'Hauptnavigation',
    selectLanguage: 'Sprache wählen',
    pageNotFound: 'Seite nicht gefunden',
    homeNotFoundTitle: 'Noch keine Seite mit dem Slug „home“ vorhanden',
    homeNotFoundDesc: 'Erstellen Sie eine Seite mit dem Slug home im Admin-Bereich.',
    goToAdmin: 'Zu /admin',
  },
  inspector: {
    cmsPage: 'CMS-Seite',
    headlessMode: 'Headless-Modus / Eigenes Template',
    slug: 'Slug',
    template: 'Template',
    font: 'Schriftart',
    background: 'Hintergrund',
    globalTheme: 'Globales Design',
    editInAdmin: 'In /admin bearbeiten',
    viewJson: 'JSON anzeigen (Headless API)',
    legalDocument: 'Rechtliches Dokument',
    lastUpdated: 'Zuletzt im CMS aktualisiert:',
    landingEyebrow: 'Landingpage · CMS',
  },
  reviews: {
    emptyState: 'Noch keine Bewertungen veröffentlicht.',
    starsLabel: '{rating} von 5 Sternen',
  },
  newsletter: {
    emailPlaceholder: 'Ihre E-Mail-Adresse',
    subscribeLabel: 'Abonnieren',
    successPrefix: 'Vielen Dank für Ihr Abonnement mit',
  },
  headless: {
    ...en.headless,
    metaTitle: 'Headless-Modus (Eigenes Template) | Payload CMS',
    heading: 'Eigenes Template (Headless-Modus)',
    avgRatingLabel: 'Durchschnittsbewertung',
    reviewsWord: 'Bewertungen',
    activePagesLabel: 'Aktive Seiten im CMS',
    colTitle: 'Titel',
    colTemplate: 'Vorlage',
    colWebView: 'Webansicht (CMS)',
  },
}

const it: Dictionary = {
  common: {
    noImage: 'Nessuna immagine',
    mainNavigation: 'Navigazione principale',
    selectLanguage: 'Seleziona lingua',
    pageNotFound: 'Pagina non trovata',
    homeNotFoundTitle: 'Nessuna pagina con slug “home” ancora presente',
    homeNotFoundDesc: 'Crea una pagina con slug home nel pannello di amministrazione.',
    goToAdmin: 'Vai a /admin',
  },
  inspector: {
    cmsPage: 'Pagina CMS',
    headlessMode: 'Modalità Headless / Template fisso',
    slug: 'Slug',
    template: 'Template',
    font: 'Carattere',
    background: 'Sfondo',
    globalTheme: 'Tema Globale',
    editInAdmin: 'Modifica in /admin',
    viewJson: 'Vedi JSON (Headless API)',
    legalDocument: 'Documento Legale',
    lastUpdated: 'Ultimo aggiornamento dal CMS:',
    landingEyebrow: 'Landing Page · CMS',
  },
  reviews: {
    emptyState: 'Nessuna recensione ancora pubblicata.',
    starsLabel: '{rating} su 5 stelle',
  },
  newsletter: {
    emailPlaceholder: 'Il tuo indirizzo email',
    subscribeLabel: 'Iscriviti',
    successPrefix: 'Grazie per esserti iscritto con',
  },
  headless: {
    ...en.headless,
    metaTitle: 'Modalità Headless (Template Fisso) | Payload CMS',
    heading: 'Template Personalizzato (Modalità Headless)',
    avgRatingLabel: 'Valutazione media',
    reviewsWord: 'recensioni',
    activePagesLabel: 'Pagine attive nel CMS',
    colTitle: 'Titolo',
    colTemplate: 'Template',
    colWebView: 'Vista Web (CMS)',
  },
}

const es: Dictionary = {
  common: {
    noImage: 'Sin imagen',
    mainNavigation: 'Navegación principal',
    selectLanguage: 'Seleccionar idioma',
    pageNotFound: 'Página no encontrada',
    homeNotFoundTitle: 'Aún no existe la página con slug “home”',
    homeNotFoundDesc: 'Crea una página con el slug home en el panel de administración para mostrarla aquí.',
    goToAdmin: 'Ir a /admin',
  },
  inspector: {
    cmsPage: 'Página CMS',
    headlessMode: 'Modo Headless / Template Propio',
    slug: 'Slug',
    template: 'Plantilla',
    font: 'Fuente',
    background: 'Fondo',
    globalTheme: 'Tema Global',
    editInAdmin: 'Editar en /admin',
    viewJson: 'Ver JSON (Headless API)',
    legalDocument: 'Documento Legal',
    lastUpdated: 'Última actualización desde el CMS:',
    landingEyebrow: 'Landing Page · CMS',
  },
  reviews: {
    emptyState: 'Aún no hay reviews publicadas. Añádelas desde /admin/collections/reviews.',
    starsLabel: '{rating} de 5 estrellas',
  },
  newsletter: {
    emailPlaceholder: 'Tu correo electrónico',
    subscribeLabel: 'Suscribirse',
    successPrefix: 'Gracias por suscribirte con',
  },
  headless: {
    metaTitle: 'Modo Headless (Template Propio) | Payload CMS',
    metaDescription: 'Ejemplo de un template React fijo que consulta datos a Payload en modo Headless.',
    fixedRoute: 'Ruta fija',
    eyebrow: 'Diseño Fijo en Código + Datos de Payload',
    heading: 'Template a Medida (Modo Headless)',
    subheading:
      'A diferencia de las páginas por bloques del CMS, esta vista usa un layout React fijo que consulta a Payload los datos en el idioma activo.',
    avgRatingLabel: 'Valoración media',
    reviewsWord: 'reviews',
    activePagesLabel: 'Páginas activas en el CMS',
    section1Title: '1. Datos extraídos de “About Us”',
    section1Hint: 'Consultado con la Local API de Payload para el idioma activo:',
    cmsTitleLabel: 'Título en CMS:',
    heroHeadingLabel: 'Hero Heading:',
    heroSubheadingLabel: 'Hero Subheading:',
    blocksConfiguredLabel: 'Bloques configurados:',
    blocksWord: 'bloques',
    aboutNotFound: 'No se encontró la página about-us.',
    section2Title: '2. Endpoints REST / GraphQL listos para usar',
    section2Hint: 'Desde cualquier frontend externo puedes añadir ?locale= para pedir el idioma deseado:',
    indexTitle: 'Índice de Páginas en Payload (Consultado en vivo)',
    indexSubtitle: 'Todas estas páginas existen en la colección pages con su vista web y su endpoint JSON:',
    colTitle: 'Título',
    colSlug: 'Slug',
    colTemplate: 'Plantilla',
    colWebView: 'Vista Web (CMS)',
    colHeadlessEndpoint: 'Endpoint Headless (JSON)',
  },
}

const fr: Dictionary = {
  common: {
    noImage: 'Aucune image',
    mainNavigation: 'Navigation principale',
    selectLanguage: 'Choisir la langue',
    pageNotFound: 'Page introuvable',
    homeNotFoundTitle: 'Aucune page avec le slug « home » n’existe encore',
    homeNotFoundDesc: 'Créez une page avec le slug home dans le panneau d’administration.',
    goToAdmin: 'Aller à /admin',
  },
  inspector: {
    cmsPage: 'Page CMS',
    headlessMode: 'Mode Headless / Modèle personnalisé',
    slug: 'Slug',
    template: 'Modèle',
    font: 'Police',
    background: 'Arrière-plan',
    globalTheme: 'Thème global',
    editInAdmin: 'Modifier dans /admin',
    viewJson: 'Voir JSON (Headless API)',
    legalDocument: 'Document juridique',
    lastUpdated: 'Dernière mise à jour depuis le CMS :',
    landingEyebrow: 'Page d’atterrissage · CMS',
  },
  reviews: {
    emptyState: 'Aucun avis publié pour le moment.',
    starsLabel: '{rating} sur 5 étoiles',
  },
  newsletter: {
    emailPlaceholder: 'Votre adresse e-mail',
    subscribeLabel: 'S’abonner',
    successPrefix: 'Merci pour votre inscription avec',
  },
  headless: {
    ...en.headless,
    metaTitle: 'Mode Headless (Modèle personnalisé) | Payload CMS',
    heading: 'Modèle personnalisé (Mode Headless)',
    avgRatingLabel: 'Note moyenne',
    reviewsWord: 'avis',
    activePagesLabel: 'Pages actives dans le CMS',
    colTitle: 'Titre',
    colTemplate: 'Modèle',
    colWebView: 'Vue Web (CMS)',
  },
}

const nl: Dictionary = {
  common: {
    noImage: 'Geen afbeelding',
    mainNavigation: 'Hoofdnavigatie',
    selectLanguage: 'Selecteer taal',
    pageNotFound: 'Pagina niet gevonden',
    homeNotFoundTitle: 'Er bestaat nog geen pagina met slug “home”',
    homeNotFoundDesc: 'Maak een pagina met slug home aan in het beheerpaneel.',
    goToAdmin: 'Ga naar /admin',
  },
  inspector: {
    cmsPage: 'CMS-pagina',
    headlessMode: 'Headless-modus / Aangepast sjabloon',
    slug: 'Slug',
    template: 'Sjabloon',
    font: 'Lettertype',
    background: 'Achtergrond',
    globalTheme: 'Globaal thema',
    editInAdmin: 'Bewerken in /admin',
    viewJson: 'JSON bekijken (Headless API)',
    legalDocument: 'Juridisch document',
    lastUpdated: 'Laatst bijgewerkt vanuit CMS:',
    landingEyebrow: 'Landingspagina · CMS',
  },
  reviews: {
    emptyState: 'Nog geen beoordelingen gepubliceerd.',
    starsLabel: '{rating} van 5 sterren',
  },
  newsletter: {
    emailPlaceholder: 'Uw e-mailadres',
    subscribeLabel: 'Abonneren',
    successPrefix: 'Bedankt voor uw aanmelding met',
  },
  headless: {
    ...en.headless,
    metaTitle: 'Headless-modus (Aangepast sjabloon) | Payload CMS',
    heading: 'Aangepast sjabloon (Headless-modus)',
    avgRatingLabel: 'Gemiddelde score',
    reviewsWord: 'beoordelingen',
    activePagesLabel: 'Actieve pagina’s in CMS',
    colTitle: 'Titel',
    colTemplate: 'Sjabloon',
    colWebView: 'Webweergave (CMS)',
  },
}

const pl: Dictionary = {
  common: {
    noImage: 'Brak obrazu',
    mainNavigation: 'Nawigacja główna',
    selectLanguage: 'Wybierz język',
    pageNotFound: 'Nie znaleziono strony',
    homeNotFoundTitle: 'Strona ze slugiem „home” jeszcze nie istnieje',
    homeNotFoundDesc: 'Utwórz stronę ze slugiem home w panelu administracyjnym.',
    goToAdmin: 'Przejdź do /admin',
  },
  inspector: {
    cmsPage: 'Strona CMS',
    headlessMode: 'Tryb Headless / Własny szablon',
    slug: 'Slug',
    template: 'Szablon',
    font: 'Czcionka',
    background: 'Tło',
    globalTheme: 'Motyw globalny',
    editInAdmin: 'Edytuj w /admin',
    viewJson: 'Zobacz JSON (Headless API)',
    legalDocument: 'Dokument prawny',
    lastUpdated: 'Ostatnia aktualizacja z CMS:',
    landingEyebrow: 'Strona docelowa · CMS',
  },
  reviews: {
    emptyState: 'Brak opublikowanych opinii.',
    starsLabel: '{rating} z 5 gwiazdek',
  },
  newsletter: {
    emailPlaceholder: 'Twój adres e-mail',
    subscribeLabel: 'Subskrybuj',
    successPrefix: 'Dziękujemy za subskrypcję z adresem',
  },
  headless: {
    ...en.headless,
    metaTitle: 'Tryb Headless (Własny szablon) | Payload CMS',
    heading: 'Własny szablon (Tryb Headless)',
    avgRatingLabel: 'Średnia ocena',
    reviewsWord: 'opinii',
    activePagesLabel: 'Aktywne strony w CMS',
    colTitle: 'Tytuł',
    colTemplate: 'Szablon',
    colWebView: 'Widok WWW (CMS)',
  },
}

const sv: Dictionary = {
  common: {
    noImage: 'Ingen bild',
    mainNavigation: 'Huvudnavigering',
    selectLanguage: 'Välj språk',
    pageNotFound: 'Sidan hittades inte',
    homeNotFoundTitle: 'Det finns ingen sida med slug “home” ännu',
    homeNotFoundDesc: 'Skapa en sida med slug home i adminpanelen.',
    goToAdmin: 'Gå till /admin',
  },
  inspector: {
    cmsPage: 'CMS-sida',
    headlessMode: 'Headless-läge / Egen mall',
    slug: 'Slug',
    template: 'Mall',
    font: 'Typsnitt',
    background: 'Bakgrund',
    globalTheme: 'Globalt tema',
    editInAdmin: 'Redigera i /admin',
    viewJson: 'Visa JSON (Headless API)',
    legalDocument: 'Juridiskt dokument',
    lastUpdated: 'Senast uppdaterad från CMS:',
    landingEyebrow: 'Landningssida · CMS',
  },
  reviews: {
    emptyState: 'Inga omdömen publicerade ännu.',
    starsLabel: '{rating} av 5 stjärnor',
  },
  newsletter: {
    emailPlaceholder: 'Din e-postadress',
    subscribeLabel: 'Prenumerera',
    successPrefix: 'Tack för din prenumeration med',
  },
  headless: {
    ...en.headless,
    metaTitle: 'Headless-läge (Egen mall) | Payload CMS',
    heading: 'Egen mall (Headless-läge)',
    avgRatingLabel: 'Genomsnittligt betyg',
    reviewsWord: 'omdömen',
    activePagesLabel: 'Aktiva sidor i CMS',
    colTitle: 'Titel',
    colTemplate: 'Mall',
    colWebView: 'Webbvy (CMS)',
  },
}

const fi: Dictionary = {
  common: {
    noImage: 'Ei kuvaa',
    mainNavigation: 'Päävalikko',
    selectLanguage: 'Valitse kieli',
    pageNotFound: 'Sivua ei löytynyt',
    homeNotFoundTitle: 'Sivua slugilla “home” ei ole vielä olemassa',
    homeNotFoundDesc: 'Luo sivu slugilla home hallintapaneelissa.',
    goToAdmin: 'Siirry /admin-sivulle',
  },
  inspector: {
    cmsPage: 'CMS-sivu',
    headlessMode: 'Headless-tila / Oma malli',
    slug: 'Slug',
    template: 'Malli',
    font: 'Fontti',
    background: 'Tausta',
    globalTheme: 'Globaali teema',
    editInAdmin: 'Muokkaa /admin-paneelissa',
    viewJson: 'Näytä JSON (Headless API)',
    legalDocument: 'Oikeudellinen asiakirja',
    lastUpdated: 'Viimeksi päivitetty CMS:stä:',
    landingEyebrow: 'Laskeutumissivu · CMS',
  },
  reviews: {
    emptyState: 'Ei vielä julkaistuja arvosteluja.',
    starsLabel: '{rating} / 5 tähteä',
  },
  newsletter: {
    emailPlaceholder: 'Sähköpostiosoitteesi',
    subscribeLabel: 'Tilaa',
    successPrefix: 'Kiitos tilauksesta osoitteella',
  },
  headless: {
    ...en.headless,
    metaTitle: 'Headless-tila (Oma malli) | Payload CMS',
    heading: 'Oma malli (Headless-tila)',
    avgRatingLabel: 'Keskiarvo',
    reviewsWord: 'arvostelua',
    activePagesLabel: 'Aktiiviset sivut CMS:ssä',
    colTitle: 'Otsikko',
    colTemplate: 'Malli',
    colWebView: 'Verkkonäkymä (CMS)',
  },
}

const no: Dictionary = {
  common: {
    noImage: 'Ingen bilde',
    mainNavigation: 'Hovednavigasjon',
    selectLanguage: 'Velg språk',
    pageNotFound: 'Siden ble ikke funnet',
    homeNotFoundTitle: 'Ingen side med slug «home» finnes ennå',
    homeNotFoundDesc: 'Opprett en side med slug home i administrasjonspanelet.',
    goToAdmin: 'Gå til /admin',
  },
  inspector: {
    cmsPage: 'CMS-side',
    headlessMode: 'Headless-modus / Egendefinert mal',
    slug: 'Slug',
    template: 'Mal',
    font: 'Skrifttype',
    background: 'Bakgrunn',
    globalTheme: 'Globalt tema',
    editInAdmin: 'Rediger i /admin',
    viewJson: 'Vis JSON (Headless API)',
    legalDocument: 'Juridisk dokument',
    lastUpdated: 'Sist oppdatert fra CMS:',
    landingEyebrow: 'Landingsside · CMS',
  },
  reviews: {
    emptyState: 'Ingen anmeldelser publisert ennå.',
    starsLabel: '{rating} av 5 stjerner',
  },
  newsletter: {
    emailPlaceholder: 'Din e-postadresse',
    subscribeLabel: 'Abonner',
    successPrefix: 'Takk for at du abonnerer med',
  },
  headless: {
    ...en.headless,
    metaTitle: 'Headless-modus (Egendefinert mal) | Payload CMS',
    heading: 'Egendefinert mal (Headless-modus)',
    avgRatingLabel: 'Gjennomsnittlig vurdering',
    reviewsWord: 'anmeldelser',
    activePagesLabel: 'Aktive sider i CMS',
    colTitle: 'Tittel',
    colTemplate: 'Mal',
    colWebView: 'Nettvisning (CMS)',
  },
}

const hu: Dictionary = {
  common: {
    noImage: 'Nincs kép',
    mainNavigation: 'Fő navigáció',
    selectLanguage: 'Nyelv kiválasztása',
    pageNotFound: 'Az oldal nem található',
    homeNotFoundTitle: 'Még nem létezik „home” slugú oldal',
    homeNotFoundDesc: 'Hozzon létre egy home slugú oldalt az admin felületen.',
    goToAdmin: 'Ugrás az /admin oldalra',
  },
  inspector: {
    cmsPage: 'CMS oldal',
    headlessMode: 'Headless mód / Egyedi sablon',
    slug: 'Slug',
    template: 'Sablon',
    font: 'Betűtípus',
    background: 'Háttér',
    globalTheme: 'Globális téma',
    editInAdmin: 'Szerkesztés itt: /admin',
    viewJson: 'JSON megtekintése (Headless API)',
    legalDocument: 'Jogi dokumentum',
    lastUpdated: 'Utolsó frissítés a CMS-ből:',
    landingEyebrow: 'Landing oldal · CMS',
  },
  reviews: {
    emptyState: 'Még nincsenek közzétett értékelések.',
    starsLabel: '{rating} / 5 csillag',
  },
  newsletter: {
    emailPlaceholder: 'E-mail-címed',
    subscribeLabel: 'Feliratkozás',
    successPrefix: 'Köszönjük a feliratkozást ezzel a címmel:',
  },
  headless: {
    ...en.headless,
    metaTitle: 'Headless mód (Egyedi sablon) | Payload CMS',
    heading: 'Egyedi sablon (Headless mód)',
    avgRatingLabel: 'Átlagos értékelés',
    reviewsWord: 'értékelés',
    activePagesLabel: 'Aktív oldalak a CMS-ben',
    colTitle: 'Cím',
    colTemplate: 'Sablon',
    colWebView: 'Webes nézet (CMS)',
  },
}

const DICTIONARIES: Record<LocaleCode, Dictionary> = {
  en,
  de,
  it,
  es,
  fr,
  nl,
  pl,
  sv,
  fi,
  no,
  hu,
}

export function getDictionary(locale: string | null | undefined): Dictionary {
  return isValidLocale(locale) ? DICTIONARIES[locale] : DICTIONARIES[DEFAULT_LOCALE]
}
