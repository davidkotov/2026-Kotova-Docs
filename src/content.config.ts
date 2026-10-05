import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

// Strings for the Kotova chrome (Header, Footer, Search), which replaces
// Starlight's own. One file per language in src/content/i18n/, read with
// `Astro.locals.t('kotova.…')`. Starlight's built-in strings need no entry here.
const kotovaStrings = z
  .object({
    'kotova.nav.support': z.string(),
    'kotova.nav.launchApp': z.string(),
    'kotova.nav.homepageLabel': z.string(),

    'kotova.footer.tagline': z.string(),
    'kotova.footer.company': z.string(),
    'kotova.footer.aboutUs': z.string(),
    'kotova.footer.careers': z.string(),
    'kotova.footer.investorRelations': z.string(),
    'kotova.footer.brandAssets': z.string(),
    'kotova.footer.kotovaX': z.string(),
    'kotova.footer.exchange': z.string(),
    'kotova.footer.assets': z.string(),
    'kotova.footer.guide': z.string(),
    'kotova.footer.docs': z.string(),
    'kotova.footer.legal': z.string(),
    'kotova.footer.termsOfService': z.string(),
    'kotova.footer.imprint': z.string(),
    'kotova.footer.privacyPolicy': z.string(),
    'kotova.footer.copyright': z.string(),
    'kotova.footer.disclaimer': z.string(),

    'kotova.search.clear': z.string(),
    'kotova.search.navigate': z.string(),
    'kotova.search.open': z.string(),
    'kotova.search.close': z.string(),
    'kotova.search.searching': z.string(),
    'kotova.search.unavailable': z.string(),
    'kotova.search.noResults': z.string(),
    'kotova.search.untitled': z.string(),
    // One per CLDR plural category the six locales use; Russian needs all four.
    'kotova.search.resultsOne': z.string(),
    'kotova.search.resultsFew': z.string(),
    'kotova.search.resultsMany': z.string(),
    'kotova.search.resultsOther': z.string(),
  })
  .partial();

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema({ extend: kotovaStrings }) }),
};
