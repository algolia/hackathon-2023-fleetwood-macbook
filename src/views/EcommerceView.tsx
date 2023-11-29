import {Configure, Hits, InstantSearch, RefinementList, SearchBox} from "react-instantsearch";
import {useAlgolia} from "../lib/AlgoliaProvider.tsx";

type Movie = {
    objectID: string;
    title: string;
    budget: number;
    vote_average: number;
    overview: string;
    poster: string;
    original_language: string;
    director: string;
    original_title: string;
    actors: string[];
    price: number;
    featured: boolean;
    revenue: number;
    on_sale: boolean;
    backdrop: string;
    year: number;
    genres: string[];
    release_date: number;
    popularity: number;
    vote_count: number;
};

function Hit({ hit }: { hit: Movie }) {
    return (
        <>
            <img className="w-full" src={hit.backdrop}/>
            <div className="py-2">
                <h3 className="text-md h-10">{hit.title}</h3>
                <button className="px-3.5 py-1 bg-xenon-900 mt-2 text-white rounded self-end">Rent</button>
            </div>

        </>
    )
}

function HitsGrid() {
    return (
        <Hits hitComponent={Hit} classNames={{
            root: 'flex max-w-5xl',
            list: 'flex overflow-x-auto gap-6 px-6 snap-x scroll-px-6',
            item: 'min-w-[16rem] flex flex-col items-start p-0 snap-start shadow-none'
        }}/>
    )
}

function HitsGridLarge() {
    return (
        <Hits hitComponent={Hit} classNames={{
            root: 'flex max-w-5xl',
            list: 'flex overflow-x-auto gap-6 px-6 snap-x scroll-px-6',
            item: 'min-w-[24rem] flex flex-col items-start p-0 snap-start shadow-none'
        }}/>
    )
}

export function EcommerceView() {
    const {searchClient, ecommerceIndexName} = useAlgolia();

    return (
        <>
            <InstantSearch searchClient={searchClient} indexName={ecommerceIndexName}>
                <Configure
                    filters="featured:true"
                />

                <main className="col-span-3">
                    <div className="py-6">
                        <h2 className="text-lg mb-2 px-6">Featured</h2>
                        <HitsGridLarge></HitsGridLarge>
                    </div>
                </main>
            </InstantSearch>

            <InstantSearch searchClient={searchClient} indexName={ecommerceIndexName}>
                <Configure
                    hitsPerPage={10}
                />

                <main className="col-span-3">
                    <div className="py-6">
                        <h2 className="text-lg mb-2 px-6">Popular with others</h2>
                        <SearchBox className="px-6 mb-4"/>
                        <div className="grid grid-cols-4">
                            <div className="px-6">
                                <RefinementList limit={8} attribute="genres"></RefinementList>
                            </div>
                            <div className="col-span-3">
                                <HitsGrid></HitsGrid>
                            </div>
                        </div>
                    </div>
                </main>
            </InstantSearch>
        </>
    );
}
