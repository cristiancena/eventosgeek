$(document).on('ready', function(){
	listar(db); 
	$('.leermas').on('click', function(e){
		e.preventDefault();
		var rel  = $(this).attr('rel');
		var name = $(this).attr('name');
		var descripcion_bloque  = $('tbody').find("tr[id='"+rel+"']");
		if(name == "true"){
			descripcion_bloque.hide();
			$(this).text("más...");
			$(this).attr('name', 'false');
		}else{
			descripcion_bloque.show();
			$(this).text('ocultar');
			$(this).attr('name', 'true');
		}
	});
	$('#oldmark').on('click', function(){ 
		if(this.checked){ 
			$(".yapaso").addClass('smooth');
			oldmark = true; 
		} 
		else{ 
			$(".yapaso").removeClass('smooth'); 
			oldmark = false;
		} 
		console.log(oldmark);
	});
	$('#todas').on('click', function(){
		$(".seviene").show();
		$(".yapaso").show();
		$(this).addClass('active');
		$('#pasadas, #futuras').removeClass('active');
	});
	$('#pasadas').on('click', function(){
		$(".seviene").hide();
		$(".yapaso").show();
		$(this).addClass('active');
		$('#todas, #futuras').removeClass('active');
	});
	$('#futuras').on('click', function(){
		$(".seviene").show();
		$(".yapaso").hide();
		$(this).addClass('active');
		$('#todas, #pasadas').removeClass('active');
	});
});

function listar (db) {
	var dbl = db.length;
	for (var i = 0; i < dbl; i++) {

		var fila = "<tr class='" + yaPasoSeViene (db[i]) + "'>"  
		+ 	"<td class='evento'>" 
				+ leerMas(db[i].descripcion, i) + " " 
				+ nombreEvento (db[i]) 
				+ "<br>" 
				+ "<a href='mailto:" + db[i].email + "'>"+ db[i].email + "</a>" 
				+ " " + ifFb(db[i]) + " "
				+ " " + ifTw(db[i])
		+ 	"</td>" 
		+ 	"<td class='cuando'>" + fecha(db[i].fecha) + " <br><span class='label'>" + moment(db[i].fecha).fromNow() + "</span></td>"
		+ 	"<td class='donde'>" + db[i].lugar + "</td>"
		+ 	"<td class='costo'>" + db[i].costo +"</td>"
		+ "</tr>";
		$("#eventos").find('tbody').append(fila);
		if(db[i].descripcion !== ""){
			var fila_d = "<tr id='"+i+"' class='info descripcion'>"
			+ "<td colspan='5' >" + db[i].descripcion + "</td>"
			+ "</tr>";
			$("#eventos").find('tbody').append(fila_d + "<tr style='display:none'><td colspan='5'></td></tr>");
		}
	};
}

function ifFb(obj){
	var fb = "";
	if(obj.facebook){
		fb = "<a href='" + obj.facebook + "' target='_blank'>fb</a>"
	}
	return fb;
}

function ifTw(obj){
	var tw = "";
	if(obj.twitter){
		tw = "<a href='" + obj.twitter[0] + "' target='_blank' title='" + obj.twitter[1] + "'>tw</a>"
	}
	return tw;
}

function fecha (obj) {
	if(obj.getHours() == 0){
		var fecha = moment(obj).format("dddd, D MMMM  YYYY");
	}
	else{
		var fecha = moment(obj).format("dddd, D MMMM YYYY, h:mm:ss a");
	}
	return fecha;
}

function yaPasoSeViene(obj){
	var clase; 
	if(obj.cuando == 0){ clase = "yapaso"; };
	if(obj.cuando == 1){ clase = "seviene"; };
	return clase;
}
function nombreEvento (obj){
	if(obj.web){
 		var nombre = "<a class='nombre_evento' href='" + obj.web + "' target='_blank'>" + obj.evento + "</a>";
	}
	else{
		var nombre = obj.evento;
	}
	return nombre;
}

function leerMas (desc, i) {
	if(desc !== ""){
		var link = " <a rel='" + i + "' href='#' name='false' class='leermas label label-info'>más...<a/>";
	}else{
		var link = "";
	}
	return link;
}


