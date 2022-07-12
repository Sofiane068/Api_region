const region = document.getElementById("reg");
const communes = document.getElementById("com");
const loader = document.getElementById("load");

loader.style.display="none";

fetch("https://geo.api.gouv.fr/regions")
.then( res => res.json())
.then( datas => datas.forEach(data => {

         const option= document.createElement("option");
         option.setAttribute("class", "opReg");
         region.appendChild(option);
         option.value=data.code;
         option.innerText=data.nom +" ("+ data.code +")";

        
})


)

function getCommune (region){

    loader.style.display="inline-block";
    if(region.trim()===""){
        loader.style.display="none";
        communes.disabled= true;
        communes.selectedIndex=0;
        return false;
    }


fetch("https://geo.api.gouv.fr/communes")
    .then( res => res.json())
    .then( function(data){


        let coms=[];


       data.forEach(function(c){

        // while( communes.disabled===true){

            if(c.codeRegion===region){

                coms.push(c.nom);
                console.log(coms);
                let out = "";
                out += `<option value="">séléctionnez votre commune</option>`;
                for(let com of coms){
                    out += `<option value="${com}">${com}</option>`;
                    
                    }
                    
                communes.innerHTML = out;
                loader.style.display="none";
                communes.disabled = false;
                
                
            }
        // }


       })
       
       
     })


}




