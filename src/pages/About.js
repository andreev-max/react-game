import React from "react";

export const About = () => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">About this application</h1>
        <p className="lead">
          This App was creating in <h3 className="year">&nbsp;2021&nbsp;</h3> by &nbsp;
          <a href="https://github.com/nAzdAc" className="link">
            Max Andreev
          </a>
        </p>
        <p className="lead">My LinkedIn&nbsp;
        <a className="link linkedin" href="https://www.linkedin.com/in/max-andreev-b74736207/">Go Connect</a>
        </p>
        <p className="lead">Thank you 
        </p>
        <p className="lead">
          Version <span>1.1.42</span>
        </p>
      </div>
    </div>
  );
};
