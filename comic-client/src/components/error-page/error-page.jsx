import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import './error-page.scss';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <Card className="error-info">
        <CardContent>
          <p>It looks like something went wrong...</p>
          <Link to="/">
            <b>Home</b>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
