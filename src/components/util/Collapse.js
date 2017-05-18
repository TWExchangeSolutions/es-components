import React from 'react';
import Collapse from 'react-smooth-collapse';

/*
  The author of react-smooth-collapse changed things and broke
  support for additional properties. I opened an issue in their
  repo, and for now I'm adding this override to keep the markup
  in Drawer as clean as I can by allowing the passing of id
  and className props.
*/
Collapse.prototype.render = function render() {
  const visibleWhenClosed = this._visibleWhenClosed();
  const { height, fullyClosed, hasBeenVisibleBefore } = this.state;
  const {
    heightTransition,
    children,
    className,
    id
  } = this.props;

  const innerEl = hasBeenVisibleBefore ?
    <div ref="inner" style={{ overflow: 'hidden' }}>
      { children }
    </div>
    : null;

  return (
    <div
      ref="main"
      id={id}
      className={className}
      style={{
        height, overflow: 'hidden',
        display: (fullyClosed && !visibleWhenClosed) ? 'none' : null,
        transition: `height ${heightTransition}`
      }}
    >
      {innerEl}
    </div>
  );
};

export default Collapse;
