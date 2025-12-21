import { h } from 'preact';
export const HTMLFragment = ({index, item}) => (<span key={index} dangerouslySetInnerHTML={{__html: item}} />);
export const Fragment = ({ children }) => <>{children}</>;
