import { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN, {
    onError: () => {
      console.log('Wrong credentials');
    },
  });

  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });
      console.log(data);
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
      return true;
    } catch {
      console.log('Wrong credentials');
      return false;
    }
  };

  return [signIn, result];
};

export default useSignIn;
