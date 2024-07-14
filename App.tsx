import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

//Form validation
import * as Yup from 'yup'

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
    <SafeAreaView>
      <View>
        <Text>App</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})