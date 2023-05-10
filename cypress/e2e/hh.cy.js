describe('Тестирование поиска', function () {
    it('Проверка логина с корректной парой', function () {
         cy.clearCookies()
         cy.visit('https://hh.ru/'); 
         cy.get('[data-qa="index__work-in-company-header"]').contains('Работа в компаниях'); //проверка последнего загружаемого элемента
         cy.get('[data-qa="search-input"]').should('have.attr', 'placeholder', 'Профессия, должность или компания'); //проверка на плейсхолдер
         cy.get('[data-qa="search-input"]').type('QA engineer'); 
         cy.get('.supernova-search-group__submit > [data-qa="search-button"]').click();
         cy.get('[data-qa="vacancies-catalog-header"]').should('contain', 'Работа QA engineer');
         cy.get('[data-qa="order-by-menu"] > [data-qa="bloko-custom-select-select"] > .bloko-custom-select__placeholder').should('contain', 'По соответствию'); //проверка на стандартную сортировку
         cy.get('.bloko-form-item > [data-qa="serp__novafilter-item"] > .bloko-checkbox > [data-qa="serp__novafilter-item-text"] > [data-qa="serp__novafilter-title"]').should('not.be.checked'); //проверка что чекбокс "только с зарплатами" не активен
         cy.get('.bloko-form-item > [data-qa="serp__novafilter-item"] > .bloko-checkbox > [data-qa="serp__novafilter-item-text"] > [data-qa="serp__novafilter-title"]').click();
         cy.wait(3000);
         cy.get('[data-qa="vacancy-serp__vacancy-compensation"]') //проверка на соответствие кол-ва вакансий и кол-ва зарплат
            .then(compensations => {
                const compensationLength = compensations.length;
                cy.get('[data-qa="serp-item__title"]')
                    .then(titles => {
                    const titleLength = titles.length;
                    expect(compensationLength).to.eq(titleLength) || expect(compensationLength - 1).to.eq(titleLength);
                    });
            });
     }) 
 })
