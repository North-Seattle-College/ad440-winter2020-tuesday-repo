
// The PageTabs.js component introduced tabs into the into the main page.
//the user can change tabs

//Here I imported libraries in order to create tabs
import React from "react";
import ErrorBoundary from './ErrorBoundary';
import {
    useTabState,
    Tab as BaseTab,
    TabList as BaseTabList,
    TabPanel as BaseTabPanel}
from "reakit/Tab";

import '../css/PageTabs.css';

import MachinesMain from './MachinesMain';
import GlobalFilter from './GlobalFilter';
import UserTableFrame from './UserTableFrame';


const TabsContext = React.createContext();

//Function to keep data in the tabs
function Tabs({ children, ...initialState }) {
  const tab = useTabState(initialState);
  const value = React.useMemo(() => tab, Object.values(tab));
  return <TabsContext.Provider value={value}>{children}
    </TabsContext.Provider>;
}

//Function to return base tab
function Tab(props) {
  const tab = React.useContext(TabsContext);
  return <BaseTab {...tab} {...props} />;
}

//Function to create list of tabs
// function TabList(props) {
//   const tab = React.useContext(TabsContext);
//   return <BaseTabList {...tab} {...props} />;
// }

//Function to create the panel
function TabPanel(props) {
  const tab = React.useContext(TabsContext);
  return <BaseTabPanel {...tab} {...props} />;
}

//Function in that combines everything together
//Here we create names for the tabs, and populate them with data
export default function PageTabs() {
  return (
      <div className="tabs">
    <Tabs selectedId="tab1">
        <Tab className = "tabwidth1" stopId="tab1">Tab 1</Tab>
        <Tab className = "tabwidth2" stopId="tab2">Tab 2</Tab>
        <Tab className = "tabwidth3" stopId="tab3">Tab 3</Tab>
        <Tab className = "tabwidth4" stopId="tab4">Tab 4</Tab>
        <Tab className = "tabwidth5" stopId="tab5">Tab 5</Tab>
        <Tab className = "tabwidth6" stopId="tab6">Tab 6</Tab>
        <Tab className = "tabwidth7" stopId="tab7">Tab 7</Tab>
        <Tab className = "tabwidth8" stopId="tab8">Tab 8</Tab>
        <Tab className = "tabwidth9" stopId="tab9">Tab 9</Tab>
        <Tab className = "tabwidth10" stopId="tab10">Tab 10</Tab>
        <Tab className = "tabwidth11" stopId="tab11">Tab 11</Tab>
        <Tab className = "tabwidth12" stopId="tab12">Tab 12</Tab>

<TabPanel stopId="tab1">
      
      
      <ErrorBoundary><MachinesMain/></ErrorBoundary>
      </TabPanel>

<TabPanel stopId="tab2">
      <h2>Machines List</h2>
      <ErrorBoundary><GlobalFilter/></ErrorBoundary>
      <ErrorBoundary><UserTableFrame/></ErrorBoundary>
      </TabPanel>

      <TabPanel stopId="tab3">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
              </TabPanel>

      <TabPanel stopId="tab4">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </TabPanel>

      <TabPanel stopId="tab5">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
              </TabPanel>

      <TabPanel stopId="tab6">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </TabPanel>

      <TabPanel stopId="tab7">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
              </TabPanel>

      <TabPanel stopId="tab8">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </TabPanel>

      <TabPanel stopId="tab9">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
              </TabPanel>

      <TabPanel stopId="tab10">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </TabPanel>

      <TabPanel stopId="tab11">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
              </TabPanel>

      <TabPanel stopId="tab12">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </TabPanel>


          </Tabs>
            </div>
        );
      }
