import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

//Importing Formik
import { Formik } from 'formik';

//Form validation
import * as Yup from 'yup'
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'Length must be at least 4')
  .max(30, 'Length cannot be longer than 30')
  .required('Fill this field before continuing')
})

/* 
Lines 5-12 are an example of the yup package being used. It was downloaded by
following instructions from the website https://www.npmjs.com/package/yup. 
The purpose of yup is schema validation. In this case, the user-inputted
schema will be a number that defines how long the password should be.

PasswordSchema is a function that uses yup to validate that the user input is
indeed a number, by defining a schema (user input) as "passwordLength", and 
determining its required type to be a number(). Other properties of yup are shown,
such as .min(), which takes an int as the minimum length of the schema, and an
error message to show when anything less than 4 is entered.

The max() and required() properties above are self-explanatory.

IT IS DEFINED OUTSIDE OF App()
*/

export default function App() {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  /*
  Beginning at line 33 (or wherever it says: 
  const [password, setPassword] = useState('') )
  You have use the useState hook to basically use state and other react features
  without having to write a class. Within the decalred array, the first element is
  the actual variable, such as the password, and the next element is the method
  you use to alter the variable, such as setPassword. the useState() takes whatever
  you have put in its paranthesis, and makes it the default value. That can be a
  string, character, boolean, number, etc.

  The generatePasswordString(), createPassword(), and resetPasswordState() functions
  is where the magic happens in terms of functionality...
  */

  const generatePasswordString = (passwordLength: number) => {
    let characterList = ''
    //characterList exists to contain all the below characters depending on the useState of the above stuff

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWRXYZ'
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const digitChars = '0123456789'
    const specialChars = '!@#$%^&*()_+'

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    //The above four if conditions check the state of each of these, and if true, adds the corresponding characters to characterList.
    //This is then passed to the createPassword() method, which uses this character list, and the given passwordLength, to generate
    //a password. The password is then set to the passwordResult below, and setIsPassGenerated is set to true.

    const passwordResult = createPassword(characterList, passwordLength)

    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    // Initialized as an empty string.

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length) 
      // The above line works as Math.random() returns a floating point number
      // between 0 and 1, and this is mulitplied by the length of characters, to
      // set characterIndex to the value of a whole number, which will always
      // round to a whole number even if the result is a decimal, due to Math.round()
      
      result += characters.charAt(characterIndex)
      // This returns the character in the string 'characters', at position
      // characterIndex, and append it to the 'result' string.
    }
    return result
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)

    /*
    This above method is super simple, it just resets all the states back to what they originally were, as per line 33 and onwards
    where you used the useState hook initially, and set the base state of everything.
    */
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          {/* Above you can see I've set up the ScrollView, SafeAreaView, and the initial View we will be working in, 
          the next step is to implement Formik. This is done below:     */}

          <Formik
        initialValues={{ passwordLength: '' }} //Initial passwordLength is empty

        validationSchema={PasswordSchema} //This method of validation uses Yup from before, where we defined PasswordSchema, and 
        //the validation schema for it upwards on lines 10-15

        onSubmit={ values => { //'values => {}' passes the 'values' from the form into whatever method you define between {} the curly brackets.
          console.log(values)
          generatePasswordString(Number(values.passwordLength)) //You technically have to parse 'passwordLength' into a number, as it is currently
          // and object being returned as a string. So you pass Number(values.passwordLength) as the parameter for the generatePasswordString method
          // that we wrote before and all should be good. 
        }}
      >
        {({
          values,
          errors,
          touched,
          isValid, //We added this one
          handleChange,
          handleSubmit,
          handleReset, // And we added this one
          /* and other goodies */
        }) => (
          <>
          <View style={styles.inputWrapper}>
            <View style={styles.inputColumn}>
              <Text style={styles.heading}>Password Length</Text>
              
              {touched.passwordLength && errors.passwordLength && ( // From this line (line 158, to line 162) is how you should error messages
                <Text style={styles.errorText}>                     
                  {errors.passwordLength}
                </Text>
              )}

            </View>
            <TextInput 
              style={styles.inputStyle} 
              value={values.passwordLength}
              onChangeText={handleChange('passwordLength')} // THIS IS ALSO CRUCIAL TO FORMIK. Line 167 and 168 go hand in hand. 
              placeholder='Ex. 8' // Just a placeholder within the TextInput field
              keyboardType='numeric'

/* THIS IS CRUCIAL. LINE 167 AND 168 GO HAND IN HAND! - ('value' and 'onChangeText'):

In line 167, you are storing the inputted value within the TextInput field into the 'values' object from Formik, specifically
the 'passwordLength property, so that it knows that the passwordLength is what is being tracked by this TextInput field.

In line 168, you are essentially telling the program what to do when somebody changes the text. You are using the event, which
is given to you as a hook in line 148, called 'handleChange', and you track 'passwordLength' in the handleChange (but its kind of
weird coz you type it in as a string). What this essentially does is put up all the validation on the text changes within the 
TextInput field, to validate it the way that you have specified earlier in the program using Yup validation. 
*/
              />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include lowercase letters</Text>

            <BouncyCheckbox
            disableBuiltInState
            isChecked={lowerCase} //This is a boolean that is set to whatever the default value we have defined is, in this case it is 'lowercase' which is defined as true by default.
            onPress={() => setLowerCase(!lowerCase)} //just toggles the value of lowercase to true/false when pressed
            fillColor="#29AB87"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include uppercase letters</Text>

            <BouncyCheckbox
            disableBuiltInState
            isChecked={upperCase} //This is a boolean that is set to whatever the default value we have defined is, in this case it is 'uppercase' which is defined as true by default.
            onPress={() => setUpperCase(!upperCase)} //just toggles the value of uppercase to true/false when pressed
            fillColor="#29AB87"
            />
          </View>
          
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include numbers</Text>

            <BouncyCheckbox
            disableBuiltInState
            isChecked={numbers} //This is a boolean that is set to whatever the default value we have defined is, in this case it is 'numbers' which is defined as true by default.
            onPress={() => setNumbers(!numbers)} //just toggles the value of numbers to true/false when pressed
            fillColor="#29AB87"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include symbols</Text>

            <BouncyCheckbox
            disableBuiltInState
            isChecked={symbols} //This is a boolean that is set to whatever the default value we have defined is, in this case it is 'symbols' which is defined as true by default.
            onPress={() => setSymbols(!symbols)} //just toggles the value of symbols to true/false when pressed
            fillColor="#29AB87"
            />
          </View>

          <View style={styles.formActions}>
            <TouchableOpacity 
            disabled={!isValid} //Is valid is one of the Formik hooks, provided in line 148. Essentially it means you can't press "Generate Password" until all validations are checked by Yup and are okay.
            style={styles.primaryBtn}
            onPress={handleSubmit} // You DON'T write your own handle method here. This will take all the info in the form, whatever is needed/specified, and
                                  // will submit it for you to whatver you defined as 'onSubmit' in line 137, doing all the error checking etc. for you.
            >
              <Text style={styles.generatedPassword}>Generate Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={ () => {
              handleReset()
              resetPasswordState()
            }} //From lines 242 to 245 is how you pass your own method to onPress in case you wanted to do something like this resetPasswordState(), where no info is being collected, but everything is reseted to default values.
            >
              <Text style={styles.secondaryBtnTxt}>Reset</Text>
            </TouchableOpacity>

          </View>
          </>
        )}
          </Formik>

        </View>

        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to Copy</Text>
            <Text 
            selectable={true} //means you can long press the provided text and select and highlight it
            style={styles.generatedPassword}
            >
              {password} 
              {/* Above is the generated password that is set by the generatePasswordString() method you made above */}
            </Text> 
          </View>
        ) : null}

      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})