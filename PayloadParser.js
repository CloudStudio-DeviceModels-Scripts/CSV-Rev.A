function parseUplink(device, payload)
{
 
    function ExtractTagData(tagValuesObject){
        v = null;
        q = null;
        ts = null;
        return {
            v: (tagValuesObject["v"].toFixed(2)),
            q: tagValuesObject["q"],
            ts: new Date(tagValuesObject["ts"]).toUTCString()
        }
    }

    var N3uronData = payload.asJsonObject();
	
    env.log(N3uronData);
 
   //Recorremos cada "tag" del array del json y procesamos lo que nos interesan
   for (let tag in N3uronData) {
  
    switch (tag){
        case "/CSV/1":
            //Obtenemos el array con lecturas de este tag
            var tagvalues = N3uronData[tag];
            //Recorremos las lecturas y leemos los valores v, q y ts
            tagvalues.forEach(valueElement => {
                var ValueData = ExtractTagData(valueElement);
                //Listo, actualizamos el endpoint
                var etv1 = device.endpoints.byAddress("1");
                etv1.updateGenericSensorStatus(ValueData.v, ValueData.ts);
            });
            break;
        }
    }
}
