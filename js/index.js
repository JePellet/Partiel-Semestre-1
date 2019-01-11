// Sélection des élements HTML "page"
var page1 = document.querySelector('.un');
var scrollbtn = document.querySelector('.btn');

var page2 = document.querySelector('.deux');
var slider = document.querySelector('.slider');
var left = document.querySelector('.left');
var right = document.querySelector('.right');

var page3 = document.querySelector('.trois');

// Scroll (click + scroll)
  scrollbtn.addEventListener('click', function(event) {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });


// Chargment des données et création des pages (fetch + appel de fonctions)
fetch('https://dev.drangies.fr/exam').then(function(res) {
	return res.json().then(function(data) {
		console.log(data);

    var identite = data.identite;
    console.log(identite);
    console.log(data.projets[0].titre);
    console.log(data.identite.contacts);


    var createPageUn = function(data) {
      page1.style.flexDirection = "column";

      var currentH1 = document.createElement('h1');
      currentH1.textContent = 'Bonjour, je suis ' + identite.prenom + ' ' + identite.nom;

      var currentH2 = document.createElement('h2');
      currentH2.textContent = identite.profession + ' de ' + identite.age + ' ans.';

      var currentP = document.createElement('p');
      currentP.textContent = 'Je suis passionnée de : ' + identite.loisirs[0] + ', ' + identite.loisirs[1] + ', ' + identite.loisirs[2] + '.';

      var br = document.createElement('br');

      page1.appendChild(currentH1);
      page1.appendChild(br);
      page1.appendChild(currentH2);
      page1.appendChild(br);
      page1.appendChild(currentP);
    };

    var createPageDeux = function(data) {

      var wrapImg1 = document.createElement('div');
      wrapImg1.classList.add('slide', 'leftMost');
      wrapImg1.style.backgroundImage = 'url("https://dev.drangies.fr/exam/projet-1.jpg")'
      var legende1 = document.createElement('div');
      legende1.style.zIndex = "1";
      var legende1H2 = document.createElement('h2');
      legende1H2.textContent = data.projets[0].titre;
      var legende1P = document.createElement('p');
      legende1P.textContent = data.projets[0].description;

      var wrapImg2 = document.createElement('div');
      wrapImg2.classList.add('slide');
      wrapImg2.style.backgroundImage = 'url("https://dev.drangies.fr/exam/projet-2.jpg")'
      wrapImg2.style.transform = 'translateX(100vw)';
      var legende2 = document.createElement('div');
      legende2.style.zIndex = "1";
      var legende2H2 = document.createElement('h2');
      legende2H2.textContent = data.projets[1].titre;
      var legende2P = document.createElement('p');
      legende2P.textContent = data.projets[1].description;

      var wrapImg3 = document.createElement('div');
      wrapImg3.classList.add('slide', 'rightMost');
      wrapImg3.style.backgroundImage = 'url("https://dev.drangies.fr/exam/projet-3.jpg")'
      wrapImg3.style.transform = 'translateX(200vw)';
      var legende3 = document.createElement('div');
      legende3.style.zIndex = "1";
      var legende3H2 = document.createElement('h2');
      legende3H2.textContent = data.projets[2].titre;
      var legende3P = document.createElement('p');
      legende3P.textContent = data.projets[2].description;


      slider.appendChild(wrapImg1);
        wrapImg1.appendChild(legende1);
          legende1.appendChild(legende1H2);
          legende1.appendChild(legende1P);

      slider.appendChild(wrapImg2);
        wrapImg2.appendChild(legende2);
          legende2.appendChild(legende2H2);
          legende2.appendChild(legende2P);

      slider.appendChild(wrapImg3);
        wrapImg3.appendChild(legende3);
          legende3.appendChild(legende3H2);
          legende3.appendChild(legende3P);

    };

    var createPageTrois = function(data) {
      var contacts = data.identite.contacts;
      page3.style.flexDirection = 'column';


      var currentH1 = document.createElement('h1');
      currentH1.textContent = 'Contactez-moi !';

      var currentDiv = document.createElement('div');
      currentDiv.classList.add('contactsList');

      var twitter = document.createElement('div');
      twitter.classList.add('contacts');
      twitter.style.alignItems = 'flex-start';
      var twiH1 = document.createElement('h1');
      twiH1.textContent = contacts[0].reseau;
      var twiH2 = document.createElement('h2');
      twiH2.textContent = contacts[0].id;

      var instagram = document.createElement('div');
      instagram.classList.add('contacts');
      instagram.style.alignItems = 'flex-start';
      var instaH1 = document.createElement('h1');
      instaH1.textContent = contacts[1].reseau;
      var instaH2 = document.createElement('h2');
      instaH2.textContent = contacts[1].id;

      var mail = document.createElement('div');
      mail.classList.add('contacts');
      mail.style.alignItems = 'flex-start';
      var mailH1 = document.createElement('h1');
      mailH1.textContent = 'mail';
      var mailH2 = document.createElement('h2');
      mailH2.textContent = contacts[2].mail;


      page3.appendChild(currentH1);
      page3.appendChild(currentDiv);
        currentDiv.appendChild(twitter);
          twitter.appendChild(twiH1);
          twitter.appendChild(twiH2);

        currentDiv.appendChild(instagram);
          instagram.appendChild(instaH1);
          instagram.appendChild(instaH2);

        currentDiv.appendChild(mail);
          mail.appendChild(mailH1);
          mail.appendChild(mailH2);
    };


		createPageUn(data);
		createPageDeux(data);
		createPageTrois(data);



    // Slider (clicks + effet de slide)
    var i = 0;
    var slide = document.querySelectorAll('.slide');

    right.addEventListener('click', function(event) {
      if (i === -200) {
      } else {
        i = i-100;
        slide.forEach(function(s) {
          s.style.transform = 'translateX(' + i + 'vw)';
          s.style.transition = 'transform 0.7s';
        });
      };
    });

    left.addEventListener('click', function(event) {
      if (i === 0) {
      } else {
        i = i+100;
        slide.forEach(function(s) {
          s.style.transform = 'translateX(' + i + 'vw)';
          s.style.transition = 'transform 0.7s';
        });
      }
    });

  });
});
