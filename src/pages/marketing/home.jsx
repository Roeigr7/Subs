import * as React from 'react';
import { Faqs } from 'components/marketing/home/faqs';
import { Features } from 'components/marketing/home/features';
import { Hero } from 'components/marketing/home/hero';
import { Included } from 'components/marketing/home/included';
import { Productivity } from 'components/marketing/home/productivity';
import { StartBuilding } from 'components/marketing/home/start-building';
import { Testimonails } from 'components/marketing/home/testimonials';
import { configuration } from 'configuration';
import { Helmet } from 'react-helmet-async';

const metadata = { title: configuration.site.name, description: configuration.site.description };

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Hero />
        <Productivity />
        <Included />
        <Features />
        <Testimonails />
        <Faqs />
        <StartBuilding />
      </main>
    </React.Fragment>
  );
}
