import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDelete = () => {
  const [mutate, { data }] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log(error);
    },
  });

  const del = async (variables) => {
    try {
        await mutate({ variables });
      } catch {
        return null;
      }
  };

  return [del, data];

};

export default useDelete;