import { BracesIcon, Building2Icon, ShoppingBagIcon } from 'lucide-react';
import { Tab, TabContainer } from './components/TabContainer';

const tabs: Tab[] = [
  {
    id: 'e-commerce',
    icon: ShoppingBagIcon,
    title: 'E-commerce',
    shortDescription: 'Help customers find your products fast',
    content: <p>Ecommerce</p>,
  },
  {
    id: 'developer',
    icon: BracesIcon,
    title: 'Developer',
    shortDescription: 'Build cool search experiences 😎',
    content: <p>Developer</p>,
  },
  {
    id: 'enterprise',
    icon: Building2Icon,
    title: 'Enterprise',
    shortDescription: 'Work In Progress',
    content: <p>Enterprise</p>,
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
