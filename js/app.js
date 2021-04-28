  var firebaseConfig = {
		apiKey: "AIzaSyDgvieNQcyHU0su0TjcFvMjeOJTd6nVKBo",
		authDomain: "ascinalss-movil.firebaseapp.com",
		databaseURL: "https://ascinalss-movil.firebaseio.com",
		projectId: "ascinalss-movil",
		storageBucket: "ascinalss-movil.appspot.com",
		messagingSenderId: "361410683377",
		appId: "1:361410683377:web:ed3a5b6a0465461d08e450",
		measurementId: "G-3YRJMYB905"
	  }; 
	  firebase.initializeApp(firebaseConfig); 
	  
	  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button-moa', {
    'size': 'invisible',
    'callback': function(response) {
        validatedata(); 
    }
  });

  recaptchaVerifier.render().then(function(widgetId) {
    window.recaptchaWidgetId = widgetId;  
  });
  
if(typeof $.session.get("user") === 'undefined'){
    window.location.href = '/'; 
} 
 function validatedata() { 
    $(".contact_btn").attr("disabled", "disabled");
    $(".contact_btn b").text('Validando');
    $(".contact_btn i").removeClass('d-none');
 
    var output;
    var proceed = true; 
    var errormensaje = 'Ingrese datos para validar.';
 
    $('#contact-form-data input').each(function() {
        proceed = proceed?$(this).val().length != 0:false;
        
        
         if(proceed===false){ 
           switch($(this).attr('name')){
                case 'ci': 
                case 'name':  
                errormensaje='Debe ingresar un carnet de indetidad válido.';break;
                case 'cel':  
                errormensaje='Debe ingresar su numero de celular.';break; 
            }
            return false;
        }else if($(this).attr('name')=='cel'){  
            proceed=($(this).val().replace(/\_/g, '').replace(/\-/g, '')).length==8;
            errormensaje='El número de celular es incorrecto.'; 
        }
    });
 
    if (proceed) {
       
        sendsms(); 
    }
    else
    {
        grecaptcha.reset(window.recaptchaWidgetId); 
        output = '<div class="alert alert-danger" style="padding:10px 15px; margin-bottom:30px;">'+errormensaje+'</div>';
        $("#resultmodal").hide().html(output).slideDown();
        $(".contact_btn i").addClass('d-none');    
        $(".contact_btn b").text('Validar');
    }


};
function sendsms(){
   
    const phoneNumber = '+591'+($("#numcel").val()).replace('-', ''); 
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => { 
          window.confirmationResult = confirmationResult;  
		 $('#modalcelular').modal('hide');		  
		 $('#modalcode').modal('show'); 
		
        }).catch((error) => {
           grecaptcha.reset(window.recaptchaWidgetId);
          console.log('error:',error);
         
          if(error.code=='auth/too-many-requests'){
            
            output = '<div class="alert alert-danger" style="padding:10px 15px; margin-bottom:30px;">Excedio la cantidad maxima de peticiones, intentelo mas tarde porfavor.</div>';
            $("#resultmodal").hide().html(output).slideDown();
            $(".contact_btn i").addClass('d-none');   
            $(".contact_btn b").text('Validar');
          }else{
            output = '<div class="alert alert-danger" style="padding:10px 15px; margin-bottom:30px;">'+error.code+'<br>'+error.message+'.</div>';
            $("#resultmodal").hide().html(output).slideDown();
            $(".contact_btn i").addClass('d-none');   
            $(".contact_btn b").text('Validar');
          }
        });
    }
   
$("#modal-contact-getcode").submit(function(e){ 
    e.preventDefault();  
     
    $(".modal_validate_code i").removeClass('d-none'); 
    $("#quote_result_code").html('');
    $(".modal_validate_code b").text('Validando código ingresado');
    $( ".modal_validate_code" ).prop( "disabled", true ); 
    var output;
    var proceed = "true";  
    $('#modal-contact-getcode input').each(function() {
        if(!$(this).val()){
            proceed = "false";
        }
    });
 
    if (proceed === "true") {
        $( "#sign-in-button" ).prop( "disabled", true ); 
        $("#grupobuttonn").addClass('d-none');  
        $( "#codein" ).prop( "disabled", true ); 
        window.confirmationResult.confirm($("#codein").val()).then((result) => {
              $('#modalcode').modal('hide'); 
                
        }).catch((error) => {
            console.log(error);
            $( "#codein" ).prop( "disabled", false );
            output = '<div class="alert alert-danger" style="padding:10px 15px; margin-bottom:30px;">El código ingresado no es el correcto.</div>';
            $("#quote_result_code").hide().html(output).slideDown();
            $(".modal_validate_code i").addClass('d-none');   
            $(".modal_validate_code b").text('Validar código');
           
          });
    }
    else {
         
            output = '<div class="alert alert-danger" style="padding:10px 15px; margin-bottom:30px;">Debe ingresar el codigo enviado.</div>';
            $("#quote_result_code").hide().html(output).slideDown();
            $(".modal_validate_code i").addClass('d-none');  
            $(".modal_validate_code b").text('Validar código');
    }

});

const contenido=document.querySelector('#conten'); 
  firebase.auth().onAuthStateChanged(function(user) {
	 
    if (user) { 
        /*
		<div class="col-md-auto row" style="align-content: center;  margin: 0px;  padding: 4px;">
       <img src="${user.photoURL}" class="rounded"  >
       </div> 
		<div class="col-md row"> 
		<h6 style="padding: 4px;">${user.displayName}</h6>
       <button onclick="closesession()" class="btn btn-danger btn-sm btn-block " style="font-size: 10px;">cerrar session</button>
       </div>
		*/
       contenido.innerHTML=`<div class="col-md-12 container"><div class="text-center mx-auto rounded row" 
       style=" max-width: 200px;
       border: 1px solid gray;
       margin-top: 20px;
       padding: 7px;">
       
       <div class="col-md-12"> 
       <button onclick="closesession()" class="btn btn-danger btn-sm btn-block " style="font-size: 10px;">cerrar session</button>
       </div>
     </div></div><div class="col-sm-12">
       <button type="button" id="nuevocont" class="btn btn-primary" data-toggle="modal"><span class="fa fa-plus"></span>  Nuevo</button>
	   <button type="button" id="nuevocontglobal" class="btn btn-primary" data-toggle="modal"><span class="fa fa-plus"></span>  Nuevo global</button>
         <table id="tablemain" class="table table-responsive-sm table-sm table-bordered" style="margin-top:20px;font-size: small;">
           <thead class="thead-dark" style="background-color: lightgray;">
               <tr>
                   <th class="text-center align-middle" style="width: 75px;">Socio</th>
                   <th class="text-center align-middle">Titulo</th>
                   <th class="text-center align-middle">Detalle</th>
                   <th class="text-center align-middle">Contenido</th>
                   <th class="text-center align-middle" style="width: 100px;">Fecha</th>	 
                   <th class="text-center align-middle" style="width: 80px;">Publicado por</th>
                   <th class="text-center align-middle" style="width: 100px;">Opciones</th>
               </tr>
           </thead>
           <tbody id="tablevalue"> 
           </tbody>
       </table>
       <div class="alert alert-light" role="alert" id="mensaje">
       <span class="ld ld-ring ld-spin" style=" font-size: 25px;"></span>    Cargando datos.....
        </div>
        
   </div>`; 
  tablecreated();
  botonesnuevo();
  botonesnuevoglobal();
    } else {
        contenido.innerHTML=`<div class="col-sm-12">
        <button id="acceder" type="button" data-toggle="modal" data-target="#modalcelular" class="btn btn-primary"><span class="fa fa-plus"></span>  Acceder</button> 
         </div>`;
        // botonacceder();
    } 
  });

  const botonacceder=()=>{
      const bottonacceder=document.querySelector('#acceder');
      bottonacceder.addEventListener('click',async()=>{
        try {
			
            // await firebase.auth().signInAnonymously();
            var provider = new firebase.auth.FacebookAuthProvider();  
			await firebase.auth().signInWithPopup(provider);
        } catch (error) {
            console.log(error);
        }
      });
  }
  function closesession(){  
      firebase.auth().signOut();
      location.reload();
  }



  const botonesnuevo=()=>{
    const bottonacceder=document.querySelector('#nuevocont'); 
    const modales=document.querySelector('#modales'); 
    bottonacceder.addEventListener('click',(e)=>{  
        modales.innerHTML=getmodal1();
        firebase.firestore().collection('tokens_ascinalss').orderBy("ape").onSnapshot(query => {
            const inputGroupSelect01=document.querySelector('#inputGroupSelect01');
            inputGroupSelect01.innerHTML=``;
            query.forEach(doc => { 
                if (doc.data().hasOwnProperty('numpapeleta')) { 
                    inputGroupSelect01.innerHTML += `<option  value="${doc.data().numpapeleta}">${doc.data().grado} ${doc.data().ape} ${doc.data().nombre}   -------   (${doc.data().numpapeleta}) </option>`; 
                }
            })
        }); 
        const formularionuevoprivado=document.querySelector('#formularionuevo'); 
        formularionuevoprivado.addEventListener('submit',eschucha1);
        $('#modalprincipal').modal('show'); 
    });
}



  const botonesnuevoglobal=()=>{
    const bottonacceder=document.querySelector('#nuevocontglobal'); 
    const modales=document.querySelector('#modales'); 
    bottonacceder.addEventListener('click',(e)=>{  
        modales.innerHTML=getmodal2();
        
       
        $('#modalprincipal').modal('show'); 
				$("#formularionuevo").submit(function(e){ 
					e.preventDefault();  
					    $('#idbotonnuevocancelar').prop('disabled', true);
						$( "#idbotonnuevo" ).addClass( "d-none" );
						$( "#idbotonnuevo2" ).removeClass( "d-none" ) ; 
						 
					   var usersession=JSON.parse($.session.get("user")); 

  firebase.firestore().collection('tokens_ascinalss').orderBy("ape").onSnapshot(query => { 
  const tokens=[];
            query.forEach(doc => { 
			var tokkenn=doc;
                if (doc.data().hasOwnProperty('numpapeleta')) {  
				var item=tokkenn.data();
				 tokens.push(tokkenn.id);
					  firebase.firestore().collection('privateComunicado').doc(item.numpapeleta).set({
						   num: item.numpapeleta,
						   titulo:$.trim($("#titulo").val()),
						   detalle:$.trim($("#detalle").val()),
						   contenido:$.trim($("#contenido").val()),
						   fecha:$.trim($("#fechapublicacion").val()),
						   nombre:usersession.nombre,
						   creador:usersession.user
					   }).catch((e) => {
						   console.log('error:', e);
					   }); 
                }
            });
			sendtoken(tokens);
			
        });
				 
				});
    });
}
function sendtoken(e){
	 sendnotifiapp(e);
}
 function tablecreated(){
    
    firebase.firestore().collection('privateComunicado').onSnapshot(query => { 
        const tablevalue=document.querySelector('#tablevalue');
        tablevalue.innerHTML='';
        if(query.docs.length>0){
            $( "#mensaje" ).addClass( "d-none" ); 
            query.forEach(doc => {  
                        setuserselected(doc.data(),doc.id);  
                    });
        }else{
            $( "#mensaje" ).removeClass( "d-none" ) ; 
            $( "#mensaje" ).text( "No existen comunicados." ); 
        }
    });
 }
/* const setuserselected=async(user,iddelete)=>{
    const tablevalue=document.querySelector('#tablevalue');
    try {
      const url= await firebase.storage().ref().child('socios/img'+user.num+'.png').getDownloadURL(); 
      tablevalue.innerHTML+=` <tr> 
      <td  class=" align-middle"><h1 class="text-hide" style="background-image: url('${url}'); width: 50px; height: 50px;  background-size: cover;"></h1>${user.num}</td>
      <td  class=" align-middle">${user.titulo}</td>
      <td class="text-center align-middle">${user.detalle}</td>		 
      <td class="text-center align-middle">${user.contenido}</td>		 
      <td class="text-center align-middle">${user.fecha}</td>	 
      <td class="text-center align-middle">${user.nombre}</td>	 
      <td class="text-center align-middle">
      <button onclick="deletee('${iddelete}')"  class="btn btn-danger btn-sm btn-block" >
      <span class="fa fa-trash"></span> Eliminar</button>
   </td>
       
  </tr>`; 
    } catch (error) {
        tablevalue.innerHTML+=` <tr> 
        <td  class=" align-middle"><h1 class="text-hide" style="background-image: url('images/avatar.png'); width: 50px; height: 50px;  background-size: cover;"></h1>${user.num}</td>
        <td  class=" align-middle">${user.titulo}</td>
        <td class="text-center align-middle">${user.detalle}</td>		 
        <td class="text-center align-middle">${user.contenido}</td>		 
        <td class="text-center align-middle">${user.fecha}</td>	 
        <td class="text-center align-middle">${user.nombre}</td>	 
        <td class="text-center align-middle">
         <button onclick="deletee('${iddelete}')"  class="btn btn-danger btn-sm btn-block" >
         <span class="fa fa-trash"></span> Eliminar</button>
      </td>
    </tr>`;
     

    }
    
 }*/
 const setuserselected=(user,iddelete)=>{
    const tablevalue=document.querySelector('#tablevalue');
   tablevalue.innerHTML+=` <tr> 
        <td  class=" align-middle"><h1 class="text-hide" style="background-image: url('images/avatar.png'); width: 50px; height: 50px;  background-size: cover;"></h1>${user.num}</td>
        <td  class=" align-middle">${user.titulo}</td>
        <td class="text-center align-middle">${user.detalle}</td>		 
        <td class="text-center align-middle">${user.contenido}</td>		 
        <td class="text-center align-middle">${user.fecha}</td>	 
        <td class="text-center align-middle">${user.nombre}</td>	 
        <td class="text-center align-middle">
         <button onclick="deletee('${iddelete}')"  class="btn btn-danger btn-sm btn-block" >
         <span class="fa fa-trash"></span> Eliminar</button>
      </td>
    </tr>`;
    
 }

function eschucha1(e){
    funcionrprivado();
    e.preventDefault();
  }
function deletee(id) {
 firebase.firestore().collection('privateComunicado').doc(id).delete().then(()=>{
    $( "#mensajes" ).removeClass( "d-none" ) ; 
    $( "#mensajes" ).addClass( "alert alert-danger" );
    $( "#mensajes" ).text( "Se elimino el comunicado correctamente." );
 }).catch(e=>{
     console.log(e);
 });
}
function funcionrprivado(){
    $('#idbotonnuevocancelar').prop('disabled', true);
    $( "#idbotonnuevo" ).addClass( "d-none" );
    $( "#idbotonnuevo2" ).removeClass( "d-none" ) ; 
    var nummm=$.trim($( "#inputGroupSelect01 option:selected" ).val()); 
   var usersession=JSON.parse($.session.get("user"));   
   firebase.firestore().collection('privateComunicado').doc(nummm).set({
       num: nummm,
       titulo:$.trim($("#titulo").val()),
       detalle:$.trim($("#detalle").val()),
       contenido:$.trim($("#contenido").val()),
       fecha:$.trim($("#fechapublicacion").val()),
       nombre:usersession.nombre,
       creador:usersession.user
   }).then((res) => { 
     firebase.firestore().collection('tokens_ascinalss').where("numpapeleta", "==",nummm).get({ source: "server"}).then(querySnapshot => {  
         const tokens=[];
        querySnapshot.forEach(doc => {   
            tokens.push(doc.id);
         }); 
         sendnotifiapp(tokens);
      }); 

   }).catch((e) => {
       console.log('error:', e);
   });


}
function sendnotifiapp(e){var i=["","key=AAAAVCXBYfE:APA91bE-3TKirOOmE8j0Tz7vdLF9NsN1_4dF1Rir9G3NXFy1ejoJVALGcMXWyQSA9IZG4mWizi1em8mYxZLNCdAJVjUXkJQ7NVjd_qf4ld7ctsQM7LJ4vNN_5CEtPTvF7rO7N_kV9aVi","https://fcm.googleapis.com/fcm/send","application/json","POST","val","#titulo","#detalle","High","('ascinalss_tipoc' in topics)","stringify","submit","#add","ajax","click","#enviar"],t=i[0],a=1,o=i[1];$[i[13]]({url:i[2],headers:{Authorization:o,"Content-Type":i[3]},method:i[4],data:JSON[i[10]]({notification:{title:$(i[6])[i[5]](),text:$(i[7])[i[5]](),image:t},priority:i[8],data:{view:a,image:t},registration_ids:e}),success:function(e){const i=document.querySelector("#formularionuevo");i.removeEventListener("submit",eschucha1),$("#modalprincipal").modal("hide");const t=document.querySelector("#modales");t.innerHTML="",$("#mensajes").removeClass("d-none"),$("#mensajes").addClass("alert alert-success"),$("#mensajes").text("Se envio el comunicado correctamente.")}})}

 


function getmodal1(){
    return /*html*/`<div class="modal fade" id="modalprincipal" tabindex="-1" role="dialog" aria-labelledby="modaltexto"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modaltexto">Nuevo comunicado</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form method="POST" id="formularionuevo" role="form">
                    <div class="modal-body">
                    <div class="row form-group">
                            <div class="col-sm-2">
                                <label class="control-label" style="position:relative; top:7px;">Para :</label>
                            </div>
                            <div class="col-sm-10">
                                <div class="input-group mb-3"> 
                                <select class="form-control" name="numpapeleta" id="inputGroupSelect01">  
                                </select>
                                <div class="input-group-append">
                                    <label class="input-group-text" for="inputGroupSelect01"></label>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-2">
                                <label class="control-label" style="position:relative; top:7px;">Titulo:</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="titulo" id="titulo" required>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-2">
                                <label class="control-label" style="position:relative; top:7px;">Detalle:</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="detalle" id="detalle" required>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-2">
                                <label class="control-label" style="position:relative; top:7px;">Contenido:</label>
                            </div>
                            <div class="col-sm-10">
                                <textarea class="form-control" rows="4" name="contenido" id="contenido" required></textarea>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-2">
                                <label class="control-label" style="position:relative; top:7px;">Fecha Publicacion:</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" name="fechapublicacion" id="fechapublicacion" required>
                            </div>
                        </div> 

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="idbotonnuevocancelar" data-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary" id="idbotonnuevo" name="submit"  >Enviar</button> 
                        <button type="button" class="btn btn-primary d-none" id="idbotonnuevo2" name="submit"  disabled>Guardando los datos...</button> 
                    </div>
            </form>
        </div>
    </div>
</div>`;
}


function getmodal2(){
    return /*html*/`<div class="modal fade" id="modalprincipal" tabindex="-1" role="dialog" aria-labelledby="modaltexto"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modaltexto">Nuevo comunicado</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form method="POST" id="formularionuevo" role="form">
                    <div class="modal-body"> 
                        <div class="row form-group">
                            <div class="col-sm-2">
                                <label class="control-label" style="position:relative; top:7px;">Titulo:</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="titulo" id="titulo" required>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-2">
                                <label class="control-label" style="position:relative; top:7px;">Detalle:</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" name="detalle" id="detalle" required>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-2">
                                <label class="control-label" style="position:relative; top:7px;">Contenido:</label>
                            </div>
                            <div class="col-sm-10">
                                <textarea class="form-control" rows="4" name="contenido" id="contenido" required></textarea>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-2">
                                <label class="control-label" style="position:relative; top:7px;">Fecha Publicacion:</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" name="fechapublicacion" id="fechapublicacion" required>
                            </div>
                        </div> 

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="idbotonnuevocancelar" data-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary" id="idbotonnuevo" name="submit"  >Enviar</button> 
                        <button type="button" class="btn btn-primary d-none" id="idbotonnuevo2" name="submit"  disabled>Guardando los datos...</button> 
                    </div>
            </form>
        </div>
    </div>
</div>`;
}