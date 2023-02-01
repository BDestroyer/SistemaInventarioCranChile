var app = new Vue({
	el: '#app',
	data: {
		usuario           : '',
		password          : '',
		mensaje_validando : '',
	//datos usuario
		id_user  : "",
		name     : "",
		lastname : "",
		email    : "",
		ccmail   : "",
		username : "",
		kind     : "",
		admin    : "",
		finicio  : "",
		ult      : "",
	//validacion session
		interval        : 0,
		session_status  : 0,
		session_ini_seg : 0,
		session_ult_seg : 0,
	//modulos
		visible_componente1 : true,
		visible_componente2 : false,
		visible_componente3 : false,
		visible_componente4 : false,
		visible_componente5 : false,
		visible_componente6 : false,
	},
	mounted: function(){
		let post = {
			opcion : 'obtener_datos'
		};
		axios.post("/SisInventario/datos/base_data.php", post)
		.then((response) => {
			this.id_user  = response.data.id_user;
			this.name     = response.data.name;
			this.lastname = response.data.lastname;
			this.email    = response.data.email;
			this.ccmail   = response.data.ccmail;
			this.username = response.data.username;
			this.kind     = response.data.kind;
			this.admin    = response.data.admin;
			this.finicio  = response.data.finicio;
			this.ult      = response.data.ult;

			this.visible_modulos('componente1');

			//this.interval = setInterval(() => this.validar(), 300000);
		});
	},
	methods: {
		login: function(){
			this.mensaje_validando = 'Validando Datos...';
			let post = {
			  usuario  : this.usuario,
			  password : this.password,
			  opcion   : 'login'
		  };
		  axios.post("/SisInventario/datos/base_data.php", post)
		  .then((response) => {
			  if ( response.data.status === 1) {
				  this.mensaje_validando = 'Ok, cargando...';
				  window.location.href = "/SisInventario/vistas/main.php";
			  }
			  else{
				  console.log(response.data);
			  }
			  setTimeout(function() {
				  login.mensaje_validando = '';
			  }, 2000);

		  })
		  .catch(error => {
			  this.errorMessage = error.message;
			  console.error("There was an error!", error);
		  });
		},
		visible_modulos: function(modulo){
			this.visible_componente1 = false;
			this.visible_componente2 = false;
			this.visible_componente3 = false;
			this.visible_componente4 = false;
			this.visible_componente5 = false;
			this.visible_componente6 = false;

   			if (modulo === 'componente1') {
   				this.visible_componente1 = true;
   			}

   			if (modulo === 'componente2') {
   				this.visible_componente2 = true;
   			}

   			if (modulo === 'componente3') {
   				this.visible_componente3 = true;
   			}

   			if (modulo === 'componente4') {
   				this.visible_componente4 = true;
   			}

			if (modulo === 'componente5') {
				this.visible_componente5 = true;
			}
			
			if (modulo === 'componente6') {
				this.visible_componente6 = true;
			}

   		},
		validar: function(){
  			var d = new Date();
  			console.log('validando sesion ='+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
   			let post = {
				opcion: "validar"
			};
   			axios.post("/SisInventario/datos/base_data.php", post)
			.then(response => {
				session_status = parseInt( response.data.session_data.session_status );
				if (this.session_status === 0) {
					this.salir();
				}
				//this.session_ini_seg = parseInt( response.data.session_data.session_ini_seg );
				//this.session_ult_seg = parseInt( response.data.session_data.session_ult_seg );
			});
   		},
		salir : function(){
			let post = {
				opcion : '0'
			};
			axios.post("/SisInventario/datos/base_data.php", post)
			.then((response) => {
				this.id_user  = response.data.id_user;
				this.name     = response.data.name;
				this.lastname = response.data.lastname;
				this.email    = response.data.email;
				this.ccmail   = response.data.ccmail;
				this.username = response.data.username;
				this.kind     = response.data.kind;
				this.admin    = response.data.admin;
				this.finicio  = response.data.finicio;
				this.ult      = response.data.ult;
				window.location.href = "../index.php";
			});
		},
	},
	computed: {
	},
})