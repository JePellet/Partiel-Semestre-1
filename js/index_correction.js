var pageUn = document.querySelector('.page.un');
var pageDeux = document.querySelector('.page.deux');
var pageTrois = document.querySelector('.page.trois');

// Gestion du scroll lors du click sur la fleche de la première page
var btn = document.querySelector('.btn');
btn.addEventListener('click', function(e) {
	window.scroll({ top: pageDeux.offsetTop, left: 0, behavior: 'smooth' });
});

// Gestion du slide show
var slider = document.querySelector('.slider');
var right = document.querySelector('.right');
var left = document.querySelector('.left');

var index = 0;
// un click sur la flèche de gauche augmente le translateX de l'élément slider de 100%
left.addEventListener('click', function() {
	if (index < 0) {
		index += 100;
		slider.style.transform = 'translateX(' + index + '%)';
	}
});
// un click sur la flèche de droite diminue le translateX de l'élément slider de 100%
right.addEventListener('click', function() {
	if (index > -200) {
		index -= 100;
		slider.style.transform = 'translateX(' + index + '%)';
	}
});

// Chargment des données et création des pages
fetch('https://dev.drangies.fr/exam').then(function(res) {
	return res.json().then(function(data) {
		// C'EST SEULEMENT UNE FOIS QUE LES DONNÉES ONT
		// ÉTÉES CHARGÉES QUE L'ON PEUT LES MANIPULER!!!!!
		console.log(data);
		// ON PASSE LES DONNÉES AUX FONCTIONS DE CRÉATION DES PAGES
		createPageUn(data);
		createPageDeux(data);
		createPageTrois(data);
	});
});

// FONCTIONS DE CRÉATION DES PAGES
// page 1
var createPageUn = function(data) {
	var div = document.createElement('div');
	var titre = document.createElement('h1');
	titre.textContent = 'Bonjour, je suis ' + data.identite.prenom + ' ' + data.identite.nom;
	var tagline = document.createElement('h2');
	tagline.textContent = data.identite.profession + ' de ' + data.identite.age + ' ans.';
	var presentation = document.createElement('p');
	var presentationText = 'Je suis passionnée de : ';
	data.identite.loisirs.forEach(function(e, i) {
		presentationText += e;
		if (i < data.identite.loisirs.length - 1) presentationText += ', ';
		else presentationText += '.';
	});
	presentation.textContent = presentationText;
	div.appendChild(titre);
	div.appendChild(tagline);
	div.appendChild(presentation);
	pageUn.appendChild(div);
};

// page 2
var createPageDeux = function(data) {
	data.projets.forEach(function(p) {
		var slide = document.createElement('div');
		slide.className = 'slide';
		slide.style.backgroundImage = 'url(https://dev.drangies.fr/exam/' + p.image + ')';
		var cartouche = document.createElement('div');
		var titre = document.createElement('h2');
		titre.textContent = p.titre;
		var description = document.createElement('p');
		description.textContent = p.description;
		cartouche.appendChild(titre);
		cartouche.appendChild(description);
		slide.appendChild(cartouche);
		slider.appendChild(slide);
	});
	pageDeux.appendChild(slider);
};

// page 3
var createPageTrois = function(data) {
	var contacts = document.createElement('div');
	contacts.className = 'contacts';
	var catchPhrase = document.createElement('h2');
	catchPhrase.textContent = 'Contactez-moi !';
	contacts.appendChild(catchPhrase);
	var contactsList = document.createElement('div');
	contactsList.className = 'contactsList';
	data.identite.contacts.forEach(function(c) {
		var reseau = document.createElement('h2');
		reseau.textContent = c.reseau || 'mail';
		var id = document.createElement('h3');
		id.textContent = c.id || c.mail;
		var contact = document.createElement('div');
		contact.appendChild(reseau);
		contact.appendChild(id);
		contactsList.appendChild(contact);
	});
	contacts.appendChild(contactsList);
	pageTrois.appendChild(contacts);
};
