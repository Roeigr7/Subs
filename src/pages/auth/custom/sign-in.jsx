import * as React from 'react';
import { SignInForm } from 'components/auth/custom/sign-in-form';
import { GuestGuard } from 'components/auth/guest-guard';
import { SplitLayout } from 'components/auth/split-layout';
import { configuration } from 'configuration';
import { Helmet } from 'react-helmet-async';

const metadata = { title: `Sign in | Custom | Auth | ${configuration.site.name}` };

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <GuestGuard>
        <SplitLayout>
          <SignInForm />
        </SplitLayout>
      </GuestGuard>
    </React.Fragment>
  );
}
