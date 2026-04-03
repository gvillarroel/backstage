import { useEffect } from 'react';
import { SignInPage } from '@backstage/core-components';
import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { SignInPageBlueprint, type SignInPageProps } from '@backstage/plugin-app-react';

function isPublicAppMode() {
  return (
    document
      .querySelector('meta[name="backstage-app-mode"]')
      ?.getAttribute('content') === 'public'
  );
}

function PublicAwareSignInPage(props: SignInPageProps) {
  useEffect(() => {
    if (!isPublicAppMode()) {
      return;
    }

    const guestIdentity: Parameters<SignInPageProps['onSignInSuccess']>[0] = {
      getProfileInfo: async () => ({
        email: 'guest@example.com',
        displayName: 'Guest',
      }),
      getBackstageIdentity: async () => ({
        type: 'user',
        userEntityRef: 'user:default/guest',
        ownershipEntityRefs: ['user:default/guest'],
      }),
      getCredentials: async () => ({}),
      signOut: async () => undefined,
    };

    props.onSignInSuccess(guestIdentity);
  }, [props]);

  if (isPublicAppMode()) {
    return null;
  }

  return <SignInPage {...props} providers={['guest']} />;
}

export const authModule = createFrontendModule({
  pluginId: 'app',
  extensions: [
    SignInPageBlueprint.make({
      params: {
        loader: async () => PublicAwareSignInPage,
      },
    }),
  ],
});
