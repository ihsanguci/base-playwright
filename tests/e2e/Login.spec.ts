import {test, expect} from '../fixtures/globalFixtures'


test.describe('Successful Login', {tag: '@Positive'}, () => {  
  test('Login with valid credentials', {tag: '@TC001'}, async ({ loginPage}) => {
    await loginPage.goto();
    await loginPage.login(process.env.USER_SAUCEDEMO|| '',process.env.PASSWORD_SAUCEDEMO|| ''); 
    await loginPage.expectCartButtonVisible();  
  });
});

test.describe('Failed Login', {tag:'@Negative'}, () =>{

  test.beforeEach(async ({loginPage})=>{
    await loginPage.goto();
  } );

  test('Login fails with wrong username', {tag:'@TC002'}, async ({ loginPage }) => {
    await loginPage.login('invalid_username',process.env.PASSWORD_SAUCEDEMO|| '')
    await loginPage.isErrorMessageVisible();
    await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service')
  })

  test('Login fails with wrong password', {tag:'@TC003'}, async({loginPage})=>{
    await loginPage.login(process.env.USER_SAUCEDEMO|| '','invalid_password')
    await loginPage.isErrorMessageVisible();
    await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service')
  })

  test('Login fails without username', {tag:'@TC004'}, async({loginPage})=>{
    await loginPage.login('',process.env.PASSWORD_SAUCEDEMO|| '')
    await loginPage.isErrorMessageVisible();
    await loginPage.expectErrorMessage('Epic sadface: Username is required')
  })

  test('Login fails without password', {tag:'@TC005'}, async({loginPage})=>{
    await loginPage.login(process.env.USER_SAUCEDEMO|| '','')
    await loginPage.isErrorMessageVisible();
    await loginPage.expectErrorMessage('Epic sadface: Password  is required')
  })


}

);


