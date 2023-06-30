import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';

test('hata olmadan render ediliyor', () => {
    render(<IletisimFormu/>);

});

test('iletişim formu headerı render ediliyor', () => {
    render(<IletisimFormu/>);
    const header=screen.getByText("İletişim Formu");
    expect(header).toBeInTheDocument;
    expect(header).toBeTruthy;
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    render(<IletisimFormu/>);
    const header1=screen.getByLabelText("Ad*");

    userEvent.type(header1,"acds");
    const errorAd=screen.getAllByTestId("error");
    
    await expect(errorAd).toBeTruthy;

});



test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const btn=screen.getByRole('button');
    userEvent.click(btn);
    const error2=screen.getAllByTestId("error");
    await expect(error2).toHaveLength(3);
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const header2=screen.getByLabelText("Ad*");
    userEvent.type(header2,"acasassds");
    const header3=screen.getByLabelText("Soyad*");
    userEvent.type(header3,"asasasasas");
    const btn=screen.getByRole('button');
    userEvent.click(btn);
    const error2=screen.getAllByTestId("error");
    await expect(error2).toHaveLength(1);

});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    render(<IletisimFormu/>);

    const header2=screen.getByLabelText("Email*");
    userEvent.type(header2,"acasassds");

    const error2= await screen.findAllByText(/email geçerli bir email adresi olmalıdır./i);

    await expect(error2).toBeInTheDocument;
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    render(<IletisimFormu/>);

    const header2=screen.getByLabelText("Ad*");
    userEvent.type(header2,"asasasas");
    const header3=screen.getByLabelText("Email*");
    userEvent.type(header3,"acasassds@gmail.com");
    const btn=screen.getByRole('button');
    userEvent.click(btn);
    const error2=screen.getAllByTestId("error");

    expect(error2).toBeInTheDocument;
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
 render(<IletisimFormu/>);

    const header2=screen.getByLabelText("Ad*");
    userEvent.type(header2,"asasasas");
    const header2Test=screen.queryByText("asasasas");
    expect(header2Test).toBeInTheDocument;
    const header3=screen.getByLabelText("Email*");
    userEvent.type(header3,"acasassds@gmail.com");
    const header3Test=screen.queryByText("acasassds@gmail.com");
    expect(header3Test).toBeInTheDocument;
    const header4=screen.getByLabelText("Soyad*");
    userEvent.type(header4,"sdsdsdsdssd");
    const header4Test=screen.queryByText("sdsdsdsdssd");
    expect(header4Test).toBeInTheDocument;
    const btn=screen.getByRole('button');
    userEvent.click(btn);
    const error2=screen.queryAllByText("error");

    expect(error2).not.toBeTruthy;

});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    render(<IletisimFormu/>);

    const header2=screen.getByLabelText("Ad*");
    userEvent.type(header2,"asasasas");
    const header2Test=screen.queryByText("asasasas");
    expect(header2Test).toBeInTheDocument;
    const header3=screen.getByLabelText("Email*");
    userEvent.type(header3,"acasassds@gmail.com");
    const header3Test=screen.queryByText("acasassds@gmail.com");
    expect(header3Test).toBeInTheDocument;
    const header4=screen.getByLabelText("Soyad*");
    userEvent.type(header4,"sdsdsdsdssd");
    const header4Test=screen.queryByText("sdsdsdsdssd");
    expect(header4Test).toBeInTheDocument;
    const header5=screen.getByLabelText("Mesaj");
    userEvent.type(header5,"of");
    const header5Test=screen.queryByText("of");
    expect(header5Test).toBeInTheDocument;
});
