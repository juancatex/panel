 function imgToBase64(src, callback) {
  var outputFormat = src.substr(-3) === 'png' ? 'image/png' : 'image/jpeg';
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
} 

function centrarText(doc, texto, posvertical) {
  var pageSize = doc.internal.pageSize;
  var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  var dime = doc.getTextDimensions(texto);
  doc.text(texto, (pageWidth / 2) - (dime.w / 2), posvertical);
}
  
  
function openRecibo(imagen){ 
	 
     var pdfresukt= _pdf(imagen);
	 swal({ 
    html: '<div id="framepdf" style="display:none;">'+
	 '<div style=" width: 100%; "> <button id="close_id_swal" class="close" style="float: right; margin: 0 15px 2px 5px; ">X</button> </div>'+
    '<iframe id="printpdf" name="printpdf" src="'+pdfresukt+'" style="width:100%;height:1000px;" allowfullscreen></iframe></div>',
    showConfirmButton: false, 
    showCancelButton: true,
    confirmButtonText: 'Ok',
    cancelButtonText:'Cerrar', 
    confirmButtonColor: '#4dbd74',
    cancelButtonColor: '#f86c6b', 
    buttonsStyling: true,
    reverseButtons: true,
      onBeforeOpen: () => { 
        swal.showLoading() ; 
        swal.disableButtons();
        $( "#close_id_swal" ).click(function() {
          swal.close();  
        });
        $('#printpdf').on('load', function() {
          $("#framepdf").css("display", "inline");
          swal.hideLoading() ; 
          $(".swal2-popup").css("width", "80em"); 
          $(".swal2-popup").css("padding", "0px 0px 20px 0px"); 
          });
        
      }
    }) .catch(error => {
        swal.showValidationError("Request failed: ${error}");
      });	 
}

function _pdf_garate(base64,docnum) {
	var numerocontrol='CG'+moment().format("YYMDHHmmss");

    var doc = new jsPDF('p', 'mm', 'a4'); 
    doc.setProperties({
      title: 'Contrato con garantes'
    });
	 
    doc.addImage(base64, 'JPEG', 18, 15, 31, 20); 
    doc.setFontSize(10);
	 
    centrarText(doc,'ASOCIACIÓN NACIONAL DE SUBOFICIALES Y SARGENTOS', 22);
	centrarText(doc,'DE LAS FUERZAS ARMADAS DEL ESTADO', 27); 
     
    doc.setFontSize(14);
    doc.setFontStyle('bold');
    centrarText(doc, 'CONTRATO DE PRÉSTAMO CON GARANTES', 40);
	doc.setFontStyle('normal');
	
	  
	
	var qr = new QRious({
			value: 'dow:'+moment().format("YYYY-MM-DD HH:mm:ss")+'|doc:'+docnum+'|serie:'+numerocontrol
	}); 
    doc.addImage(qr.toDataURL('image/jpeg'), 'JPEG', 175, 14, 18, 18);
	 
	 
	
	doc.setFontSize(7);
	doc.text(numerocontrol,175,35);
	doc.setFontSize(9); 
	doc.text("Nro: "+docnum,177,38);
	doc.setFontStyle('normal');
       
	doc.autoTable({ 
	theme: 'plain',
    head:[{name:'data'}],
    body:[
	{name:`Conste por el presente Documente Privado de Préstamo de Dinero, que suscriben las partes al amparo de los Artículos 450, 451 y siguientes del Código Civil vigente, el mismo, que al solo reconocimiento de firmas y rubricas será elevado a instrumento público, al tenor de las siguientes clausulas:`},
	{name:{content:'PRIMERA (PARTES CONTRATANTES).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1}}}},
	{name:`En el presente contrato intervienen: 
1.1. La Asociación Nacional de Suboficiales y Sargentos de las Fuerzas Armadas (ASCINALSS), legalmente constituida al amparo de las leyes del Estado Plurinacional de Bolivia, con domicilio en la Calle Díaz Romero esquina Lucas Jaimes No. 1799 de la ciudad de La Paz, debidamente representada por el SOM. DESN. Wilson Constantino Almanza Angulo, Presidente del Consejo Ejecutivo Nacional, con 3108753 OR; Sof. My. DEPSS. Nelson Guardia Rodríguez, Secretario de Hacienda, con CI 4381706 CB; y Sof. My. DESA. Wilfredo Ramírez Paredes, Secretario de Bienestar Social Vivienda y Régimen Interno, con CI 3393502 LP; todos mayores de edad y hábiles por derecho, representantes legales de acuerdo a las facultades conferidas en el Poder Notarial Nº 405/2019 de fecha 29 de agosto de 2019, emitido por la Notario de Fe Pública Nº22, a cargo de la Abg. Susana Felipa Alanoca Condori, que para fines de este contrato se denominaran la ACREEDORA.
1.2. _______________________________ con CI __________, mayor de edad y hábil por derecho, con domicilio en _______________________________, que para efectos del presente contrato se denominara el DEUDOR.`},
	{name:{content:'SEGUNDA (OBJETO).-',styles:{ halign: 'left',fontStyle:'bold' ,cellPadding:{top: 0, right: 0, bottom: 0, left:1}}}},  
	{name:`En virtud al presente contrato, la ACREEDORA da y otorga un préstamo de dinero a favor del DEUDOR por la suma de Sus. __________ (______________________________________ 00/100 DÓLARES AMERICANOS) que constituye el monto efectivamente desembolsado, mismo que estará sujeto a la variación del tipo de cambio del día.
El DEUDOR declara recibir dicho monto a su entera satisfacción a tiempo de la suscripción del presente contrato.`},
	{name:{content:'TERCERA (PLAZO Y FORMA DE PAGO).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}}, 
	{name:`El DEUDOR se obliga a devolver la suma total de dinero recibida, objeto de este contrato, en el plazo máximo e improrrogable de ____ meses, computables a partir de la fecha del desembolso del préstamo, mediante cuotas o amortizaciones mensuales de Sus. __________ (______________________________________/100 DÓLARES AMERICANOS), mismo que estarán sujetos a la variación del tipo de cambio del día, a través de descuentos mensuales vía Ministerio de Defensa.
Si por algún motivo no se realiza el descuento de alguna de las cuotas o amortizaciones mediante planillas remitidas por el Ministerio de Defensa, el DEUDOR se compromete a pagar en forma directa mediante depósito a la cuenta bancaria de la ACREEDORA.`},
    {name:{content:'CUARTA (INTERESES).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1}}}},
	{name:`El DEUDOR se obliga a cancelar el interés mensual del ___ % sobre el saldo capital.`},
	{name:{content:'QUINTA (GARANTÍA).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}},
	
	{name:`El DEUDOR garantiza el fiel cumplimiento del presente contrato y de todas las obligaciones señaladas, inherentes, derivadas y emergentes del mismo, con la generalidad de sus bienes habidos y por haber, presentes y futuros, de conformidad a lo previsto por el art. 1335 del Código Civil, y especialmente con las siguientes garantías específicas:
5.1. Garantía personal de los señores:
5.1.1. _______________________________ con CI __________, mayor de edad y hábil por derecho, con domicilio en _________________________________________________________; y
5.1.2. _______________________________ con CI __________, mayor de edad y hábil por derecho, con domicilio en _________________________________________________________.
Ambos GARANTES toman para si todas las estipulaciones de este contrato, y que a su vez garantizan, de igual forma que el DEUDOR, con la generalidad de sus bienes habidos y por haber, presentes y futuros, de conformidad a lo previsto por el art. 1335 del Código Civil.
5.2. Con las Prestaciones otorgadas en su condición de socio activo de la ASCINALSS, que en el presente contrato tiene calidad de ACREEDORA. `},

	{name:{content:'SEXTA (EVENTOS DEL INCUMPLIMIENTO).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 1, right: 0, bottom: 0, left:1} }}},
	
	{name:`En el evento que el DEUDOR ingrese en impago por 3 cuotas o amortizaciones continuas, la ACREEDORA podrá ejecutar el cumplimiento de la obligación de acuerdo a las siguientes condiciones:
6.1. Si el DEUDOR se encuentra en su condición de socio activo de la ASCINALSS, que en el presente contrato tiene calidad de ACREEDORA, y no tiene liquidez para realizar el pago mediante descuento vía Ministerio de Defensa, se deberá ejecutar la garantía de la siguiente forma:
6.1.1. Alta a ambos GARANTES en sumas iguales sobre la cuota o amortización pactada, para lo cual, ambos GARANTES autorizan de manera expresa a la ACREEDORA, realizar el descuento en sus haberes vía Ministerio de Defensa sin reclamo alguno.
6.2. Si el DEUDOR pierde la condición de socio de la ASCINALSS, que en el presente contrato tiene calidad de ACREEDORA, las garantías se deberán ejecutar en el siguiente orden:
6.2.1. Sobre las Prestaciones otorgadas en su condición de socio, hasta cubrir el monto total del Capital más los intereses generados por la deuda; para este efecto la ACREEDORA realizara la liquidación de oficio sobre las prestaciones mencionadas.
6.2.2. En caso de todavía existir saldo pendiente, la ACREEDORA realizara el alta a ambos GARANTES en sumas iguales sobre la cuota o amortización pactada, conforme el punto 6.1.1. de la presente clausula.
6.2.3. En caso de todavía existir saldo pendiente, se acudirá a la vía judicial sobre los bienes muebles e inmuebles, presentes y futuros sin limitación alguna del DEUDOR y/o GARANTES, de acuerdo a la cláusula séptima del contrato en sujeción del art. 437 del Código Civil.`},
	
	{name:{content:'SÉPTIMA (SOBRE EL COBRO EN LA VÍA JUDICIAL).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}},
	{name:`A efectos del incumplimiento del pago de la obligación, la ACREEDORA se reserva el derecho de iniciar las acciones legales pertinentes, sea en la vía ejecutiva o coactiva civil. El DEUDOR acepta someterse a cualquiera de la vía elegida por la ACREEDORA.`},
	{name:{content:'OCTAVA (PAGO ANTICIPADO).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}},
	{name:`El DEUDOR podrá realizar amortizaciones extraordinarias o cancelar totalmente el saldo de la obligación en cualquier momento anterior al vencimiento del plazo convenido mediante depósito a la cuenta bancaria de la Institución.`},
	{name:{content:'NOVENA (REAJUSTE DE SALDO).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}},
	{name:`Ante eventualidades de devaluaciones monetarias expresas o tacitas, el DEUDOR acepta voluntariamente cualquier modificación en el tipo de cambio con relación al dólar americano, esto determinara automáticamente el reajuste de los saldos deudores y las amortizaciones mensuales.`},
	{name:{content:'DECIMA (MODIFICACIONES AL CONTRATO).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}},
	{name:`Los términos y condiciones contenidos en este Contrato no podrán ser modificados en ningún caso, con excepción que se trate para el cambio de GARANTES, previo cumplimiento de requisitos para tal efecto.`}, 
	{name:{content:'DECIMA PRIMERA (CONFORMIDAD).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}},
	{name:`En señal de conformidad y aceptación con las clausulas precedentes, los representantes legales de la ACREEDORA, el DEUDOR y los GARANTES suscribimos el presente contrato, comprometiéndonos a su fiel y estricto cumplimiento.`},
	{name:`
La Paz, __ de ______________ de `+moment().format("YYYY")}
	],
    startY: 46,
    rowPageBreak: 'auto',
	pageBreak: 'auto', 
	showHead:'never',  
    bodyStyles: { valign: 'middle',fontSize:12 },
  }); 
  
    
   
	doc.autoTable({ 
	theme: 'plain',
    head:[{name:'data1'}],
    body:[
	{name:'________________________________________'},
	{name:'NOMBRE:.................................................................'},
	{name:'C.I.:...................................'},
	{name:'DEUDOR'}
	 ],
    startY: doc.previousAutoTable.finalY + 30, 
	showHead:'never',  
    bodyStyles: {textColor:20,fontSize:10, valign: 'middle',halign: 'center',cellPadding:{top: 1, right: 0, bottom: 1, left:0} },
  }); 
  
	  
	doc.autoTable({
    theme: 'plain',		
    head:[{name:'data1'},{date:'data2'}],
    body:[
	{name:'________________________________________', date:{content:'________________________________________' }},
	{name:'NOMBRE:.................................................................', date:{content:'NOMBRE:.................................................................' }},
	{name:'C.I.:...................................', date:{content:'C.I.:...................................' }},
	{name:'GARANTE 1', date:{content:'GARANTE 2' }}
	 ],
    startY: doc.previousAutoTable.finalY + 30, 
	showHead:'never',  
    bodyStyles: {textColor:20,fontSize:10, valign: 'middle',halign: 'center',cellPadding:{top: 1, right: 0, bottom: 1, left:0} },
  }); 
	
	
	
	doc.autoTable({ 
	theme: 'plain',
    head:[{name:'data1'},{date:'data2'}],
    body:[
	{name:'______________________________________', date:{content:'______________________________________' }},
	{name:'Sof. My. DESA. Wilfredo Ramirez Paredes', date:{content:'Sof. My. DEPSS. Nelson Guardia Rodriguez' }},
	{name:'STRIO BIENESTAR SOCIAL Y VDA  “ASCINALSS”', date:{content:'SECRETARIO DE HACIENDA  “ASCINALSS”' }}
	 ],
    startY: doc.previousAutoTable.finalY + 30, 
	showHead:'never',  
    bodyStyles: {textColor:20,fontSize:10, valign: 'middle',halign: 'center',cellPadding:{top: 1, right: 0, bottom: 1, left:0} },
  }); 
	
	doc.autoTable({ theme: 'plain',
    head:[{name:'data1'}],
    body:[
	{name:'______________________________________'},
	{name:'SOM. DESN. Wilson Almanza Angulo'},
	{name:'PRESIDENTE C.E.N.  “ASCINALSS”'} 
	 ],
    startY: doc.previousAutoTable.finalY + 30, 
	showHead:'never',  
    bodyStyles: {textColor:20,fontSize:10, valign: 'middle',halign: 'center',cellPadding:{top: 1, right: 0, bottom: 1, left:0} },
  }); 
  
	return doc.output('datauristring');  
}
function _pdf_sin_garante(base64,docnum) {
	var numerocontrol='CS'+moment().format("YYMDHHmmss");

    var doc = new jsPDF('p', 'mm', 'a4'); 
    doc.setProperties({
      title: 'Contrato sin garantes'
    });
	 
    doc.addImage(base64, 'JPEG', 18, 15, 31, 20); 
    doc.setFontSize(10);
	 
    centrarText(doc,'ASOCIACIÓN NACIONAL DE SUBOFICIALES Y SARGENTOS', 20);
	centrarText(doc,'DE LAS FUERZAS ARMADAS DEL ESTADO', 25); 
     
    doc.setFontSize(14);
    doc.setFontStyle('bold');
    centrarText(doc, 'CONTRATO DE PRÉSTAMO SIN GARANTES', 34);
	doc.setFontStyle('normal');
	
	  
	
	var qr = new QRious({
		value: 'dow:'+moment().format("YYYY-MM-DD HH:mm:ss")+'|doc:'+docnum+'|serie:'+numerocontrol
	}); 
    doc.addImage(qr.toDataURL('image/jpeg'), 'JPEG', 175, 14, 18, 18);
	 
	doc.setFontSize(7);
	doc.text(numerocontrol,175,35);
	doc.setFontSize(9); 
	doc.text("Nro: "+docnum,177,38);
	doc.setFontStyle('normal');
       
	doc.autoTable({ 
	theme: 'plain',
    head:[{name:'data'}],
    body:[
	{name:`Conste por el presente Documente Privado de Préstamo de Dinero, que suscriben las partes al amparo de los Artículos 450, 451 y siguientes del Código Civil vigente, el mismo, que al solo reconocimiento de firmas y rubricas será elevado a instrumento público, al tenor de las siguientes clausulas:`},
	{name:{content:'PRIMERA (PARTES CONTRATANTES).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1}}}},
	{name:`En el presente contrato intervienen: 
1.1. La Asociación Nacional de Suboficiales y Sargentos de las Fuerzas Armadas (ASCINALSS), legalmente constituida al amparo de las leyes del Estado Plurinacional de Bolivia, con domicilio en la Calle Díaz Romero esquina Lucas Jaimes No. 1799 de la ciudad de La Paz, debidamente representada por el SOM. DESN. Wilson Constantino Almanza Angulo, Presidente del Consejo Ejecutivo Nacional, con 3108753 OR; Sof. My. DEPSS. Nelson Guardia Rodríguez, Secretario de Hacienda, con CI 4381706 CB; y Sof. My. DESA. Wilfredo Ramírez Paredes, Secretario de Bienestar Social Vivienda y Régimen Interno, con CI 3393502 LP; todos mayores de edad y hábiles por derecho, representantes legales de acuerdo a las facultades conferidas en el Poder Notarial Nº 405/2019 de fecha 29 de agosto de 2019, emitido por la Notario de Fe Pública N°22, a cargo de la Abg. Susana Felipa Alanoca Condori, que para fines de este contrato se denominaran la ACREEDORA.
1.2. _______________________________ con CI __________, mayor de edad y hábil por derecho, con domicilio en _______________________________, que para efectos del presente contrato se denominara el DEUDOR.`},
	{name:{content:'SEGUNDA (OBJETO).-',styles:{ halign: 'left',fontStyle:'bold' ,cellPadding:{top: 0, right: 0, bottom: 0, left:1}}}},  
	{name:`En virtud al presente contrato, la ACREEDORA da y otorga un préstamo de dinero a favor del DEUDOR por la suma de Sus. __________ (______________________________________ 00/100 DÓLARES AMERICANOS) que constituye el monto efectivamente desembolsado, mismo que estará sujeto a la variación del tipo de cambio del día.
El DEUDOR declara recibir dicho monto a su entera satisfacción a tiempo de la suscripción del presente contrato.`},
	{name:{content:'TERCERA (PLAZO Y FORMA DE PAGO).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}}, 
	{name:`El DEUDOR se obliga a devolver la suma total de dinero recibida, objeto de este contrato, en el plazo máximo e improrrogable de ____ meses, computables a partir de la fecha del desembolso del préstamo, mediante cuotas o amortizaciones mensuales de Sus. __________ (______________________________________/100 DÓLARES AMERICANOS), mismo que estarán sujetos a la variación del tipo de cambio del día, a través de descuentos mensuales vía Ministerio de Defensa.
Si por algún motivo no se realiza el descuento de alguna de las cuotas o amortizaciones mediante planillas remitidas por el Ministerio de Defensa, el DEUDOR se compromete a pagar en forma directa mediante depósito a la cuenta bancaria de la ACREEDORA.`},
    {name:{content:'CUARTA (INTERESES).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1}}}},
	{name:`El DEUDOR se obliga a cancelar el interés mensual del ___ % sobre el saldo capital.`},
	{name:{content:'QUINTA (GARANTÍA).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}},
	{name:`El DEUDOR garantiza el fiel cumplimiento del presente contrato y de todas las obligaciones señaladas, inherentes, derivadas y emergentes del mismo, con la generalidad de sus bienes habidos y por haber, presentes y futuros, de conformidad a lo previsto por el art. 1335 del Código Civil, y especialmente con la garantía de sus Prestaciones otorgadas en su condición de socio activo de la ASCINALSS, que en el presente contrato tiene calidad de ACREEDORA.`},

	{name:{content:'SEXTA (EVENTOS DEL INCUMPLIMIENTO).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 1, right: 0, bottom: 0, left:1} }}},
	
	{name:`En el evento que el DEUDOR ingrese en impago por 3 cuotas o amortizaciones continuas, la ACREEDORA podrá ejecutar el cumplimiento de la obligación de acuerdo a las siguientes condiciones:
6.1. Si el DEUDOR pierde la condición de socio de la ASCINALSS, que en el presente contrato tiene calidad de ACREEDORA, las garantías se deberán ejecutar en el siguiente orden:
6.1.1. Sobre las Prestaciones otorgadas en su condición de socio, hasta cubrir el monto total del Capital más los intereses generados por la deuda; para este efecto la ACREEDORA realizara la liquidación de oficio sobre las prestaciones mencionadas.
6.1.2. En caso de todavía existir saldo pendiente, se acudirá a la vía judicial sobre los bienes muebles e inmuebles, presentes y futuros sin limitación alguna del DEUDOR de acuerdo a la cláusula séptima del contrato en sujeción del art. 437 del Código Civil.`},
	
	{name:{content:'SÉPTIMA (SOBRE EL COBRO EN LA VÍA JUDICIAL).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}},
	{name:`A efectos del incumplimiento del pago de la obligación, la ACREEDORA se reserva el derecho de iniciar las acciones legales pertinentes, sea en la vía ejecutiva o coactiva civil. El DEUDOR acepta someterse a cualquiera de la vía elegida por la ACREEDORA.`},
	{name:{content:'OCTAVA (PAGO ANTICIPADO).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}},
	{name:`El DEUDOR podrá realizar amortizaciones extraordinarias o cancelar totalmente el saldo de la obligación en cualquier momento anterior al vencimiento del plazo convenido mediante depósito a la cuenta bancaria de la Institución.`},
	{name:{content:'NOVENA (REAJUSTE DE SALDO).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}},
	{name:`Ante eventualidades de devaluaciones monetarias expresas o tacitas, el DEUDOR acepta voluntariamente cualquier modificación en el tipo de cambio con relación al dólar americano, esto determinara automáticamente el reajuste de los saldos deudores y las amortizaciones mensuales.`},
	{name:{content:'DECIMA (MODIFICACIONES AL CONTRATO).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}},
	{name:`Los términos y condiciones contenidos en este Contrato no podrán ser modificados en ningún caso, con excepción que se trate para el cambio de GARANTES, previo cumplimiento de requisitos para tal efecto.`}, 
	{name:{content:'DECIMA PRIMERA (CONFORMIDAD).-',styles:{ halign: 'left',fontStyle:'bold',cellPadding:{top: 0, right: 0, bottom: 0, left:1} }}},
	{name:`En señal de conformidad y aceptación con las clausulas precedentes, los representantes legales de la ACREEDORA y el DEUDOR suscribimos el presente contrato, comprometiéndonos a su fiel y estricto cumplimiento.`},
	{name:`
La Paz, __ de ______________ de `+moment().format("YYYY")}
	],
    startY: 38,
    rowPageBreak: 'auto',
	pageBreak: 'auto', 
	showHead:'never',  
    bodyStyles: { valign: 'middle',fontSize:11 },
  }); 
  
    
   
	doc.autoTable({ 
	theme: 'plain',
    head:[{name:'data1'}],
    body:[
	{name:'________________________________________'},
	{name:'NOMBRE:.................................................................'},
	{name:'C.I.:...................................'},
	{name:'DEUDOR'}
	 ],
    startY: doc.previousAutoTable.finalY + 20, 
	showHead:'never',  
    bodyStyles: {textColor:20,fontSize:10, valign: 'middle',halign: 'center',cellPadding:{top: 1, right: 0, bottom: 1, left:0} },
  }); 
  
  
	
	doc.autoTable({ 
	theme: 'plain',
    head:[{name:'data1'},{date:'data2'}],
    body:[
	{name:'______________________________________', date:{content:'______________________________________' }},
	{name:'Sof. My. DESA. Wilfredo Ramirez Paredes', date:{content:'Sof. My. DEPSS. Nelson Guardia Rodriguez' }},
	{name:'STRIO BIENESTAR SOCIAL Y VDA  “ASCINALSS”', date:{content:'SECRETARIO DE HACIENDA  “ASCINALSS”' }}
	 ],
    startY: doc.previousAutoTable.finalY + 20, 
	showHead:'never',  
    bodyStyles: {textColor:20,fontSize:10, valign: 'middle',halign: 'center',cellPadding:{top: 1, right: 0, bottom: 1, left:0} },
  }); 
	
	doc.autoTable({ theme: 'plain',
    head:[{name:'data1'}],
    body:[
	{name:'______________________________________'},
	{name:'SOM. DESN. Wilson Almanza Angulo'},
	{name:'PRESIDENTE C.E.N.  “ASCINALSS”'} 
	 ],
    startY: doc.previousAutoTable.finalY + 20, 
	showHead:'never',  
    bodyStyles: {textColor:20,fontSize:10, valign: 'middle',halign: 'center',cellPadding:{top: 1, right: 0, bottom: 1, left:0} },
  }); 
  
	return doc.output('datauristring');
	  
}