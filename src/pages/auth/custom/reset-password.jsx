import * as React from 'react';
import { ResetPasswordForm } from 'components/auth/custom/reset-password-form';
import { GuestGuard } from 'components/auth/guest-guard';
import { SplitLayout } from 'components/auth/split-layout';
import { configuration } from 'configuration';
import { Helmet } from 'react-helmet-async';

const metadata = { title: `Reset password | Custom | Auth | ${configuration.site.name}` };

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <GuestGuard>
        <SplitLayout>
          <ResetPasswordForm />
        </SplitLayout>
      </GuestGuard>
    </React.Fragment>
  );
}
