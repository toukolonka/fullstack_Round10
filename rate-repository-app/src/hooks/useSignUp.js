import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error);
    },
  });

  const signUp = async ({ username, password }) => {
    try {
        const { data } = await mutate({
          variables: { user: { username, password } },
        });
        console.log(data);
        return data.createUser.id;
      } catch {
        console.log('Error?!?!?!?!');
        return null;
      }
  };

  return [signUp, result];
};

export default useSignUp;