import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ activator, children }) => {
  const [open, setOpen] = useState(false);
  const dropdown = useRef(null);

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (dropdown && !dropdown.current.contains(event.target)) {
        toggle();
      }
    };

    if (open) {
      window.addEventListener('mousedown', handleClick);
    }

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [open]);

  return (
    <div onClick={toggle} ref={dropdown}>
      <div>{activator}</div>
      {open ? children : null}
    </div>
  );
};

export default Dropdown;
