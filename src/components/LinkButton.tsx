import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconName } from '@blueprintjs/core';

type Props = {
  className?: string;
  icon?: IconName;
  text: string;
  to: string;
};

class LinkButton extends React.Component<Props, {}> {
  render() {
    const { className, icon, text, to } = this.props;

    return (
      <Link className={`bp3-button ${className ?? ''}`} to={to}>
        {icon && <Icon icon={icon} />}
        <span className="bp3-button-text">{text}</span>
      </Link>
    );
  }
}

export default LinkButton;
