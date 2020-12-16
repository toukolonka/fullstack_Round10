import { useState, useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const result = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
        console.log(error);
      },
  });
  
  const fetchRepositories = async () => {
    setLoading(true);

    setRepositories(result.data.repositories);

    setLoading(false);
  };

  useEffect(() => {
    if (result.data) {
        fetchRepositories();
    }
  }, [result.data]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;