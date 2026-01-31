import {test, expect} from 'playwright/test';

const APP_URL = 'http://localhost:5173';


// "Test Plan" - El contenedor de los casos de prueba principales
test.describe('Gestor de Gastos - Pruebas Funcionales', () => {
   
    test('TC-01: Debe premitir agregar un gasto exitosamente', async ({ page }) => {
  await page.goto(APP_URL);

  //Llenar el formulario:
  await page.getByTestId('input-description').fill('Almuerzo Subway');
  await page.getByTestId('input-amount').fill('15.50');
  await page.getByTestId('select-category').selectOption('Comida')

  //Click a agregar
  await page.getByTestId('btn-add-expense').click();

  //Verificaciones
  const list = page.getByTestId('expense-list');
  await expect(list).toContainText('Almuerzo Subway');
  await expect(page.getByTestId('total-amount')).toHaveText('$15.50');
  
});

    test('TC-04: Debe calcular el total acumulado correctamente', async ({ page }) => {
    await page.goto(APP_URL);

    // Agregar Gasto 1 ($10)
    await page.getByTestId('input-description').fill('Gasto A');
    await page.getByTestId('input-amount').fill('10');
    await page.getByTestId('btn-add-expense').click();

    // Agregar Gasto 2 ($20.50)
    await page.getByTestId('input-description').fill('Gasto B');
    await page.getByTestId('input-amount').fill('20.50');
    await page.getByTestId('btn-add-expense').click();

    // Verificación del total ($30.50)
    await expect(page.getByTestId('total-amount')).toHaveText('$30.50');
  });

    test('TC-05: Debe eliminar un gasto y actualizar el total a cero (0)', async ({ page }) => { 
        await page.goto(APP_URL);

    //1. Agregar un gasto primero
    await page.getByTestId('input-description').fill('Gasto a Eliminar');
    await page.getByTestId('input-amount').fill('50');
    await page.getByTestId('btn-add-expense').click();

    // 2. Verificar que se agregó
    await expect(page.getByTestId('total-amount')).toHaveText('$50.00');
    
    // 3. Clic en eliminar (usamos una selección por texto ya que el ID es dinámico)
    await page.getByRole('button', { name: 'Eliminar' }).click();

    // 4. Verificaciones de funcionamiento
    await expect(page.getByTestId('total-amount')).toHaveText('$0.00');
    await expect (page.getByTestId('expense-list')).not.toContainText('Gasto a Eliminar');
});

});
