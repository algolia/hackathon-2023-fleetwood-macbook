import {
  Configure,
  InstantSearch,
  Pagination,
  SearchBox,
  Stats,
  useHits,
} from 'react-instantsearch';
import { useAlgolia } from '../lib/AlgoliaProvider';
import { useState } from 'react';
import ReactJson from 'react-json-view';

export function DeveloperView() {
  const { searchClient, developerIndexName } = useAlgolia();
  return (
    <InstantSearch searchClient={searchClient} indexName={developerIndexName}>
      <DeveloperViewContent />
      <Configure hitsPerPage={8} analytics={false} clickAnalytics={false} />
    </InstantSearch>
  );
}

function DeveloperViewContent() {
  const hitResponse = useHits();
  const [selectedHit, setSelectedHit] = useState<RecordItem | null>(null);

  return (
    <div className="flex p-4 space-x-4 flex-1 text-gray-900">
      <div className="flex flex-1 flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <SearchBox placeholder="Try searching for Superman" />
          <div className="flex justify-end">
            <Stats className="font-sora text-sm text-xenon-900" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {hitResponse.hits.map((hit) => (
            <SearchResult
              key={hit.objectID}
              hit={hit}
              onClickSearchResult={setSelectedHit}
            />
          ))}
        </div>

        <div className="flex justify-center items-center">
          <Pagination showFirst={false} showLast={false} />
        </div>
      </div>
      <div className="w-96 flex flex-col space-y-4">
        <JSONViewer hit={selectedHit} />
      </div>
    </div>
  );
}

type RecordItem = {
  objectID: string;
  poster: string;
  title: string;
  year: string;
};

type SearchResultProps = {
  hit: RecordItem;
  onClickSearchResult: (hit: RecordItem) => void;
};
function SearchResult({ hit, onClickSearchResult }: SearchResultProps) {
  return (
    <button
      onClick={() => onClickSearchResult(hit)}
      className="flex flex-col rounded-md h-52 text-sm bg-xenon-900/20 relative group hover:bg-gray-200 transition-colors"
    >
      <img
        src={hit.poster}
        alt={hit.title}
        className="rounded-t-md w-full h-full object-contain object-center"
      />
      <div className="absolute flex flex-col justify-center items-center bottom-0 inset-x-0 bg-white/70 p-2 space-y-1 group-hover:bg-white transition-colors">
        <span className="font-medium ">{hit.title}</span>
        <span className="text-xs">{hit.year}</span>
      </div>
    </button>
  );
}

type JSONViewerProps = {
  hit: RecordItem;
};
function JSONViewer({ hit }: JSONViewerProps) {
  if (!hit)
    return (
      <div className="flex flex-1 justify-center text-sm items-center p-2">
        <p className=" text-center">
          Click on any movie on the left-hand side of the screen to see the JSON
          content
        </p>
      </div>
    );
  return (
    <div className="flex overflow-y-auto relative h-full p-2">
      <div className=" absolute inset-0">
        <ReactJson
          src={hit}
          theme="bright:inverted"
          enableClipboard={false}
          collapsed
          collapseStringsAfterLength={40}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
}
