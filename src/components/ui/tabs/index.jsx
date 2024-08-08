import { h } from 'preact';
import style from './index.module.css';
import { useState } from 'preact/hooks';

const Tab = ({ children}) => <div class={style.tab}>{children}</div>;

const TabContent = ({ children, isHidden }) => (
  <section class={style.tabcontent} role="tabpanel" hidden={isHidden}>
    {children}
  </section>
);

const TabHeader = ({ children, title, isActive, onSelect }) => (
  <li class={style.tabheader} role="presentation" onClick={onSelect}>
    <a href={`#${title}`} role="tab" aria-selected={isActive} class={isActive ? style.active : ''}>{children}</a>
  </li>
);

const Tabs = ({ children }) => {
  const [ activeTab, setActiveTab ] = useState(0);

  return (
    <div class={style.tabs}>
      <ul class={style.tablist} role="tablist">
        {children.map((tab, id) => 
          <TabHeader
            key={id}
            title={tab.props.title}
            isActive={activeTab === id}
            onSelect={() => setActiveTab(id)}
          >
            {tab.props.title}
          </TabHeader>
        )}
      </ul>
      {children.map((tab, id) => 
        <TabContent key={id} isHidden={!(activeTab === id)}>{tab.props.children}</TabContent>
      )}
    </div>
  ); 
}

export {
  Tab,
  Tabs
}
