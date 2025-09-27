import { render } from "@testing-library/react";
import Scoops from ".";
import { screen } from "@testing-library/react";    
import userEvent from '@testing-library/user-event';

/*
! Seçiciler

? Method [All] BySeçici
* Method > get | find | query 
* get > element başlangıçta DOM da varsa kullanılır eleman yoksa hata verir
* find > elementin ne zaman ekrana basılacağı belli değilse kullanılır (async)
* query > get ile benzer şekilde çalışır elementin ekranda olmaması gerektiğinde kullanılır eleman yoksa null döner

*not: find methodu promise döner bu yüzden async await kullanılır

*eğer All kullanılırsa elementin birden fazla olması beklenir ve her zaman (dizi) array döner
*/

// Ürünler ekrana geliyor mu?
test("API'dan gelen veriler için ekrana kartlar basılır", async () => {
  render(<Scoops />);

  // ekrana basılan resimleri al
  const images = await screen.findAllByAltText('çeşit-resim');

  // gelen resimlerin sayısı 1 den büyük mü
  expect(images.length).toBeGreaterThanOrEqual(1);
});

// ekleme ve sıfırlama butonlarının işlevselliği
test('Çeşit ekleme ve sıfırlamanın toplama etkisi', async () => {
  render(<Scoops />);
  const user = userEvent.setup();

  // 1- ekle ve sıfırlama Butonlarını çağırma
  // find tek bir eleman için kullanılır
  // birden fazla eleman için findAll kullanılır
  // getAll kullanılamaz çünkü başlangıçta butonlar yok
  // queryAll kullanılamaz çünkü butonlar var
  // await bekleme süresi verir api dan veri gelene kadar bekler

  const addButtons = await screen.findAllByRole('button', {
    name: 'Ekle',
  });

  const delButtons = await screen.findAllByRole('button', {
    name: 'Sıfırla',
  });

  //2- toplam Spanı Çağır
  // burda getbyrole kullanıyoruz çünkü bir tane element var ve başlangıçta da var
  const total = screen.getByRole('heading', {
    name: /çeşitler ücreti/i,
  });

  //3- topla Fiyatı 0'dır
  expect(total).toHaveTextContent(0);

  //4- ekle butonlarından birine tıklanır
  // burda (addButtons[0]); ilk butona tıklanır ikinciye tıklanırsa farklı bir ürün eklenir
  // await user.click(addButtons[1]); ikinci butona tıklanır
  // await user.click(addButtons[2]); üçüncü butona tıklanır
  await user.click(addButtons[0]);

  //5- toplam Fiyatı 50 olur
  expect(total).toHaveTextContent(50);

  //6- farklı bir çeşitten iki tane eklenir
  await user.dblClick(addButtons[2]);

  //7- toplam fiyat 150 olur
  expect(total).toHaveTextContent(150);

  //8- 1 tane ekleninin Sıfırla butonuna tıklanır
  await user.click(delButtons[0]);

  //9-  toplam fiyat 100 olur
  expect(total).toHaveTextContent(100);

  //10- 2 tane eklenenin sıfırla butonuna tıklanır
  await user.click(delButtons[2]);

  //11- toplam fiyat 0 olur
  expect(total).toHaveTextContent(0);
});
