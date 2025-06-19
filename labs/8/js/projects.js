$(document).ready(function() {
  //title appears immediately without animation

  //load projects from json file
  $.ajax({
    url: '../projects.json',
    dataType: 'json',
    success: function(data) {
      const buttonsContainer = $('.buttons');
      buttonsContainer.empty();
      
      //create and animate each lab button
      data.projects.forEach(function(item, index) {
        const button = $(`
          <a href="${item.path}" class="button">
            ${item.name} <i class="${item.image}"></i>
          </a>
        `);
        
        //add tooltip with lab description
        button.tooltip({
          content: item.description,
          position: { my: "center bottom-20", at: "center top" },
          show: { effect: "fadeIn", duration: 200 },
          hide: { effect: "fadeOut", duration: 200 }
        });

        //append button to container
        button.appendTo(buttonsContainer);

        //animate button entrance with fade and slide
        setTimeout(() => {
          button.addClass('visible');
        }, index * 150);
      });
    },
    error: function(xhr, status, error) {
      console.error('Error loading projects:', error);
      const fallbackButtons = `
        <a href="../../teamproject/home/homepage.html" class="button">Beyond the Zodiac <i class="fa-solid fa-star"></i></a>
        <a href="../../labs/3/lab2.html" class="button">Lab 2 <i class="fa-solid fa-folder"></i></a>
      `;
      
      $('.buttons').html(fallbackButtons);
      
      //animate fallback buttons
      $('.buttons a').each(function(index) {
        setTimeout(() => {
          $(this).addClass('visible');
        }, index * 150);
      });
    }
  });
}); 