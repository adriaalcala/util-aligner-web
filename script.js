var BASE_URL =  'http://127.0.0.1:10080/util-aligner';
var DATABASE = '/database';
var NETWORKS = '/networks';
var ALIGNERS = '/aligner';
var SUBMIT = '/create-job';


window.onload = () => {
	getInitialData();
	var db = document.querySelector('#db');
	db.onclick = getNetworks;
	var button = document.querySelector('#send');
	
	button.onclick = submitForm;
}


function getInitialData() {
	fetch(`${BASE_URL}${DATABASE}`)
		.then((res) => res.json())
		.then((data) => {
			const databases = data.data;
			select = document.querySelector('#db');
			for (var data in databases){
				var opt = document.createElement('option');
				opt.value = databases[data];
				opt.innerHTML = databases[data];
				select.appendChild(opt);
			};
		})
		.catch(err => console.log('[ ERROR ]', err));
		fetch(`${BASE_URL}${ALIGNERS}`)
		.then((res) => res.json())
		.then((data) => {
			const aligners = data.data;
			select = document.querySelector('#aligner');
			for (var data in aligners){
				var opt = document.createElement('option');
				opt.value = aligners[data];
				opt.innerHTML = aligners[data];
				select.appendChild(opt);
			};
		})
		.catch(err => console.log('[ ERROR ]', err));


}

function getNetworks() {
	var db = document.querySelector('#db');
	db_name = db.value
	fetch(`${BASE_URL}${NETWORKS}/${db_name}`)
	.then((res) => res.json())
	.then((data) => {
		const networks = data.data;
		select1 = document.querySelector('#net-1');
		while (select1.firstChild) {
			select1.removeChild(select1.firstChild);
		}
		var opt = document.createElement('option');
		opt.value = "";
		opt.innerHTML = "Choose an option";
		select1.appendChild(opt);

		select2 = document.querySelector('#net-2');

		while (select2.firstChild) {
			select2.removeChild(select2.firstChild);
		}
		var opt = document.createElement('option');
		opt.value = "";
		opt.innerHTML = "Choose an option";
		select2.appendChild(opt);

		for (var data in networks){
			var opt = document.createElement('option');
			opt.value = networks[data];
			opt.innerHTML = networks[data];
			select1.appendChild(opt);
		};
		for (var data in networks){
			var opt = document.createElement('option');
			opt.value = networks[data];
			opt.innerHTML = networks[data];
			select2.appendChild(opt);
		};
	}).catch(err => console.log('[ ERROR ]', err));
}
function submitForm() {
	var db = document.querySelector('#db').value;
	var net1 = document.querySelector('#net-1').value;
	var net2 = document.querySelector('#net-2').value;
	var aligner = document.querySelector('#aligner').value;
	var mail = document.querySelector('#mail').value;
	const payload = {
		db,
		net1,
		net2,
		aligner,
		mail
	}
	fetch(`${BASE_URL}${SUBMIT}`,
		{
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}
	)
	.then((res) => res.json())
	.catch(err => console.log('[ ERROR ]', err));
}
