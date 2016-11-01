

function cierra_suggest(campo)	{
	$("#autosuggest").remove();
}

function autoSuggest( campo, ev, tabla, input ){
        
    var key = ( window.event ) ? ev.keyCode : ev.which;
    if( document.getElementById('autosuggest') != undefined )
    {
    	if( key == 27 )
    	{ 
    		$("#autosuggest").remove();
    		$(campo).val("");
    	}
    }
    
    if( key != 27 )
    {
    	if( key == 40 )
    	{
    		if( $("#autosuggest li.selected").next().attr("num") == undefined )
    		{
    			return false;
    		}
    		
    		$("#autosuggest li.selected").removeClass("selected").next().addClass("selected");
    		return false;
    	}
    	if( key == 38 )
    	{
    		if( $("#autosuggest li.selected").prev().attr("num") == undefined )
    		{
    			return false;
    		}
    		
    		$("#autosuggest li.selected").removeClass("selected").prev().addClass("selected");
    		return false;
    	}
    	
    	if( key == 13 )                                                        
    	{
    	    
    	    busqueda = campo.value;
            if(busqueda==""){
                return false;
            }else{
                busqueda = busqueda.replace(/[`~!@#$%^&*()_|+\-=?;:\'\"<>\{\}\[\]\\\/]/gi, '');
                busqueda = busqueda.replace(new RegExp(" ", 'g'), "-");
                window.location = '<?= URL_APLICACION ?>'+idioma+'/search/'+busqueda+'/Search.html';
            }
                
    		/*if( $("#autosuggest li.selected").attr("valur") != undefined )
    		{
                var id = $("#autosuggest li.selected").attr("valur");
    		}*/
    	}
    	
    	if( document.getElementById('autosuggest') == undefined )
    	{
    		var autosug = document.createElement("div");
    		autosug.setAttribute("id", "autosuggest");
    		
    		document.body.appendChild(autosug);
    	}
    	
    	$("#autosuggest").css({
    		display: "none",
    		left: $(campo).offset().left,
    		top: $(campo).offset().top + $(campo).height() + 10
    	});
    	
    	if( campo.value.length )
    	{
    		$("#autosuggest").css({display: "block"});
            $.ajax({
            	url: "ajax/buscar.ajax.php",
            	method: "post",
                type: "post",
            	async: true,
            	data: "buscar=" + escape( campo.value )+"&tabla="+tabla+"&input="+input,
            	success: function(data){
            	   $("#autosuggest").html(data);
            	}
            });
    	}
    	else
    	{
    		$("#autosuggest").remove();
    	}
    }
}

function cargarCliente(id, nombre, input){
    document.getElementById(input).value = id;
    document.getElementById("buscador").value = nombre;
}


function controlObligatorios()
{
   var falta = 0;
   var a = 0;
   var cadena = "";
   $(".obligatorio").each(function(){
        valor = escape($(this).val());
        if(valor=="check"){
            valor = $("#desea").is(':checked');
        }
        if(valor==""){
            falta = 1;
        }
        a = a+1;
   });
   
   $(".noobligatorio").each(function(){
        valor = escape($(this).val());
        if(valor=="check"){
            valor = $("#desea").is(':checked');
        }
        
        a = a+1;
   });
   
   if(falta=="1"){
        alert("Debe completar los campos Obligatorios");
        return false;
   }else{
         document.getElementById("edicion").submit();
   }
}

function enviarConsulta()
{
   var falta = 0;
   var a = 0;
   var cadena = "";
   $j(".obligatorio").each(function(){
        valor = escape($(this).val());
        if(valor=="check"){
            valor = $j("#desea").is(':checked');
        }
        nombre = $(this).attr("id");
        if(a==0){
            cadena = nombre+"="+valor;
        }else{
            cadena = cadena+"&"+nombre+"="+valor;
        }
        if(valor==""){
            falta = 1;
        }
        a = a+1;
   });
   
   $j(".noobligatorio").each(function(){
        valor = escape($(this).val());
        if(valor=="check"){
            valor = $j("#desea").is(':checked');
        }
        nombre = $(this).attr("id");
        if(a==0){
            cadena = nombre+"="+valor;
        }else{
            cadena = cadena+"&"+nombre+"="+valor;
        }
        a = a+1;
   });
   
   if(falta=="1"){
        alert("Debe completar los campos");
        return false;
   }else{
        $j("#enviazo").css({
           display: "none" 
        });
        $j.ajax({
    		url: "ajax/enviarConsulta.ajax.php",
    		method: "post",
    		async: true,
    		data: cadena,
    		success: function(data){
    			$j(".obligatorio").each(function(){
                    $(this).val("");
                });
                $j(".noobligatorio").each(function(){
                    $(this).val("");
                });
                $j("#enviazo").css({
                   display: "block" 
                });
                $("#consejos").html("<label style='float: left; margin: 20px 20px 20px 50px;'>Gracias por escribirnos, a la brevedad te responderemos</label>");
    		    $("#consejos").css({height: "63px"});
            }
    	});
   }
}

function controlOrden()
{
   var falta = 0;
   var a = 0;
   var cadena = "";
   $(".obligatorio").each(function(){
        valor = escape($(this).val());
        if(valor=="check"){
            valor = $("#desea").is(':checked');
        }
        if(valor==""){
            falta = 1;
        }
        a = a+1;
   });
   
   $(".noobligatorio").each(function(){
        valor = escape($(this).val());
        if(valor=="check"){
            valor = $("#desea").is(':checked'); 
        }
        
        a = a+1;
   });
   if($("#cambio_canvas").val()=="1"){
        $(".guardarImagen").click();
   }
    
   
   if(falta=="1"){
        alert("Debe completar los campos Obligatorios");
        return false;
   }else{
        
         document.getElementById("edicion").submit();
   }
}

function cambio_canvas() {
    $("#cambio_canvas").val("1");
}

function enviarConsulta()
{
   var falta = 0;
   var a = 0;
   var cadena = "";
   $j(".obligatorio").each(function(){
        valor = escape($(this).val());
        if(valor=="check"){
            valor = $j("#desea").is(':checked');
        }
        nombre = $(this).attr("id");
        if(a==0){
            cadena = nombre+"="+valor;
        }else{
            cadena = cadena+"&"+nombre+"="+valor;
        }
        if(valor==""){
            falta = 1;
        }
        a = a+1;
   });
   
   $j(".noobligatorio").each(function(){
        valor = escape($(this).val());
        if(valor=="check"){
            valor = $j("#desea").is(':checked');
        }
        nombre = $(this).attr("id");
        if(a==0){
            cadena = nombre+"="+valor;
        }else{
            cadena = cadena+"&"+nombre+"="+valor;
        }
        a = a+1;
   });
   
   if(falta=="1"){
        alert("Debe completar los campos");
        return false;
   }else{
        
        $j.ajax({
    		url: "ajax/enviarConsulta.ajax.php",
    		method: "post",
    		async: true,
    		data: cadena,
    		success: function(data){
    			$j(".obligatorio").each(function(){
                    $(this).val("");
                });
                $j(".noobligatorio").each(function(){
                    $(this).val("");
                });
                $j("#enviazo").css({
                   display: "block" 
                });
                $("#consejos").html("<label style='float: left; margin: 20px 20px 20px 50px;'>Gracias por escribirnos, a la brevedad te responderemos</label>");
    		    $("#consejos").css({height: "63px"});
            }
    	});
   }
}

function slideShow() {

	//Set the opacity of all images to 0
	$('#gallery a').css({opacity: 0.0});
	
	//Get the first image and display it (set it to full opacity)
	$('#gallery a:first').css({opacity: 1.0});
	
	//Set the caption background to semi-transparent
	$('#gallery .caption').css({opacity: 0.7});

	//Resize the width of the caption according to the image width
	$('#gallery .caption').css({width: $('#gallery a').find('img').css('width')});
	
	//Get the caption of the first image from REL attribute and display it

	//Call the gallery function to run the slideshow, 6000 = change to next image after 6 seconds
	setInterval('gallery()',4000);
}

function gallery() {
	//if no IMGs have the show class, grab the first image
	var current = ($('#gallery a.show')?  $('#gallery a.show') : $('#gallery a:first'));

	//Get next image, if it reached the end of the slideshow, rotate it back to the first image
	var next = ((current.next().length) ? ((current.next().hasClass('caption'))? $('#gallery a:first') :current.next()) : $('#gallery a:first'));	
	
	//Get next image caption
	var caption = "";	
	
	//Set the fade in effect for the next image, show class has higher z-index
	next.css({opacity: 0.0})
	.addClass('show')
	.animate({opacity: 1.0}, 1000);

	//Hide the current image
	current.animate({opacity: 0.0}, 1000)
	.removeClass('show');
	
	//Set the opacity to 0 and height to 1px
	$('#gallery .caption').animate({opacity: 0.0}, { queue:false, duration:0 }).animate({height: '1px'}, { queue:true, duration:300 });	
	
	//Animate the caption, opacity to 0.7 and heigth to 100px, a slide up effect
	$('#gallery .caption').animate({opacity: 0.7},100 ).animate({height: '100px'},500 );
	
	//Display the content
	$('#gallery .content').html(caption);	
}

function enviarContacto() {
    
    var nombre = escape(document.getElementById( 'nombre' ).value);
    var consulta = escape(document.getElementById( 'consulta' ).value);
    var mail = escape(document.getElementById( 'mail' ).value);
    
    if(nombre =="" || consulta=="" || mail==""){
        alert("Debe completar los campos obligatorios");
        return false;
    }
    
    document.getElementById( 'nombre' ).value="";
    document.getElementById( 'consulta' ).value="";
    document.getElementById( 'mail' ).value="";
    
    $.ajax({
    	url: "ajax/enviarContacto.ajax.php",
    	method: "post",
        type: "post",
    	async: true,
    	data: "nombre="+nombre+"&consulta="+consulta+"&mail="+mail,
    	success: function(data){
    	    document.getElementById( 'nombre' ).value="";
            document.getElementById( 'consulta' ).value="";
            document.getElementById( 'mail' ).value="";
            
            
    	    var fondo_c = document.createElement( 'div' );
       	    fondo_c.setAttribute( "id", "fondo_cargando" );
            
            var img_c = document.createElement( 'div' );
	        img_c.setAttribute( "id", "imagen_cargando" );
        	
        	$( fondo_c ).css({
        		display: "block",
        		position: "fixed",
        		width: "100%",
        		left: 0,
        		top: 0,
        		right: 0,
        		bottom: 0,
                zIndex: "9998",
        		background: "#FFF",
        		opacity: 0
        	});
            
            $( img_c ).css({
        		display: "block",
        		position: "fixed",
        		width: "300px",
        		height: "50px",
                color: "#FFF",
                zIndex: "9999",
        		top: ( $(window).height() - 50 ) /2,
        		left: ( $(window).width() - 300 ) /2,
        		textAlign: "center"
        	});
        	
        	$( img_c ).html( "<label class='labelitas'>Gracias por enviarnos su consulta. <br/>En breve nos comunicaremos</label>" );

        	document.body.appendChild( fondo_c );
        	$(fondo_c).animate({opacity:.8});
            fondo_c.appendChild( img_c );
            
            setTimeout('$("#fondo_cargando").fadeOut(300).queue(function(){ $(this).remove();} );', 3000);
        }
    });
}

function globo100( doffset, ancho )
{
    
	if( document.getElementById( 'globo100' ) == undefined )
	{
	    
		var globo = document.createElement( 'div' );
		$( globo ).attr( "id", "globo100" );
		
		$( "body" ).append( globo );
		
		$( globo ).html("<div class='hover' style='width: "+ancho+"px; '><img src='imagenes/hover.png' /></div>");
		
		$( globo ).css({
			position: "absolute",
			left: $( doffset ).offset().left,
			top: $( doffset ).offset().top+25,
			overflow: "hidden",
			zIndex: 1000
		});
	}
	else
	{
		$( "#globo100" ).remove();
	}
}


function formulario(form, id, lista)
{
    $("html, body").animate({ scrollTop: 0 }, "slow");

	var fondo_negro = document.createElement('div');
	fondo_negro.setAttribute('id',"fondo_negro");
    fondo_negro.setAttribute('onclick',"cerrar_perfil_suave()");
	
	document.body.appendChild(fondo_negro);
	
	$(fondo_negro).css({
		position: "fixed",
		width: "100%",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		background: "#000",
		zIndex: 1000
	});
	
	var formu = document.createElement('div');
	formu.setAttribute('id', "form_img_perfil");
	document.body.appendChild(formu);
	
	$(formu).css({
		position: "absolute",
		display: "block",
        background: "#FFF",
		width: "550px",
		overflow: "hidden",
		left: ($(window).width()-550)/2,
		top: 100,
		padding: "10px",
		opacity: "10",
		zIndex: 1001,
	});
    
    
    var cruz = document.createElement('div');
	cruz.setAttribute('id', "cruz");
	document.body.appendChild(cruz);
    cruz.setAttribute('onclick',"cerrar_perfil_suave()");
	
	$(cruz).css({
		position: "absolute",
		display: "block",
        background: "url(<?= URL_APLICACION ?>imagenes/closebox.png) no-repeat",
		width: "30px",
        height: "30px",
		overflow: "hidden",
		left: punto,
		top: punto2,
		padding: "0px",
        cursor: "pointer",
		opacity: "10",
		zIndex: 1001,
	});
    
        
    $.ajax({
    	url: "ajax/formularios.ajax.php",
    	method: "post",
        type: "post",
    	async: true,
    	data: "form="+form,
    	success: function(data){
    	    $(formu).html(data);
    	}
    });
}

function cerrar_perfil_suave()
{
    $("#fondo_negro").fadeOut(700);
	$("#form_img_perfil").fadeOut(700);
    $("#cruz").fadeOut(700);
    setTimeout('$("#fondo_negro").remove();$("#form_img_perfil").remove();$("#cruz").remove();',700);
}

function enviarArriba(id, orden, anterior, idanterior, maq, estado) {
    $.ajax({
    	url: "ajax/ordenar.ajax.php",
    	method: "post",
        type: "post",
    	async: true,
    	data: "id="+id+"&orden="+orden+"&anterior="+anterior+"&idanterior="+idanterior+"&direccion=aba"+"&maq="+maq+"&estado="+estado,
    	success: function(data){
    	    $("#contenedorOrdenes").html(data); 
    	}
    });
}

function enviarAbajo(id, orden, siguiente, idsiguiente, maq, estado) {
    $.ajax({
    	url: "ajax/ordenar.ajax.php",
    	method: "post",
        type: "post",
    	async: true,
    	data: "id="+id+"&orden="+orden+"&siguiente="+siguiente+"&idsiguiente="+idsiguiente+"&direccion=arr"+"&maq="+maq+"&estado="+estado,
    	success: function(data){
    	   $("#contenedorOrdenes").html(data); 
    	}
    });
}

function eliminarOrden(id) {
    if(confirm("Seguro desea eliminar la orden "+id+"?")){
        $.ajax({
        	url: "ajax/eliminarOrden.ajax.php",
        	method: "post",
            type: "post",
        	async: true,
        	data: "id="+id,
        	success: function(data){
        	    window.location = window.location.href;
        	}
        });
    }
        
}

function eliminarCliente(id, nombre) {
    if(confirm("Seguro desea eliminar el cliente "+nombre+"?")){
        $.ajax({
        	url: "ajax/eliminarCliente.ajax.php",
        	method: "post",
            type: "post",
        	async: true,
        	data: "id="+id,
        	success: function(data){
        	    window.location = window.location.href;
        	}
        });
    }
        
}

function controlPagos(id) {
    $.ajax({
    	url: "ajax/controlPagos.ajax.php",
    	method: "post",
        type: "post",
    	async: true,
    	data: "id="+id,
    	success: function(data){
    	    if(data=="10"){
    	       /*TIENE ASIENTO EN CUENTA SIN PAGOS*/
    	       if(confirm("La orden que quiere cancelar tiene un asiento generado en la cuenta corriente, el mismo se anulara. Esta seguro?")){
    	           candelarOrden(id)
    	       }
    	    }else if(data=="11"){
    	       /*TIENE ASIENTO EN CUENTA CON PAGOS*/
    	       if(confirm("La orden que quiere cancelar tiene un asiento generado en la cuenta corriente, y pagos. Tanto los pagos como el asiento de cuenta se eliminaran. Esta seguro?")){
    	           candelarOrden(id)
    	       }
    	    }
    	}
    });
        
}

function candelarOrden(id) {
    $.ajax({
    	url: "ajax/candelarOrden.ajax.php",
    	method: "post",
        type: "post",
    	async: true,
    	data: "id="+id,
    	success: function(data){
    	    window.location = window.location.href;
    	}
    });
}

function cargarOrdena(orden, id) {
    $.ajax({
    	url: "ajax/cargarOrdena.ajax.php",
    	method: "post",
        type: "post",
    	async: true,
    	data: "id="+id+"&orden="+orden,
    	success: function(data){
    	}
    });
}

