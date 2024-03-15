import { useEffect } from 'react';

// routing
import Routes from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';

import ThemeCustomization from 'themes';
import 'react-awesome-lightbox/build/style.css';
// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { getAuth, isTokenExpired, token } from 'api/auth';
import BaseApi from 'api/BaseApi';
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => {
    // const [loading, setLoading] = useState(false);
    // const { logout} = useAuth();

    useEffect(() => {
        const { id, token } = getAuth();
        if (id && token) {
            BaseApi.init(id, token);
        }
    }, []);

   // Initialize useRouter
    useEffect(() => {
      if (!token || isTokenExpired(token)) {
       localStorage.clear();
      }
  
    }, [])
  
    return (
        <ThemeCustomization>
            <RTLLayout>
                <Locales>
                    <NavigationScroll>
                        <AuthProvider>
                            <>
                                <Routes />
                                <Snackbar />
                            </>
                        </AuthProvider>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};

export default App;
