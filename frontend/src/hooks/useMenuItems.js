// File: MyCMS/frontend/src/hooks/useMenuItems.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get('http://localhost:5005/api/pages');
        setMenuItems(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchMenuItems();
  }, []);

  return menuItems;
};

export default useMenuItems;
