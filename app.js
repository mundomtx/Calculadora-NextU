
var Calculadora = {
	init: function(){
		this.iniciarVariables()
		this.reinicioDisplay()
	},
	iniciarVariables: function(){
		var self = this
		var classname = document.getElementsByClassName("tecla");

		for (var i = 0; i < classname.length; i++){
    		classname[i].addEventListener("mousedown", function(){
				this.style.padding = '3px'
			});

			classname[i].addEventListener("mouseup", function(){
				this.style.padding = '0px'
			});
		}

		document.getElementById('0').addEventListener('click', function() {
		  self.agregarValor(0)
		})

		document.getElementById('1').addEventListener('click', function() {
		  self.agregarValor(1)
		})

		document.getElementById('2').addEventListener('click', function() {
		  self.agregarValor(2)
		})

		document.getElementById('3').addEventListener('click', function() {
		  self.agregarValor(3)
		})

		 document.getElementById('4').addEventListener('click', function() {
		  self.agregarValor(4)
		})

		document.getElementById('5').addEventListener('click', function() {
		  self.agregarValor(5)
		})

		document.getElementById('6').addEventListener('click', function() {
		  self.agregarValor(6)
		})

		document.getElementById('7').addEventListener('click', function() {
		  self.agregarValor(7)
		})

		document.getElementById('8').addEventListener('click', function() {
		  self.agregarValor(8)
		})

		document.getElementById('9').addEventListener('click', function() {
		  self.agregarValor(9)
		})

		document.getElementById('on').addEventListener('click', function() {
		  self.reinicioDisplay()
		})

		document.getElementById('punto').addEventListener('click', function() {
		  self.anadirPunto()
		})

		document.getElementById('sign').addEventListener('click', function() {
		  self.anadirSigno()
		})

		document.getElementById('mas').addEventListener('click', function() {
		  self.agregarOperacion('1')
		})

		document.getElementById('menos').addEventListener('click', function() {
		  self.agregarOperacion('2')
		})

		document.getElementById('por').addEventListener('click', function() {
		  self.agregarOperacion('3')
		})

		document.getElementById('dividido').addEventListener('click', function() {
		  self.agregarOperacion('4')
		})

		document.getElementById('igual').addEventListener('click', function() {
		  self.operacionIgual()
		})
	},
	validarNumeroDigitos: function(valor){
		var valor = String(valor);
		return valor.substring(0, 8)
	},
	agregarValor: function(valor){
		var self = this
		var elemento = document.getElementById('display')

		if(sessionStorage.result==1){
			elemento.innerHTML = valor;
			sessionStorage.result=0
		}else{
			if(elemento.innerHTML=='0'){
				elemento.innerHTML = valor;
			}else{
				var displayNew = elemento.innerHTML+valor
				var displayOptimo = self.validarNumeroDigitos(displayNew)
				elemento.innerHTML = displayOptimo;
			}
		}
	},
	reinicioDisplay: function(){
		document.getElementById('display').innerHTML = '0';

		sessionStorage.valor = 0;
		sessionStorage.operacion = 0; 
		sessionStorage.result = 0;
		sessionStorage.ultimoResultado = 0
		sessionStorage.operacionActiva = 0
		sessionStorage.valorGuardado = 0
		sessionStorage.countOperadorIgual = 0
	},
	anadirPunto: function(){
		var self = this
		var elemento = document.getElementById('display')
		if(elemento.innerHTML.indexOf('.')<0){
			var displayNew = elemento.innerHTML+'.';
			var displayOptimo = self.validarNumeroDigitos(displayNew)
			elemento.innerHTML = displayOptimo;
			
		}
	},
	anadirSigno: function(){
		var elemento = document.getElementById('display')
		if(elemento.innerHTML.indexOf('-')<0 && elemento.innerHTML!='0' && elemento.innerHTML!=''){
			
			document.getElementById('display').innerHTML = '-'+elemento.innerHTML;
		}else if(elemento.innerHTML!=0 && elemento.innerHTML!=''){
			
			document.getElementById('display').innerHTML = elemento.innerHTML.substring(1);
		}
	},
	agregarOperacion: function(valor){
		var self = this
		var elemento = document.getElementById('display')

		var valorDisplay = Number(elemento.innerHTML)
		var valorOperacion = valor

		if(sessionStorage.result==1){
			sessionStorage.valor = sessionStorage.ultimoResultado
			sessionStorage.result = 0
		}else{
			if(sessionStorage.operacionActiva=='1'){
				sessionStorage.valor = self.resultado(sessionStorage.valor, valorDisplay, sessionStorage.operacion, 1)
				sessionStorage.result = 0

			}else{
				sessionStorage.valor = Number(valorDisplay);
			}
		}

		if(valorDisplay!=''){
			sessionStorage.valorGuardado = Number(valorDisplay);
		}
		
		sessionStorage.countOperadorIgual = 0
		sessionStorage.operacionActiva = 1;
		sessionStorage.operacion = valorOperacion;
		elemento.innerHTML = '';
		
	},
	operacionIgual: function(){
		var self = this
		var elemento = document.getElementById('display');

		var valorDisplay 	= sessionStorage.valor
		var valorOperacion 	= sessionStorage.operacion
		var valorDisplayNew	= elemento.innerHTML

		if(valorDisplayNew==''){
			valorDisplayNew = sessionStorage.valorGuardado
		}else if(valorDisplayNew!='' && sessionStorage.countOperadorIgual==0){
			sessionStorage.valor = valorDisplayNew
			sessionStorage.countOperadorIgual = 1
		}
	
		elemento.innerHTML = self.resultado(valorDisplay, valorDisplayNew, valorOperacion, 0)
	},
	resultado: function(valor1, valor2, operacion, tipo){

		var self = this

		switch(operacion){
			case '1':
				var resultado = (Number(valor1)+Number(valor2))
				break;
			case '2':
				var resultado = (Number(valor1)-Number(valor2))
				break;
			case '3':
				var resultado = (Number(valor1)*Number(valor2))
				break;
			case '4':
				var resultado = (Number(valor1)/Number(valor2))
				break;
			default:
				var resultado = Number(valor2);
		} 

		resultadoValidado = self.validarNumeroDigitos(resultado);
		sessionStorage.operacionActiva = tipo
		sessionStorage.result = 1
		sessionStorage.ultimoResultado = resultadoValidado
		return resultadoValidado;
	}
}

Calculadora.init()



