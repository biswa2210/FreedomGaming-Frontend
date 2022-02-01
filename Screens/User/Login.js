import React,{useEffect,useState,useContext} from 'react';
import { View,Text,StyleSheet,Button } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import Header from '../../Shared/Header';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
//Context
import AuthGlobal from '../../ContextApi/Store/AuthGlobal';
import { loginUser } from '../../ContextApi/Actions/Auth.actions';
import { Fragment } from 'react';

const Login = (props) => {
    const context = useContext(AuthGlobal);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");
 
    useEffect(() => { 
      
      if (context.stateUser.isAuthenticated === true) {
        props.navigation.navigate("User Profile");
      }
    }, [context.stateUser.isAuthenticated]);

  {
    /*const EmailValidate = (email) => {
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  
      return expression.test(String(email).toLowerCase())
  }*/}

    const handleSubmit = () => {
      
        const user = {
            email,
            password
        }

        if(email === "" || password === "")
        {
            setError("Please Fill Your Credentials Properly")
            
        }else{
           
              loginUser(user,context.dispatch)

        }


    }
    
    return (
      <Fragment>
        <Header></Header>
         <FormContainer title={"Login"}>
        <Input
          placeholder={"Enter Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Enter Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
            {error ? <Error message={error}></Error> : null}
            <EasyButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: "white" }}>Login</Text>
        </EasyButton>
        </View>
        <View style={[{marginTop: 40},styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have any account yet?</Text>
        <EasyButton
        large
        secondary 
        onPress={() => props.navigation.navigate("Register")}>
          <Text style={{ color: "white" }}>Register</Text>
        </EasyButton>
        </View>
      </FormContainer>
      </Fragment>
       
    );
}
const styles = StyleSheet.create({
    buttonGroup: {
      width: "80%",
      alignItems: "center",
    },
    middleText: {
      marginBottom: 20,
      alignSelf: "center",
    },
  });
export default Login;