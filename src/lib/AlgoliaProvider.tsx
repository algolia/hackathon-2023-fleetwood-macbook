import algoliasearch, { SearchClient } from 'algoliasearch';
import { ReactNode, createContext, useContext, useMemo } from 'react';
import invariant from 'tiny-invariant';

type AlgoliaContextApi = {
  searchClient: SearchClient;
  developerIndexName: string;
  ecommerceIndexName: string;
  enterpriseIndexName: string;
};

const AlgoliaContext = createContext<AlgoliaContextApi | null>(null);
AlgoliaContext.displayName = 'AlgoliaContext';

export function useAlgolia() {
  const context = useContext(AlgoliaContext);

  invariant(context, `useAlgolia() must be used within a <AlgoliaProvider/>.`);

  return context;
}

type AlgoliaProviderProps = {
  appId: string;
  apiKey: string;
  developerIndexName: string;
  ecommerceIndexName: string;
  enterpriseIndexName: string;
  children: ReactNode;
};

export function AlgoliaProvider({
  appId,
  apiKey,
  developerIndexName,
  ecommerceIndexName,
  enterpriseIndexName,
  children,
}: AlgoliaProviderProps) {
  const searchClient = useMemo(
    () => algoliasearch(appId, apiKey),
    [appId, apiKey],
  );

  const contextValue = useMemo(
    () => ({
      searchClient,
      developerIndexName,
      ecommerceIndexName,
      enterpriseIndexName,
    }),
    [searchClient, developerIndexName, ecommerceIndexName, enterpriseIndexName],
  );

  return (
    <AlgoliaContext.Provider value={contextValue}>
      {children}
    </AlgoliaContext.Provider>
  );
}
