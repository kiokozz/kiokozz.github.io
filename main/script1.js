document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.audience-button');
    const title = document.querySelector('.hero h1');
    
    // Показать заголовок
    setTimeout(() => {
        title.classList.add('visible');
    }, 100);
    
    // Показать кнопки с задержкой
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.classList.add('visible');
        }, 200 * (index + 1));
    });
    
    // Обработка кликов на кнопках
    document.querySelectorAll('.audience-button a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const button = link.parentElement;
            
            // Закрываем все другие кнопки
            buttons.forEach(btn => {
                if (btn !== button && btn.classList.contains('expanded')) {
                    btn.classList.remove('expanded');
                }
            });
            
            // Переключаем текущую кнопку
            button.classList.toggle('expanded');
        });
    });
});