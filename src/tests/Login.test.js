import React from 'react';
import { Provider } from "react-redux";
import {render, fireEvent, screen, act, waitFor , within} from '@testing-library/react';
import Login from '../containers/Login';
import configureMockStore from "redux-mock-store";
import App from "../App"


const mockStore = configureMockStore();
const store = mockStore({});

const setupLogin = () => {
  const utils = render(<Provider store={store}><Login /></Provider>)
  const user = utils.getByLabelText('Username')
  const pass = utils.getByLabelText('Password')
  const submit = utils.getByText('Login')
  return {
    user,
    pass,
    utils,
    submit
  }
}


describe("inputs", () => {
 
   test("should validate correct input username", () => {
      const data = "112233"
      const { user } = setupLogin()
      fireEvent.change(user, {target: {value: data}})
      expect(user.value).toBe(data)
  })


   test("should validate correct input password", () => {
      const data = "112233"
      const { pass } = setupLogin()
      fireEvent.change(pass, {target: {value: data}})
      expect(pass.value).toBe(data)
  })


})


describe("login", () => {
   test("Alert sent succesfully", async () => {
      const { submit, utils } = setupLogin()
      fireEvent.click(submit) 
       await waitFor(async () => {
          
          await setTimeout(()=> expect( screen.findByTestId("error")).toBeInTheDocument() ,2000)
        });
  });

   test("incorrect login data", async () => {
      const { submit, utils, pass, user } = setupLogin()
      fireEvent.change(pass, {target: {value: 222333}})
      fireEvent.change(pass, {target: {value: 1112222}})
      fireEvent.click(submit) 

       await waitFor(async () => {
          await setTimeout(()=> {
             const {findByText} = within(screen.findByTestId("alert"))
             expect( findByText(/incorrect/)).toBeInTheDocument()} ,2000)
        });
  });

   test("correct login data", async () => {
      const { submit, utils, pass, user } = setupLogin()
      fireEvent.change(pass, {target: {value: 'testuser'}})
      fireEvent.change(pass, {target: {value: 'password'}})
      fireEvent.click(submit) 

       await waitFor(async () => {
           await setTimeout(()=> {
             const {findByText} = within(screen.findByTestId("alert"))
             expect( findByText(/success/)).toBeInTheDocument()
          } ,2000)

        });
  });


})