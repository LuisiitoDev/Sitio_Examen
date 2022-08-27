'use strict';

const cedula = '#txtCedula';
const nombre = '#txtNombre';
const fechaNacimiento = '#txtFechaNacimiento';
const masculino = '#RbPagoMasculino';
const femenino = '#RbPagoFemenino';
const direccion = '#txtDireccion';
const telefono = '#txtTelefono';
const fechaInicioLabores = '#txtFechaInicioLabores';
const correo = '#txtCorreoElectronico';
const password = '#txtPassword';
const cantidadHorasLaboradas = '#txtCantidadHorasLaboradas';
const pagoOrdinario = '#RbPagoOrdinario';
const pagoExtraordinario = '#RbPagoExtraordinario';
const txtsalario = '#txtSalario';
const precioHora = '#txtPrecioHora';


$(function(){
    $("#employee").submit(function(e){
        e.preventDefault();
    }).validate({
        rules: {
            'cedula': 'required',
            'nombre': 'required',
            'nacimiento': 'required',
            'genero[]': 'required',
            'direccion': 'required',
            'telefono': 'required',
            'fechaInicioLabores': 'required',
            'correo': {
                'required': true,
                'email': true
            },
            'password': {
                'required': true,
                'minlength': 5
            },
            'cantidadHoras': 'required',
            'tipoPago[]': 'required',
            'precioHora': 'required'
        },
        messages: {
            'cedula': 'Por favor ingrese la cedula',
            'nombre': 'Por favor ingrese el nombre',
            'nacimiento': 'Por favor ingrese la fecha de nacimientos',
            'genero[]': 'Por favor seleccione el genero',
            'direccion': 'Por favor ingrese la direccion',
            'telefono': 'Por favor ingrese el telefono',
            'fechaInicioLabores': 'Por favor ingrese la fecha de inicio de labores',
            'correo': {
                'required': 'Por favor ingrese el correo',
                'email': 'Debe ingresar un correo valido'
            },
            'password': {
                'required': 'Por favor ingrese el password',
                'minlength': 'La cantidad minima para el password es de 5'
            },
            'cantidadHoras': 'Por favor ingrese la cantidad de horas',
            'tipoPago[]': 'Por favor seleccione el tipo de pago',
            'precioHora': 'Por favor ingrese el precio de la hora'
        },
        submitHandler: function(form){
            CalcularSalario();
            return false;
        }
    });
});

const onClickRbPagoOrdinario = event => {
    if($(event).is(':checked')){
        $(pagoExtraordinario).removeattr('checked');
    }
};


const onClickRbPagoExtraordinario = event => {
    if($(event).is(':checked')){
        $(pagoOrdinario).removeattr('checked');
    }
};

const onClickRbMasculino = event => {
    if($(event).is(':checked')){
        $(femenino).removeattr('checked');
    }
};

const onClickRbFemenino = event => {
    if($(event).is(':checked')){
        $(masculino).removeattr('checked');
    }
};

/*
    Permite poder calcular el salario basado en si el pago es estraodinario u ordinario
 */
const CalcularSalario = () => {

    const EXTRAS = 1.5;
    const isOrdinario = $(RbPagoOrdinario).is(':checked');
    const isExtraordinario = $(pagoExtraordinario).is(':checked');

    let salario = 0;

    if(isOrdinario){
        salario = parseFloat($(cantidadHorasLaboradas).val()) * parseFloat($(precioHora).val());
    }

    if(isExtraordinario){
        salario = parseFloat($(cantidadHorasLaboradas).val()) * parseFloat($(precioHora).val()) * EXTRAS;
    }


    $(txtsalario).val(salario);
};