import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from './layout/Spinner';
import Pagination from './layout/Pagination';

const Comic = ({
  match: {
    params: { id },
  },
}) => {
  useEffect(() => {
    (async function loadComic() {
      const xkcdAPI = id
        ? `https://getxkcd.now.sh/api/comic?num=${id}`
        : 'https://getxkcd.now.sh/api/comic?num=latest';
      try {
        const res = await axios.get(xkcdAPI);
        !id && setLatestComicNum(res.data.num);
        if (!latestComicNum && id) {
          const latestComicAPI = 'https://getxkcd.now.sh/api/comic?num=latest';
          const res = await axios.get(latestComicAPI);
          setLatestComicNum(res.data.num);
        }
        setComicData({ ...comicData, ...res.data, loading: false });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    setComicData({ loading: true });
  }, [id]);

  const [comicData, setComicData] = useState({ loading: true });
  const [latestComicNum, setLatestComicNum] = useState(0);
  const { loading, title, img, alt, year, month, day, num } = comicData;

  return (
    <main className='landing'>
      <header className='u-center-text u-margin-bottom-medium'>
        <Link to='/' className='header-text'>
          XKCD
        </Link>
      </header>
      {loading ? (
        <Spinner />
      ) : (
        <div className='comic__box'>
          <div aria-live='polite'>
            <div className='comic__heading-box'>
              <h1 className='heading-primary u-center-text u-margin-bottom-small'>
                {title}
              </h1>
              <h2 className='heading-secondary u-center-text'>
                {month}/{day}/{year}
              </h2>
            </div>
            <div className='comic__img-box u-margin-bottom-small'>
              <img src={img} alt={alt} className='comic__img' />
            </div>
          </div>
          <div className='commic__caret-box u-margin-bottom-big'>
            <Link
              to={`/${num === 1 ? '#' : num - 1}`}
              className={`caret-btn btn-prev ${
                num === 1 ? 'caret-btn-light' : ''
              }`}
              aria-label={`Previous, Comic #${num - 1}`}
            >
              <svg
                width='28'
                height='33'
                viewBox='0 0 28 33'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='caret'
              >
                <path
                  d='M27.25 31.6554L1 16.5L27.25 1.34456L27.25 31.6554Z'
                  stroke='#707070'
                />
              </svg>
            </Link>
            <Link
              to={`/${num === latestComicNum ? '#' : num + 1}`}
              className={`caret-btn btn-next ${
                num === latestComicNum ? 'caret-btn-light' : ''
              }`}
              aria-label={`Next, Comic #${num + 1}`}
            >
              <svg
                width='28'
                height='33'
                viewBox='0 0 28 33'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='caret'
              >
                <path
                  d='M0.75 1.34456L27 16.5L0.749999 31.6554L0.75 1.34456Z'
                  stroke='#707070'
                />
              </svg>
            </Link>
          </div>

          <Pagination pageNum={num} latestNum={latestComicNum} />
        </div>
      )}
    </main>
  );
};

export default Comic;
