import dbConnect from '@/utils/dbConnect';
import React from 'react';
import Resource from '@/models/Resource';
import ResourceCard from '@/components/resourceCard';
import Tags from '@/components/tags';
import styles from '../../page.module.css';
import ResourcesList from '@/components/resourcesList';

const Categories = async ({ params }) => {
  const { category } = params;
  await dbConnect();
  const filteredResources = await Resource.find({ categories: category });
  return (
    <>
      <header className='header'>
        <h1>{category} Resources</h1>
        <p className='description'>
          {filteredResources.length === 1
            ? `There Is ${filteredResources.length} item here, why not add some more!`
            : `There Are ${filteredResources.length} items here. `}
        </p>
      </header>
      <div className='resourcesBody'>
        <Tags currentCategory={category} />
        <ResourcesList resources={filteredResources} />
      </div>
    </>
  );
};

export default Categories;
