const{ test, expect } = require("@playwright/test")

test ('Verify all books link is visible', async({page}) => {

    await page.goto("http://localhost:3000");
    await page.waitForSelector('nav.navbar');

    let allBooksHref = await page.$('a[href="/catalog"]');
    let isVisible = await allBooksHref.isVisible();

    expect(isVisible).toBe(true);

});

test ('Verify login button visible', async({page}) => {

    await page.goto("http://localhost:3000");
    await page.waitForSelector('nav.navbar');

    let loginButton = await page.$('a[href="/login"]');
    let isVisible = await loginButton.isVisible();

    expect(isVisible).toBe(true);

});

test ('Verify register button visible', async({page}) => {

    await page.goto("http://localhost:3000");
    await page.waitForSelector('nav.navbar');

    let registerButton = await page.$('a[href="/register"]');
    let isVisible = await registerButton.isVisible();

    expect(isVisible).toBe(true);

});

test ('Verify AllBooks link is visible affter login', async({page}) => {

    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.waitForSelector('nav.navbar');

    let allBookLink = await page.$('a[href="/catalog"]');
    let isVisible = await allBookLink.isVisible();

    expect(isVisible).toBe(true);

});


test ('Verify register have register content', async({page}) => {

    await page.goto("http://localhost:3000/login");
    await page.waitForSelector('nav.navbar');

    let registerLink = await page.$('a[href="/register"]');
    const testContentRegister = await registerLink.textContent();

    expect(testContentRegister).toEqual("Register");

});

test ('Verify MyBook link is visible affter login', async({page}) => {

    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.waitForSelector('nav.navbar');

    let myBookButton = await page.$('a[href="/profile"]');
    let isVisible = await myBookButton.isVisible();

    expect(isVisible).toBe(true);

});

test ('Verify AddBook link is visible affter login', async({page}) => {

    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.waitForSelector('nav.navbar');

    let addBookButton = await page.$('a[href="/create"]');
    let isVisible = await addBookButton.isVisible();

    expect(isVisible).toBe(true);

});

test ('Verify email address', async({page}) => {

    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.waitForSelector('nav.navbar');

    let email = await page.$('span');
    const testContentRegister = await email.textContent();

    expect(testContentRegister).toEqual("Welcome, peter@abv.bg");

});

test ('Test login with Valid Credentials', async({page}) => {

    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    let addBookButton = await page.$('a[href="/catalog"]');
  

    expect(page.url()).toBe('http://localhost:3000/catalog');

});

test ('Test login with empty fields', async({page}) => {

    await page.goto("http://localhost:3000/login");
    await page.click('input[type="submit"]');

    page.on( 'dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields')
        await dialog.accept();
    });
    let addBookButton = await page.$('a[href="/login"]');

    expect(page.url()).toBe('http://localhost:3000/login');

});

test ('Test login with an empty email field and a valid password', async({page}) => {

    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="password"]', '123456');
    let submitToLogin = await page.$('input[type="submit"]');
    // await page.click('input[type="submit"]');
    await submitToLogin.click();

    page.on( 'dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields')
        await dialog.accept();
    });
    let addBookButton = await page.$('a[href="/login"]');

    expect(page.url()).toBe('http://localhost:3000/login');

});

test ('Test login with an empty password field and a valid email', async({page}) => {

    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', 'peter@abv.bg');
    let submitToLogin = await page.$('input[type="submit"]');
    // await page.click('input[type="submit"]');
    await submitToLogin.click();

    page.on( 'dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields')
        await dialog.accept();
    });
    let addBookButton = await page.$('a[href="/login"]');

    expect(page.url()).toBe('http://localhost:3000/login');

});

test ('Test login with an empty fields', async({page}) => {

    await page.goto("http://localhost:3000/login");
    let submitToLogin = await page.$('input[type="submit"]');
    // await page.click('input[type="submit"]');
    await submitToLogin.click();

    page.on( 'dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields')
        await dialog.accept();
    });
    let addBookButton = await page.$('a[href="/login"]');

    expect(page.url()).toBe('http://localhost:3000/login');

});
//                 TO REGISTER NEW USER

// test ('Test Register with valid username and password', async({page}) => {

//     await page.goto("http://localhost:3000/register");
//     await page.fill('input[name="email"]', 'test1@abv.bg');
//     await page.fill('input[name="password"]', '123456');
//     await page.fill('#register-form > fieldset > p:nth-child(4) > label', '123456');

//     let submitToLogin = await page.$('input[type="submit"]');
//     await submitToLogin.click();

//     let addBookButton = await page.$('a[href="/login"]');

//     expect(page.url()).toBe('http://localhost:3000/catalog');

// });

test ('Test Register with an empty fields', async({page}) => {

    await page.goto("http://localhost:3000/register");
    
    let submitToLogin = await page.$('input[type="submit"]');
    await submitToLogin.click();

    page.on( 'dialog', async dialog => {
        expect(dialog.type()).toContain('salert');
        expect(dialog.message()).toContain('All fields')
        await dialog.accept();
    });

    let addBookButton = await page.$('a[href="/login"]');

    expect(page.url()).toBe('http://localhost:3000/register');

});

test ('Test Register with an empty email and valid password', async({page}) => {

    await page.goto("http://localhost:3000/register");
    await page.fill('input[name="password"]', '123456');
    await page.fill('#register-form > fieldset > p:nth-child(4) > label', '123456');
    
    let submitToLogin = await page.$('input[type="submit"]');
    await submitToLogin.click();

    page.on( 'dialog', async dialog => {
        expect(dialog.type()).toContain('salert');
        expect(dialog.message()).toContain('All fields')
        await dialog.accept();
    });

    let addBookButton = await page.$('a[href="/login"]');

    expect(page.url()).toBe('http://localhost:3000/register');

});
 
test ('Test Register with an empty password and valid email', async({page}) => {

    await page.goto("http://localhost:3000/register");
    await page.fill('input[name="email"]', 'testValid@abv.bg');

    let submitToLogin = await page.$('input[type="submit"]');
    await submitToLogin.click();

    page.on( 'dialog', async dialog => {
        expect(dialog.type()).toContain('salert');
        expect(dialog.message()).toContain('All fields')
        await dialog.accept();
    });

    let addBookButton = await page.$('a[href="/login"]');

    expect(page.url()).toBe('http://localhost:3000/register');

});