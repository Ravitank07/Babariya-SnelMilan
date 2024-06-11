import React, { useContext } from 'react';
import { NewsContext } from '../Context/NewsContext';

const NewsMessage = () => {
  const { news } = useContext(NewsContext);

  return (
    <div className='p-5'>
      <h1 className='text-xl font-bold mb-4'>News</h1>
      <ul>
        {news.map((item, index) => (
          <li key={index} className='border-b p-2'>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsMessage;
