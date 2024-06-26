'use client';
import styles from './reccomend.module.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Recommend = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState([]);
  const resourceCategories = [];

  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    const categories = await response.json();
    console.log('categories===============', categories);
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleCategories = (event) => {
    resourceCategories.push(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formattedFormData = Object.fromEntries(formData);
    const newTagsArray = formattedFormData.newTags
      .split(' ')
      .filter((tag) => tag !== '');

    const dataWithContributer = {
      ...formattedFormData,
      contributorsGithubID: session?.user?.githubId,
      contributorsPhoto: session?.user?.image,
      contributorsName: session?.user?.name,
      author: session?.user?.id,
      image: `https://f3.allesedv.com/100/${formattedFormData.url}`,
      categories: [...resourceCategories, ...newTagsArray],
      published: true,
    };

    console.log('dataWithContributer>>>>>>>>>>>>>>>', dataWithContributer);
    const response = await fetch(`/api/resource`, {
      method: 'POST',
      body: JSON.stringify(dataWithContributer),
    });

    // const emailConfirmation = await fetch(`/api/send`, {
    //   method: 'POST',
    //   body: JSON.stringify(dataWithContributer),
    // });

    const data = await response.json();
    router.push(`/resource/${data._id}`);
  };

  // interface Resource {
  //   title: string;
  //   description: string;
  //   url: string;
  //   image: string;
  //   categories: Array<string>;
  // }

  if (status === 'authenticated') {
    return (
      <main className={`${styles.main} main`}>
        <h1>Recommend</h1>
        <p>Recommend what you think would work here! just fill out the form.</p>
        <form id={`${styles.Forms} Forms`} onSubmit={handleSubmit}>
          <label htmlFor='title'>Title:</label>
          <input name='title' type='text' />
          <label htmlFor='description'>Description:</label>
          <textarea name='description' type='text' rows='5' cols='33' />
          <label htmlFor='url'>Url:</label>
          <input name='url' type='text' />
          <section>
            <p>Tags Section</p>
            <div className={styles.tags}>
              {categories.map((tag) => {
                return (
                  <div className={styles.tag} key={tag}>
                    <input
                      type='checkbox'
                      onChange={(e) => toggleCategories(e)}
                      value={tag}
                    />
                    <label htmlFor={tag}>{tag}</label>
                  </div>
                );
              })}
            </div>
            <div className={styles.customTagsSection}>
              <label id='newTags'>Define your own tags:</label>
              <input
                name='newTags'
                type='text'
                id='newTags'
                placeholder='CSS HTML Javascript'
              />
              <p className={styles.details}>
                enter your tags seperated by a space
              </p>
            </div>
          </section>
          <button className='button submitButton'>
            <h2>submit</h2>
          </button>
        </form>
      </main>
    );
  }
  return (
    <>
      <Link href='/'> Home </Link>
      <h1>Login to access this page</h1>
    </>
  );
};

export default Recommend;
