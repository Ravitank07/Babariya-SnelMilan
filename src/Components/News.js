import React, { useContext, useState } from 'react';
import BreadCrumb from './Modal/BreadCrumb';
import { NewsContext } from '../Context/NewsContext';

const News = () => {
  const { addNews } = useContext(NewsContext);
  const [newsItem, setNewsItem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newsItem.trim()) {
      addNews(newsItem);
      setNewsItem('');
    }
  };

  return (
    <div className='pt-[6rem] px-5 h-screen overflow-auto'>
      <BreadCrumb />
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={newsItem}
          onChange={(e) => setNewsItem(e.target.value)}
          placeholder='Enter news'
          className='border p-2'
        />
        <button type='submit' className='ml-2 p-2 bg-blue-500 text-white'>
          Add News
        </button>
      </form>
    </div>
  );
};

export default News;
