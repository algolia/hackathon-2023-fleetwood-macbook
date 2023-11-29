import { BracesIcon, Building2Icon, ShoppingBagIcon } from 'lucide-react';
import { Tab, TabContainer } from './components/TabContainer';
import { DeveloperView } from './views/DeveloperView';
import { EcommerceView } from './views/EcommerceView';
import { EnterpriseView } from './views/EnterpriseView';
import { AlgoliaProvider } from './lib/AlgoliaProvider';

const tabs: Tab[] = [
  {
    id: 'e-commerce',
    icon: ShoppingBagIcon,
    title: 'E-commerce',
    shortDescription: 'Help customers find your products fast',
    content: <EcommerceView />,
  },
  {
    id: 'developer',
    icon: BracesIcon,
    title: 'Developer',
    shortDescription: 'Build cool search experiences 😎 with your data.',
    content: <DeveloperView />,
  },
  {
    id: 'enterprise',
    icon: Building2Icon,
    title: 'Enterprise',
    shortDescription: 'Work In Progress',
    content: <EnterpriseView />,
  },
];

const appId = import.meta.env.VITE_APP_ID;
const apiKey = import.meta.env.VITE_API_KEY;
const developerIndexName = 'FleetwoodMacBook_developer';
const enterpriseIndexName = '';
const ecommerceIndexName = '';

function App() {
  return (
    <AlgoliaProvider
      apiKey={apiKey}
      appId={appId}
      developerIndexName={developerIndexName}
      ecommerceIndexName={ecommerceIndexName}
      enterpriseIndexName={enterpriseIndexName}
    >
      <div className="flex w-screen h-screen justify-center items-center font-sora bg-xenon-900">
        <div className="flex flex-col max-w-5xl">
          <TabContainer tabs={tabs} defaultTabId={tabs[0].id} />
        </div>
      </div>
    </AlgoliaProvider>
  );
}

export default App;
