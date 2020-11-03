import {useState} from 'react'

export const useToggle = () => {
    const [toggle, setToggle] = useState(true);
    const handleToggle = () => setToggle(!toggle);
    return {toggle, handleToggle};
  };