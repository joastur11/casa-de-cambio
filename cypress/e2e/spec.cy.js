describe('Conversor de monedas', () => {

  beforeEach(()=> {
    cy.visit('http://127.0.0.1:5500/index.html'); 
  })

  it('Carga la página y muestra los inputs', () => {
    cy.get('#moneda-usuario').should('exist');
    cy.get('#moneda-cambio').should('exist');
    cy.get('#fecha-ingresada').should('exist');
  });

  it('Debe mostrar error si las monedas son iguales', () => {
    cy.get('#moneda-usuario').select('USD');
    cy.get('#moneda-cambio').select('USD');
    cy.get('#fecha-ingresada').type('2023-05-19');
    cy.get('#calcular-cambio').click();
    cy.get('#errores').should('contain', 'Por favor elija dos monedas distintas');
  });

  it('Debe mostrar error si la fecha está vacía', () => {
    cy.get('#moneda-usuario').select('USD');
    cy.get('#moneda-cambio').select('EUR');
    cy.get('#calcular-cambio').click();
    cy.get('#errores').should('contain', 'Por favor ingrese una fecha');
  });

  it('Debe cambiar el botón a "Reiniciar" si todo es válido', () => {
    cy.get('#moneda-usuario').select('USD');
    cy.get('#moneda-cambio').select('EUR');
    cy.get('#fecha-ingresada').type('2023-05-19');
    cy.get('#calcular-cambio').click();
    cy.get('#calcular-cambio').should('have.text', 'Reiniciar');
  });

  it ('Debe mostrar error si la fecha es futura', () => {
    cy.get('#fecha-ingresada').type('2099-01-01');
    cy.get('#calcular-cambio').click();
    cy.get('#errores').should('contain', 'No se adivinar el futuro');
  })
});

