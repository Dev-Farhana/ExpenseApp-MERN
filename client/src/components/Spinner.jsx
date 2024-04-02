import { Spin } from 'antd';
import React from 'react';

const Spinner = () => {
  return (
    <div
     className="d-flex  align-items-center justify-content-center"
    >
      {<Spin size="large" />}
    </div>
  );
}

export default Spinner;

