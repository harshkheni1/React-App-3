import React from 'react';

export interface SectionContext {
  collapsable: boolean;
  expanded: boolean;
  updateExpanded: () => void;
}

const SectionContext = React.createContext<SectionContext>(null);

export default SectionContext;
