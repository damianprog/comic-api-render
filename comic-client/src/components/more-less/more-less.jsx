import React, { useState } from 'react';
import { Fragment } from 'react';
import './more-less.scss';

const MoreLess = ({ text, length }) => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const currentText = () => {
    return expand ? text : text.substring(0, length);
  };

  return (
    <p className="more-less">
      {currentText()}

      {text.length > length && (
        <Fragment>
          {!expand && '...'}
          <span className="toggle" onClick={toggleExpand}>
            {expand ? ' less' : ' more'}
          </span>
        </Fragment>
      )}
    </p>
  );
};

export default MoreLess;
