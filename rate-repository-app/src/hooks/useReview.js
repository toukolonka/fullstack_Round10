import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error);
    },
  });

  const rev = async ({ repositoryName, ownerName, rating, text }) => {
    rating = Number(rating);
    try {
      const { data } = await mutate({
        variables: { review: { repositoryName, ownerName, rating, text } },
      });
      return data.createReview.repository.id;
    } catch {
      console.log('Error?!?!?!?!');
      return null;
    }
  };

  return [rev, result];
};

export default useReview;