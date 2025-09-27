import {fireEvent, render, screen } from "@testing-library/react";
import Form from "."; 
import userEvent from "@testing-library/user-event";
import { updateSelectionOnFocus } from "@testing-library/user-event/dist/cjs/event/selection/updateSelectionOnFocus.js";

test("koşulların onaylanmasına göre buton aktifliği", async () => {
    // test bileşenini ekrana bas
    render(<Form />);

    // kurulumunu yap
    const user = userEvent.setup();

    // gerekli elemanları al
    const orderBtn = screen.getByRole("button");
    const checkbox = screen.getByRole("checkbox");

    // 1-checkbox tiksizdir
    expect(checkbox).not.toBeChecked();

    // 2-button disable durumdadır
    expect(orderBtn).toBeDisabled();

    // 3-checkbox tiklenir 
   await user.click(checkbox);  // fireEvent kullanabilrdik ama userEvent daha gerçekçi kullanıcı etkileşimi simüle eder.
    // fireevent direkt site açıldığı anda milisaniyeler içinde checkboxa tıklıyor kullanıcı davranışını simüle edemiyor
    // userEvent ise gerçek kullanıcı davranışlarını simüle eder. Yani önce checkboxa gider sonra tıklar

    // fireEvent neden kullanılır?
    // fireEvent, DOM üzerinde temel eventleri simüle etmek için kullanılır.
    // Örneğin:
    // - Tıklama (click)
    // - Yazı yazma (change)
    // - Seçim yapma (select)
    // Ancak gerçek kullanıcı davranışlarını (focus, event zinciri) tam olarak simüle etmez.
    // Daha gereçkçi etkileşimler için userEvent tercih edilir.

    // 4-button enable olur
    expect(orderBtn).toBeEnabled();


    // 5-checkbox tik kaldırılır
   await user.click(checkbox);

    // 6-button tekrar disable olur
    expect(orderBtn).toBeDisabled();

});

test("onay butonuna hover yapıldığında açıklama görünür", async () => {
  render(<Form />);
  const user = userEvent.setup();

  // gerekli elemanlar
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  // const popup = screen.getByText("Size gerçekten " , {exact: false} )
  const popup = screen.getByText(/size gerçekten/i);

  // buton checkbox tikle
  await user.click(checkbox);

  // mouseyi butonun üzerine getir
  fireEvent.mouseEnter(button);

  // bildirim gözüküyor mu ? (toBeVisible: opacity > 0 ; visibliy:visible; display != none)
  expect(popup).toBeVisible();

  // mouse'u butondan çek
  fireEvent.mouseLeave(button);

  // popup gözükmez
  expect(popup).not.toBeVisible();


});
