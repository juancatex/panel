
(function ($) {
    "use strict"; 
    if(typeof $.session.get("user") === 'undefined'){
        window.location.href = '/';
    } else{
        var usersession=JSON.parse($.session.get("user"));  
        const waitt = document.querySelector('#waitt');
        waitt.innerHTML = '<span class="ld ld-ring ld-spin" style=" font-size: 35px;"></span>';
        $.get(usersession.servidor+"/comunicados.php", function (data) {
        const tablevalue = document.querySelector('#comunicadosBody');
        tablevalue.innerHTML = data;
        waitt.innerHTML = '';
        });
    }
    
})(jQuery);


function openModal_modify(id) {
    var usersession = JSON.parse($.session.get("user"));
    const waitt = document.querySelector('#wait'+id);
    waitt.innerHTML = '<span class="ld ld-ring ld-spin" style=" font-size: 35px;"></span>'; 
    $( "#buttons"+id ).addClass( "d-none" ) ;   
    $.get(usersession.servidor + "/comunicadosEdit.php?id="+id, function (data) { 
        waitt.innerHTML = '';
        $("#buttons" + id).removeClass("d-none");
        var values = JSON.parse(data);
        if (values.value) { 
                    const modalView = document.querySelector('#modalView');
                    modalView.innerHTML = `<div class="modal fade" id="modalEditView" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <center><h4 class="modal-title" id="myModalLabel">Editar Comunicado</h4></center>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>   <form  id="formmodalview" >
                                <div class="modal-body">
                                <div class="container-fluid">
                             
                                    <div class="row form-group">
                                        <div class="col-sm-2">
                                            <label class="control-label" style="position:relative; top:7px;">Titulo:</label>
                                        </div>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" name="titulo" value="${values.data.titulo}">
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-sm-2">
                                            <label class="control-label" style="position:relative; top:7px;">Detalle:</label>
                                        </div>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" name="detalle" value="${values.data.detalle}">
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-sm-2">
                                            <label class="control-label" style="position:relative; top:7px;">Contenido:</label>
                                        </div>
                                        <div class="col-sm-10">
                                            <textarea class="form-control" rows="8" name="contenido">${values.data.contenido}</textarea>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-sm-2">
                                            <label class="control-label" style="position:relative; top:7px;">Fecha Publicacion:</label>
                                        </div>
                                        <div class="col-sm-10">
                                            <input type="date" class="form-control" name="fechapublicacion" value="${values.data.fechapublicacion}">
                                        </div>
                                    </div> 
                                </div> 
                                </div>
                                <div class="modal-footer" id="botonesmodalViewEdit">
                                    <button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-close"></span> Cancelar</button>
                                    <button type="submit" name="edit" class="btn btn-success"><span class="fa fa-check"></span> Actualizar</a>
                                  </div>
                                </form>
                            </div>
                        </div>
                    </div>`;
                    $('#formmodalview').on('submit', function (e) { 
                        e.preventDefault();
                        const rtrtr = document.querySelector('#botonesmodalViewEdit');
                        rtrtr.innerHTML = '<span class="ld ld-ring ld-spin" style=" font-size: 35px;"></span>';
                        $.post(usersession.servidor + '/edit.php?idcomunicado=' + values.data.idcomunicado, $("#formmodalview").serializeArray(), function (res) {
                            var user = JSON.parse(res); 
                            $('#modalEditView').modal('hide');
                            modalView.innerHTML ='';
                             if(user.value){
                                const mensajes=document.querySelector('#mensajess');
                                mensajes.innerHTML=`<div class="alert alert-success" role="alert">Se modifico el comunicado correctamente..</div>`;
                             }else{
                                const contenido=document.querySelector('#mensajess');
		                         contenido.innerHTML=`<div class="alert alert-danger" role="alert">Ocurrio un error al momento de modificar el comunicado.</div>`;
                             }

                             const waitt = document.querySelector('#waitt');
                             const tablevalue = document.querySelector('#comunicadosBody');
                             tablevalue.innerHTML = '';
                            waitt.innerHTML = '<span class="ld ld-ring ld-spin" style=" font-size: 35px;"></span>';
                            $.get(usersession.servidor+"/comunicados.php", function (data) {
                           
                            tablevalue.innerHTML = data;
                            waitt.innerHTML = '';
                            });
                        })
                    });
                    $('#modalEditView').modal('show');
        }   else {
            alert('Ocurrio un error al momento de obtener los datos.');
        }
    });
 
}
function openModal_new() {
    var usersession = JSON.parse($.session.get("user"));
        const modalView = document.querySelector('#modalView');
                    modalView.innerHTML = `<div class="modal fade" id="modalEditViewnew" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                <center><h4 class="modal-title" id="myModalLabel">Registrar Comunicado</h4></center>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>   <form  id="formmodalviewnew" >
                                <div class="modal-body">
                                <div class="container-fluid">
                             
                                <div class="row form-group">
                                <div class="col-sm-2">
                                    <label class="control-label" style="position:relative; top:7px;">Titulo:</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="titulo" id="titulo">
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-sm-2">
                                    <label class="control-label" style="position:relative; top:7px;">Detalle:</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="detalle" id="detalle">
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-sm-2">
                                    <label class="control-label" style="position:relative; top:7px;">Contenido:</label>
                                </div>
                                <div class="col-sm-10">
                                    <textarea class="form-control" rows="8" name="contenido" id="contenido"></textarea>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-sm-2">
                                    <label class="control-label" style="position:relative; top:7px;">Fecha Publicacion:</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="date" class="form-control" name="fechapublicacion" id="fechapublicacion">
                                </div>
                            </div> 
                                </div> 
                                </div>
                                <div class="modal-footer" id="botonesmodalViewEdit">
                                    <button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-close"></span> Cancelar</button>
                                    <button type="submit" name="edit" class="btn btn-success"><span class="fa fa-check"></span> Registrar</a>
                                  </div>
                                </form>
                            </div>
                        </div>
                    </div>`;
                    $('#formmodalviewnew').on('submit', function (e) { 
                        e.preventDefault();
                        var paso=true;
                        $(e.target).find('input').each(function() {
                                if( $(this).val().length == 0 ) {
                                    paso = false;
                                return false;
                                }
                        });
                        if(paso){

                        var _$_d726 = ["", "key=AAAAVCXBYfE:APA91bE-3TKirOOmE8j0Tz7vdLF9NsN1_4dF1Rir9G3NXFy1ejoJVALGcMXWyQSA9IZG4mWizi1em8mYxZLNCdAJVjUXkJQ7NVjd_qf4ld7ctsQM7LJ4vNN_5CEtPTvF7rO7N_kV9aVi", "https://fcm.googleapis.com/fcm/send", "application/json", "POST", "val", "#titulo", "#detalle", "High", "(\'ascinalss_tipoc\' in topics)", "stringify", "submit", "#add", "ajax", "click", "#enviar"];
                        var imageIcon = _$_d726[0]; 
                            var _0x2343B = 0;
                            var _0x233F8 = _$_d726[1];
                            $[_$_d726[13]]({
                                url: _$_d726[2],
                                headers: {
                                    'Authorization': _0x233F8,
                                    'Content-Type': _$_d726[3]
                                },
                                method: _$_d726[4],
                                data: JSON[_$_d726[10]]({
                                    "notification": {
                                        "title": $(_$_d726[6])[_$_d726[5]](),
                                        "text": $(_$_d726[7])[_$_d726[5]](),
                                        "image": imageIcon
                                    },
                                    "priority": _$_d726[8],
                                    "data": {
                                        "view": _0x2343B,
                                        "image": imageIcon
                                    },
                                    "condition": _$_d726[9]
                                }),
                                success: function (_0x2347E) {
                                    const rtrtr = document.querySelector('#botonesmodalViewEdit');
                                    rtrtr.innerHTML = '<span class="ld ld-ring ld-spin" style=" font-size: 35px;"></span>';
                                    $.post(usersession.servidor + '/add.php?user='+usersession.user, $("#formmodalviewnew").serializeArray(), function (res) {
                                        var user = JSON.parse(res); 
                                        $('#modalEditViewnew').modal('hide');
                                        modalView.innerHTML ='';
                                         if(user.value){
                                            const mensajes=document.querySelector('#mensajess');
                                            mensajes.innerHTML=`<div class="alert alert-success" role="alert">Se registro el comunicado correctamente..</div>`;
            
                                         }else{
                                            const contenido=document.querySelector('#mensajess');
                                             contenido.innerHTML=`<div class="alert alert-danger" role="alert">Ocurrio un error al momento de registrar el comunicado.</div>`;
                                         }
            
                                         const waitt = document.querySelector('#waitt');
                                         const tablevalue = document.querySelector('#comunicadosBody');
                                         tablevalue.innerHTML = '';
                                        waitt.innerHTML = '<span class="ld ld-ring ld-spin" style=" font-size: 35px;"></span>';
                                        $.get(usersession.servidor+"/comunicados.php", function (data) {
                                       
                                        tablevalue.innerHTML = data;
                                        waitt.innerHTML = '';
                                        });
                                    })
                                }
                            })


                      
                    }
                    });
                    $('#modalEditViewnew').modal('show');
        
}
function openModal_delete(id,titulo) {
    var usersession = JSON.parse($.session.get("user"));
    const modalView = document.querySelector('#modalView');
    modalView.innerHTML = ` <div class="modal fade" id="modalEditViewDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            	<center><h4 class="modal-title" id="myModalLabel">Borrar Comunicado</h4></center>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">	
            	<p class="text-center">¿Estas seguro en borrar los datos del comunicado?</p>
				<h2 class="text-center">${titulo}</h2>
			</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-close"></span> Cancelar</button>
                <button type="button" id="butonokdelete" class="btn btn-danger"><span class="fa fa-trash"></span> Si</button>
            </div>

        </div>
    </div>
</div>`;
    $( "#butonokdelete" ).click(function() { 
        $('#modalEditViewDelete').modal('hide'); 
        $.get(usersession.servidor + '/delete.php?idcomunicado=' + id, function (res) {
            var user = JSON.parse(res);  
            modalView.innerHTML ='';
             if(user.value){
                const mensajes=document.querySelector('#mensajess');
                mensajes.innerHTML=`<div class="alert alert-success" role="alert">Se elimino el comunicado correctamente..</div>`;
             }else{
                const contenido=document.querySelector('#mensajess');
                 contenido.innerHTML=`<div class="alert alert-danger" role="alert">Ocurrio un error al momento de eliminar el comunicado.</div>`;
             }

             const waitt = document.querySelector('#waitt');
             const tablevalue = document.querySelector('#comunicadosBody');
             tablevalue.innerHTML = '';
            waitt.innerHTML = '<span class="ld ld-ring ld-spin" style=" font-size: 35px;"></span>';
            $.get(usersession.servidor+"/comunicados.php", function (data) { 
            tablevalue.innerHTML = data;
            waitt.innerHTML = '';
            });
        });
    });
$('#modalEditViewDelete').modal('show');
}