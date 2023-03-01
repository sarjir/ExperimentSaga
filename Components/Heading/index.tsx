import React, {
  Children,
  FunctionComponentElement,
  ReactComponentElement,
} from 'react';

const Heading: React.FC = (props) => {
  return <h2>{props.children}</h2>;
};

export default Heading;
