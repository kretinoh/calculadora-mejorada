{
    const calculadora = {
        display: undefined,
        reset: true,
        valor1: 0,
        valor2: 0,
        operador: undefined,
        buttonsArray: ['CE', '<-', '%', '+',
            '7', '8', '9', '-',
            '4', '5', '6', 'x',
            '1', '2', '3', '÷',
            '0', '±', ',', '='
        ],
        creaButton: (valor) => {
            const btn = document.createElement("button");
            btn.innerHTML = valor;
            //Vamos a utilizar un listener para cada botón 
            btn.addEventListener("click", calculadora.eventoClick(valor));
            return btn;
        },
        eventoClick: (valor) => {
            //Si el valor es un numerico
            if (/[0-9]/.test(valor)) {
                return () => {
                    if (calculadora.reset) {
                        calculadora.display.value = valor;
                        //Cambiamos el valor de reset para que no se borre el valor
                        calculadora.reset = false;
                    } else {
                        calculadora.display.value += valor;
                    }
                }
            }
            //Si el valor es un operador aquí vamos a hacer la operacion mas adelante
            switch (valor) {
                case ',':
                    return () => {
                        if (!calculadora.display.value.includes(",")){
                            calculadora.display.value += valor;
                            calculadora.reset = false;
                        }
                    }
                case 'CE':
                    return () => {
                        calculadora.display.value = 0;
                        calculadora.reset = true;
                    }
                case '+':
                    return () => {
                        calculadora.valor1 = Number(calculadora.display.value);
                        calculadora.display.value = 0;
                        calculadora.reset = true;
                        calculadora.operador = '+';
                    }
                case '-':
                    return () => {
                        calculadora.valor1 = Number(calculadora.display.value);
                        calculadora.display.value = 0;
                        calculadora.reset = true;
                        calculadora.operador = '-';
                    }
                case 'x':
                    return () => {
                        calculadora.valor1 = Number(calculadora.display.value);
                        calculadora.display.value = 0;
                        calculadora.reset = true;
                        calculadora.operador = '*';
                    }
                case '±':
                    return () => {
                        calculadora.display.value = calculadora.display.value * -1;
                    }
                case '%':
                    return () => {
                        calculadora.display.value = calculadora.display.value / 100;
                    }
                case '÷':
                    return () => {
                        calculadora.valor1 = Number(calculadora.display.value);
                        calculadora.display.value = 0;
                        calculadora.reset = true;
                        calculadora.operador = '/';
                    }
                case '=':
                    return () => {
                        calculadora.valor2 = Number(calculadora.display.value);
                        switch (calculadora.operador) {
                            case '+':
                                calculadora.display.value = calculadora.valor1 + calculadora.valor2;
                                calculadora.operador = undefined;
                                calculadora.reset = true;
                                break;
                            case '-':
                                calculadora.display.value = calculadora.valor1 - calculadora.valor2;
                                calculadora.operador = undefined;
                                calculadora.reset = true;
                                break;
                            case '*':
                                calculadora.display.value = calculadora.valor1 * calculadora.valor2;
                                calculadora.operador = undefined;
                                calculadora.reset = true;
                                break;
                            case '/':
                                calculadora.display.value = calculadora.valor1 / calculadora.valor2;
                                calculadora.operador = undefined;
                                
                                calculadora.reset = true;
                        }
                    }
            }
        },
        //Creamos la vista de la calculadora
        init: () => {
            return document.addEventListener("DOMContentLoaded", () => {
                const caja = document.createElement("div");
                document.body.appendChild(caja);

                calculadora.display = document.createElement("input");
                calculadora.display.setAttribute("readonly", "true");
                calculadora.display.value = 0;
                caja.appendChild(calculadora.display);

                calculadora.buttonsArray.forEach(button => {
                    caja.appendChild(calculadora.creaButton(button));
                });
            });
        }
    }
    calculadora.init();
}
