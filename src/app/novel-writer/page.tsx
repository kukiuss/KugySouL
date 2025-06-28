"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the TabsContainer component with no SSR
const NovelWriterTabs = dynamic(
  () => import('../../components/novel-writer/TabsContainer'),
  { ssr: false }
);

const NovelWriterPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <NovelWriterTabs />
    </div>
  );
};

export default NovelWriterPage;