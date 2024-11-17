document.getElementById("converter_botao").addEventListener("click", async () => {
   const valor = parseFloat(document.getElementById("valor").value);
   const demoeda = document.getElementById("demoeda").value;
   const paramoeda = document.getElementById("paramoeda").value;

   if (isNaN(valor) || valor <= 0) {
       document.getElementById("resultado").innerText = "Por favor, insira um valor válido!";
       return;
   }

   try {
       // Usando EUR como moeda base
       const response = await fetch(`https://api.exchangeratesapi.io/latest?base=EUR&symbols=${demoeda},${paramoeda}&access_key=d324e436a95c3f918aad98b4d770c0e6`);
       const data = await response.json();

       if (data.rates[demoeda] && data.rates[paramoeda]) {
           const taxaDemoedaParaEUR = data.rates[demoeda]; // Moeda selecionada para EUR
           const taxaParamoedaParaEUR = data.rates[paramoeda]; // Moeda de destino para EUR

           // Calculando a conversão
           const valorConvertidoParaEUR = valor / taxaDemoedaParaEUR;
           const valorConvertidoFinal = valorConvertidoParaEUR * taxaParamoedaParaEUR;

           document.getElementById("resultado").innerText = 
               `Resultado: ${valorConvertidoFinal.toFixed(2)} ${paramoeda}`;
       } else {
           document.getElementById("resultado").innerText = "Erro ao buscar as taxas de câmbio!";
       }
   } catch (error) {
       document.getElementById("resultado").innerText = "Erro ao conectar com a API!";
   }
});
