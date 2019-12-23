import React from 'react';
import LocalizedStrings from 'react-localization';
import en from 'strings/en.json';
import sv from 'strings/sv.json';

export const strings = new LocalizedStrings({
  en,
  sv
});

export const StringContext = React.createContext(strings);

export class StringProvider extends React.Component {
  static contextType = StringContext;
  render() {
    return (
      <StringContext.Provider value={strings}>
        {this.props.children}
      </StringContext.Provider>
    );
  }
}
