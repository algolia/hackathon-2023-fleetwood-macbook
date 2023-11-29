import { BracesIcon, Building2Icon, ShoppingBagIcon } from 'lucide-react';
import { Tab, TabContainer } from './components/TabContainer';
import { DeveloperView } from './views/DeveloperView';
import { EcommerceView } from './views/EcommerceView';
import { EnterpriseView } from './views/EnterpriseView';

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
    shortDescription: 'Build cool search experiences 😎',
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

function App() {
  return (
    <div className="flex w-screen h-screen justify-center items-center font-sora bg-xenon-900">
      <div className="flex flex-col">
        <TabContainer tabs={tabs} defaultTabId={tabs[0].id} />
      </div>
    </div>
  );
}

export default App;
