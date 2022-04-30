import React from 'react';
import { Icon } from '../../icon';
import { components } from 'react-select';

export const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <span className="react-select__dropdown-indicator-inner">
        <Icon name="angle" measure={8} color="gray800" />
      </span>
    </components.DropdownIndicator>
  );
};

export const ClearIndicator = (props: any) => {
  return (
    <components.ClearIndicator {...props}>
      <span className="react-select__clear-btn">
        <Icon name="close" measure={10} color="black" />
      </span>
    </components.ClearIndicator>
  );
};

export const NoOptionsMessage = (props: any) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span className="react-select__no-result">No results found</span>
    </components.NoOptionsMessage>
  );
};

export const OptionBasic = (props: any) => {
  return (
    <components.Option {...props}>
      <span className="react-select__radio-ico">
        <Icon name="check" color="white" measure={12} />
      </span>
      {props.children}
    </components.Option>
  );
};

export const OptionLocation = (props: any) => {
  return (
    <components.Option {...props} className="react-select__location-wrap">
      <span className="react-select__location-icon">
        <Icon name="map-marker" measure={22} />
      </span>
      {props.children}
    </components.Option>
  );
};

export const OptionMultiple = (props: any) => {
  return (
    <components.Option {...props}>
      <span className="react-select__check-ico">
        <Icon name="check" color="white" measure={12} />
      </span>
      {props.children}
    </components.Option>
  );
};

export const MultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove {...props}>
      <Icon name="close" measure={10} color="black" />
    </components.MultiValueRemove>
  );
};
