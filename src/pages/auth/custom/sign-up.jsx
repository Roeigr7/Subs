import * as React from 'react';
import { SignUpForm } from 'components/auth/custom/sign-up-form';
import { GuestGuard } from 'components/auth/guest-guard';
import { SplitLayout } from 'components/auth/split-layout';
import { configuration } from 'configuration';

const metadata = { title: `Sign up | Custom | Auth | ${configuration.site.name}` };

export function Page() {
  return (
    <React.Fragment>
      <GuestGuard>
        <SplitLayout>
          <SignUpForm />
        </SplitLayout>
      </GuestGuard>
    </React.Fragment>
  );
}
