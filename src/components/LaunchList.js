import React, { useState } from 'react';
import LaunchCard from './LaunchCard';
import { Pagination } from "@nextui-org/react";

const LaunchList = ({ launches }) => {
  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleLaunches = launches.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className='viewLaunch'>
        <div className='overflow-y-auto max-w-xl'>
          {
            visibleLaunches.map((launch) => (
              <LaunchCard key={launch.id} launch={launch} />
            ))
          }
        </div>    
      </div>
      <div className='pages'>
            <Pagination 
                size={"sm"}
                current={currentPage}
                total={launches.length}
                pageSize={itemsPerPage}
                variant={"faded"}
                onChange={handlePageChange}
            />
      </div>
    </div>
  );
};

export default LaunchList;
