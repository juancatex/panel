
(function ($) {
	"use strict"; 
	$.session.clear();
	var servidorr='https://ascinalss.herokuapp.com/servidor';


	const contenido=document.querySelector('#formss');
	  contenido.innerHTML=`  
	  <div id="mensaje"> 
				</div>
			  <form class="login100-form validate-form" id="forminpout" autocomplete="off">
				  <span class="login100-form-title p-b-55">
					  Contrato con Garante
				  </span>
<label for="numero">Ingrese su Carnet de Identidad :</label>
				  <div class="wrap-input100 validate-input m-b-16" data-validate = "Carnet de Identidad">
					  
					  <input class="input100" id="numero" type="number" min="99999" max="999999999" name="num" placeholder="Carnet de Identidad" autocomplete="off">
					  <span class="focus-input100"></span>
					  <span class="symbol-input100">
						  <span class="lnr lnr-user"></span>
					  </span>
				  </div>
 
				  <div class="container-login100-form-btn p-t-25">
					  <button class="login100-form-btn">
						  Buscar
					  </button>
				  </div> 
			  </form> `;
	  $('#forminpout').on('submit', function(e){   
		formulariologin(e);
	  });





    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
	}
	
 
	  
 
	  function formulariologin(e,formm){
		e.preventDefault();
		 var paso=true;
		  $(e.target).find('input').each(function() {
				if( $(this).val().length == 0 ) {
					paso = false;
				return false;
				}
		  });
 
		if(paso) { 
			
			const contenido=document.querySelector('#mensaje');
			 contenido.innerHTML=``;
			 $('.login100-form-btn').html('<span class="ld ld-ring ld-spin" style=" font-size: 35px;"></span>');
			 $('.login100-form-btn').prop('disabled', true); 
			 
			 

			 $.post(servidorr+'/getsocio.php', $("#forminpout").serializeArray(), function(res){ 
				var user=JSON.parse(res); 
console.log(user);				
			 
				if(user.value>0){
					const contenido=document.querySelector('#formss');
					contenido.innerHTML=`  
					<div id="mensaje"> 
							</div>
							<form class="login100-form validate-form" id="form2" autocomplete="off">
				  <span class="login100-form-title p-b-55">
					  Contrato con Garante
				  </span>
<label for="inputcard">Ingrese su Carnet de Identidad :</label>
				  <div class="wrap-input100 validate-input m-b-16" data-validate = "Carnet de Identidad">
					  
					  <input class="input100" id="inputcard" type="number" min="99999" max="999999999" name="user" placeholder="Carnet de Identidad" autocomplete="off">
					  <span class="focus-input100"></span>
					  <span class="symbol-input100">
						  <span class="lnr lnr-user"></span>
					  </span>
				  </div>
<label for="namesocio">Ingrese su nombre completo :</label>
				  <div class="wrap-input100 validate-input m-b-16" data-validate = "Ingrese contraseña">
						<input class="input100" id="namesocio" type="password" name="pass" placeholder="Contraseña" autocomplete="off">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<span class="lnr lnr-lock"></span>
						</span>
				  </div> 
 
				  <div class="container-login100-form-btn p-t-25">
					  <button class="login100-form-btn">
						  Registrar
					  </button>
				  </div> 
			  </form> `;
							$('#form2').on('submit', function(e){   
								formulariovalue(e,this);
							  });
				}else{ 
					const contenido=document.querySelector('#mensaje');
					contenido.innerHTML=`<div class="alert alert-danger" role="alert">El usuario y/o contraseña son incorrectas.</div>`;
					$('.login100-form-btn').html('Ingresar');
			        $('.login100-form-btn').prop('disabled', false); 
				}
			  }).done(function(msg){  })
    .fail(function(xhr, status, error) {
      console.log('error:',error);
    });

		}else { 
			const contenido=document.querySelector('#mensaje');
		     contenido.innerHTML=`<div class="alert alert-danger" role="alert">Debe introducir todos campos.</div>`;
		}
		  
	  }
	  
	  
	  
	  
	  
	  function formulariovalue(e,formm){
		e.preventDefault();
		 var paso=true;
		  $(e.target).find('input').each(function() {
				if( $(this).val().length == 0 ) {
					paso = false;
				return false;
				}
		  });
 
		if(paso) { 
			
			const contenido=document.querySelector('#mensaje');
			 contenido.innerHTML=``;
			 $('.login100-form-btn').html('<span class="ld ld-ring ld-spin" style=" font-size: 35px;"></span>');
			 $('.login100-form-btn').prop('disabled', true); 

			 $.post(servidorr+'/login.php', $("#form").serializeArray(), function(res){ 
				var user=JSON.parse(res);   
			 
				if(user.status=='Ok'){
					const contenido=document.querySelector('#formss');
					contenido.innerHTML=`  
					<div id="mensaje"> 
							</div>
							<form class="login100-form validate-form" id="form2" autocomplete="off">
				  <span class="login100-form-title p-b-55">
					  Contrato con Garante
				  </span>
<label for="inputcard">Ingrese su Carnet de Identidad :</label>
				  <div class="wrap-input100 validate-input m-b-16" data-validate = "Carnet de Identidad">
					  
					  <input class="input100" id="inputcard" type="number" min="99999" max="999999999" name="user" placeholder="Carnet de Identidad" autocomplete="off">
					  <span class="focus-input100"></span>
					  <span class="symbol-input100">
						  <span class="lnr lnr-user"></span>
					  </span>
				  </div>

 
				  <div class="container-login100-form-btn p-t-25">
					  <button class="login100-form-btn">
						  Buscar
					  </button>
				  </div> 
			  </form> `;
							$('#form2').on('submit', function(e){   
								formulariologin(e,this);
							  });
				}else{ 
					const contenido=document.querySelector('#mensaje');
					contenido.innerHTML=`<div class="alert alert-danger" role="alert">El usuario y/o contraseña son incorrectas.</div>`;
					$('.login100-form-btn').html('Ingresar');
			        $('.login100-form-btn').prop('disabled', false); 
				}
			  })

		}else { 
			const contenido=document.querySelector('#mensaje');
		     contenido.innerHTML=`<div class="alert alert-danger" role="alert">Debe introducir todos campos.</div>`;
		}
		  
	  }
	  
	  
	  
	  
	  
	  function formulariocreate(e){
		e.preventDefault();
		 var paso=true;
		  $(e.target).find('input').each(function() {
				if( $(this).val().length == 0 ) {
					paso = false;
				return false;
				}
		  });
 
		if(paso) {
			console.log("entro create"); 
			const contenido=document.querySelector('#mensaje');
			 contenido.innerHTML=``;
			 $('.login100-form-btn').html('<span class="ld ld-ring ld-spin" style=" font-size: 35px;"></span>');
			 $('.login100-form-btn').prop('disabled', true);
			 $.post(servidorr+'/create.php', $("#createform").serializeArray(), function(res){ 
				var user=JSON.parse(res);  
			 
				if(user.status=='Ok'){
					$.session.clear();  
					const contenido=document.querySelector('#formss');
					contenido.innerHTML=`  
					<div id="mensaje"> 
							</div>
							<form class="login100-form validate-form" id="form" autocomplete="off">
								<span class="login100-form-title p-b-55">
									Ascinalss - Movil
								</span>
			
								<div class="wrap-input100 validate-input m-b-16" data-validate = "Ingrese usuario">
									<input class="input100" type="text" name="user" placeholder="Usuario" autocomplete="off">
									<span class="focus-input100"></span>
									<span class="symbol-input100">
										<span class="lnr lnr-user"></span>
									</span>
								</div>
			
								<div class="wrap-input100 validate-input m-b-16" data-validate = "Ingrese contraseña">
									<input class="input100" type="password" name="pass" placeholder="Contraseña" autocomplete="off">
									<span class="focus-input100"></span>
									<span class="symbol-input100">
										<span class="lnr lnr-lock"></span>
									</span>
								</div>
			 
								<div class="container-login100-form-btn p-t-25">
									<button class="login100-form-btn">
										Ingresar
									</button>
								</div> 
							</form> `;
							$('#form').on('submit', function(e){   
								formulariologin(e,this);
							  });
							  const mensajes=document.querySelector('#mensaje');
							  mensajes.innerHTML=`<div class="alert alert-success" role="alert">Se creo el usuario correctamente..</div>`;
				}else{
					console.log("no entro");
					const contenido=document.querySelector('#mensaje');
					contenido.innerHTML=`<div class="alert alert-danger" role="alert">El usuario y/o contraseña son incorrectas.</div>`;
					$('.login100-form-btn').html('Ingresar');
			        $('.login100-form-btn').prop('disabled', false); 
				}
			  })
		}else {
			console.log("no entro create");
			const contenido=document.querySelector('#mensaje');
		     contenido.innerHTML=`<div class="alert alert-danger" role="alert">Debe introducir todos campos.</div>`;
		}
	  }

 

})(jQuery);