import { render, screen } from '@testing-library/react';
import Card from '.';
import userEvent from '@testing-library/user-event';

const item = {
  name: 'Salted caramel',
  imagePath: '/images/salted-caramel.png',
};

const basket = [
  {
    name: 'Salted caramel',
    imagePath: '/images/salted-caramel.png',
  },
  {
    name: 'Salted caramel',
    imagePath: '/images/salted-caramel.png',
  },
  {
    name: 'Chocolate',
    imagePath: '/images/chocolate.png',
  },
];

// Bileşenin propları doğru işlediğini ve butonların sepeti güncellediğini test et
test('Kart bileşeni render edilir, miktarı gösterir ve sepeti günceller.', async () => {
  // setBasket prop'unun çağrılıp çağrılmadığını kontrol etmek için mock fonksiyon oluştur.
  const mock = jest.fn();

  // Bileşeni gerekli proplarla renderle
  render(<Card item={item} basket={basket} setBasket={mock} />);

  // 1.Ürün adının ekranda göründüğünü kontrol et
  screen.getByText(item.name);

  // 2.  Resmin doğru 'src' değerine sahip olduğunu kontrol et
  const img = screen.getByAltText('çeşit-resim');
  expect(img).toHaveAttribute('src', item.imagePath);

  // 3. Sepette 'Salted caramel'den 2 tane olduğu için miktarın 2 olduğunu kontrol et
  const amount = screen.getByTestId('amount');
  expect(amount).toHaveTextContent(2);

  // 4.  userEvent kurulumu ve buton elementlerini alma
  const user = userEvent.setup();
  const addBtn = screen.getByRole('button', { name: /ekle/i });
  const delBtn = screen.getByRole('button', { name: /sıfırla/i });

  // 5. 'Ekle' butonuna tıkla
  await user.click(addBtn);

  // setBasket'in yeni ürün eklenmiş güncel sepetle çağrıldığını kontrol et
  expect(mock).toHaveBeenCalledWith([...basket, item]);

  // 6. Sıfırla butonuna tıkla 
  await user.click(delBtn);

  // setBasketin ilgili çeşidin tamamen çıkarıldığı sepetle çağrıldığını kontrol et
  expect(mock).toHaveBeenLastCalledWith([
    {
      name: 'Chocolate',
      imagePath: '/images/chocolate.png',
    },
  ]);
  
});