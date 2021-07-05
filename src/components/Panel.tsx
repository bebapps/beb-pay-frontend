import classNames from 'classnames';
import React from 'react';
import css from './Panel.module.scss';

interface PanelProps {
  className?: string;
}

const Panel: React.FC<PanelProps> = ({ className, children }) => {
  return (
    <div className={classNames(css.Panel, className)}>
      {children}
    </div >
  );
};

export default Panel;
