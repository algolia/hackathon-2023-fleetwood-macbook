import * as Tabs from '@radix-ui/react-tabs';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export type Tab = {
  id: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  content: ReactNode;
};

type TabContainerProps = {
  tabs: Tab[];
  defaultTabId: string;
};

export function TabContainer({ tabs, defaultTabId }: TabContainerProps) {
  return (
    <Tabs.Root defaultValue={defaultTabId}>
      <Tabs.List className="grid grid-cols-3 rounded-t-lg bg-white">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className="flex flex-col border bg-gradient-to-b from-[#DFDFDF] to-90% px-8 transition-colors first-of-type:rounded-tl-lg last-of-type:rounded-tr-lg items-center group hover:bg-gray-100 space-y-2 p-4 text-sm data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600 group-data-[state=active]"
            >
              <TabIcon className="text-black group-hover:animate-bounce group-hover:text-xenon-700 group-data-[state=active]:text-xenon-700" />
              <span className="font-semibold group-data-[state=active]:text-gray-900 text-gray-600 group-hover:text-gray-900">
                {tab.title}
              </span>
              <span className="text-gray-500">{tab.shortDescription}</span>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content key={tab.id} value={tab.id}>
          <div className="min-h-[500px] bg-white flex flex-col">
            {tab.content}
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
