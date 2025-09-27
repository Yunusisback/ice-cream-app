import { render, screen } from '@testing-library/react';
import Toppings from '.';
import userEvent from '@testing-library/user-event';

test("api'dan gelen soslar için ekrana kartlar basılıyor mu?", async () => {
  render(<Toppings />);

  // Ekran yüklendikten sonra tüm 'sos-resim' alt etiketli görselleri bul
  const images = await screen.findAllByAltText('sos-resim');

  // Gelen görsel sayısının en az 1 olduğunu kontrol et
  expect(images.length).toBeGreaterThanOrEqual(1);
});



test('sosları ekleme çıkarma işlemi topam fiyatı etkiler', async () => {
  render(<Toppings />);
  const user = userEvent.setup();

  // Toplam ücret başlığı elementini al
  const total = screen.getByRole('heading', {
    name: /soslar ücreti/i,
  });

  // Başlangıçta toplam ücretin '0' içerdiğini kontrol et
  expect(total).toHaveTextContent(0);

  // Ekranda görünen bütün sosların checkbox'larını bul (API çağrısı beklenir)
  const toppings = await screen.findAllByRole('checkbox');

  // Birinci sosu sepete eklemek için tıkla
  await user.click(toppings[0]);

  // Toplam ücretin 20 TL'ye  güncellendiğini kontrol et 
  expect(total).toHaveTextContent(20);

  // Üçüncü sosu sepete eklemek için tıkla
  await user.click(toppings[2]);

  // Toplam ücretin 40 TL'ye (2 x 20) güncellendiğini kontrol et
  expect(total).toHaveTextContent(40);

  // Birinci sosu sepetten çıkarmak için tıkla
  await user.click(toppings[0]);

  // Toplam ücretin tekrar 20 TL'ye (kalan 1 x 20) düştüğünü kontrol et
  expect(total).toHaveTextContent(20);

  // Üçüncü sosu sepetten çıkarmak için tıkla
  await user.click(toppings[2]);

  // Tüm soslar çıkarıldığı için toplam ücretin 0 TL'ye düştüğünü kontrol et
  expect(total).toHaveTextContent(0);
});