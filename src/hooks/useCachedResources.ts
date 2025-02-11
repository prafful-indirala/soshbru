import { useEffect, useState } from 'react';

import apolloClient, { apolloPersistor } from '@/utils/apollo-client';

export default function useCachedResources() {
  const [client, setClient] = useState(undefined);
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await apolloPersistor.restore();
        setClient(apolloClient);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return { isLoadingComplete, client };
}
