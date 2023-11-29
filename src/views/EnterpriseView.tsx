import { Configure, InstantSearch, useHits } from 'react-instantsearch-core';
import { useAlgolia } from '../lib/AlgoliaProvider';
import { Pagination, SearchBox, Stats } from 'react-instantsearch';

export function EnterpriseView() {
  const { searchClient, enterpriseIndexName } = useAlgolia();
  return (
    <InstantSearch searchClient={searchClient} indexName={enterpriseIndexName}>
      <EnterpriseViewContent />
      <Configure hitsPerPage={6} analytics={false} clickAnalytics={false} />
    </InstantSearch>
  );
}

function EnterpriseViewContent() {
  const response = useHits();
  return (
    <div className="flex flex-col flex-1 py-2 px-8 space-y-4">
      <div className="flex flex-col space-y-2">
        <SearchBox placeholder="Try search for Karen" />
        <div className="flex justify-end">
          <Stats className="font-sora text-sm text-xenon-900" />
        </div>
      </div>
      <div className="flex flex-1 w-full">
        <EnterpriseContactTable contacts={response.hits} />
      </div>
    </div>
  );
}

type RecordItem = {
  objectID: string;
  email: string;
  firstname: string;
  lastname: string;
  company: string;
  address: string;
  county: string;
};
type EnterpriseContactTableProps = {
  contacts: RecordItem[];
};

function EnterpriseContactTable({ contacts }: EnterpriseContactTableProps) {
  const tableHeaders = ['Email', 'Name', 'Address', 'Company', 'County'];
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="w-full h-full relative overflow-y-hidden overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5">
        <table className="min-w-full divide-y divide-gray-300 absolute inset-0">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-8 py-3.5  text-left text-sm font-semibold text-gray-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {contacts.map((contact) => (
              <tr key={contact.objectID}>
                <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-900 px-8">
                  {contact.email}
                </td>
                <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-900 px-8">
                  {contact.address}
                </td>
                <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-900 px-8">
                  {`${contact.lastname} ${contact.firstname}`}
                </td>
                <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-900 pl-4 pr-8">
                  {contact.company}
                </td>
                <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-900 px-8">
                  {contact.county}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a href="#" className="text-xenon-600 hover:text-xenon-900">
                    Edit<span className="sr-only">, {contact.email}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center">
        <Pagination showFirst={false} showLast={false} />
      </div>
    </div>
  );
}
