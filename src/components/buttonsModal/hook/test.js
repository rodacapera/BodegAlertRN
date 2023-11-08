import React, {useEffect} from 'react';

const test = props => {
  useEffect(() => {
    const a = props.a;
  }, []);

  return <div>test</div>;
};

export default test;
