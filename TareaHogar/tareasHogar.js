function tareaFamilia(nFamilia,mFamilia,tareas){
    this.nFamilia = nFamilia;
    this.mFamilia = mFamilia;
    this.tareas = tareas;
    this.asignacionTarea = function (semanas){
        console.log("Planificación Familia "+nFamilia);
        
        for(var semana =1;semana <= semanas;semana++){
            var asignacionSemanal='';

            for(var i =0;i<this.mFamilia.length;i++){
                var miembro = this.mFamilia[i];
                var tareaIndice = this.tareas[(semana + i)%this.tareas.length];
                asignacionSemanal = asignacionSemanal + ' '+miembro+' le toca '+ tareaIndice+ '|';
            }
            console.log('Semana '+semana+' : '+ asignacionSemanal);
        }
    }
}
//Familia Sastre
var fSastre = new tareaFamilia("Sastre",["Padre","Madre","Hijo","Hija"],["Poner lavadora","Limpiar cocina","Limpiar baño"]);
console.log(fSastre);
//Familia Torrens
var fTorrens = new tareaFamilia("Torrens",["Padre","Madre","Hijo","Hija"],["Planchar","Limpiar baño"]);
//Familia Moll
var fMoll = new tareaFamilia("Moll",["Padre","Madre","Hijo","Hija Grande","Hija Pequeña"],["Poner lavadora","Limpiar cocina","Limpiar comedor","Planchar","Limpiar baño"]);
//fSastre.asignacionTarea(52);
fTorrens.asignacionTarea(4);
//fMoll.asignacionTarea(12);