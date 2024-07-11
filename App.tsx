import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

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

PasswordSchema() is a function that uses yup to validate that the user input is
indeed a number, by defining a schema (user input) as "passwordLength", and 
determining its required type to be a number(). Other properties of yup are shown,
such as .min(), which takes an int as the minimum length of the schema, and an
error message to show when anything less than 4 is entered.

The max() and required() properties above are self-explanatory.
*/

export default function App() {
  return (
    <SafeAreaView>
      <View>
        <Text>App</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})