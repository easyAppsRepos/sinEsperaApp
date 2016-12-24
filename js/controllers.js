/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    //$scope.$parent.showHeader();
    //$scope.$parent.clearFabs();
    //$scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})





.factory('apiC', function($http, $q, $window) {
  return {




    consultaTiempos:function(data){


        var turnos=JSON.parse($window.localStorage.getItem("turnos"));
  
   console.log(turnos);


/*    for (var i = 0; i < turnos.length; i++) {
       
       console.log(turnos[i]);
    }


var data =
    [
{
      "token"    : "zz52nDGOHHbVBwbyfOJ4" ,
      "turn"      : "AA001" ,
      "business"  : 1
},
{
      "token"    : "zz52nDGOHHbVBwbyfOJ4" ,
      "turn"      : "0004000000" ,
      "business"  : 2
}   
      ];
*/
    //return turnos;

      return  $http.post('http://api.nowaiting.koobiko.com/queue_consult.json',turnos)
                    .then(function(response) {
            
                     
                console.log(response);
                             //console.log(response.data.response.token);

                            return response.data.response;
                     

                    }, function(response) {
                        // something went wrong
                        console.log('consultaQWrong');
                         console.log(response);
                        // console.log(response);
                        return 500;
                    });

  },


    consultaQ:function(data){
      return  $http.post('http://api.nowaiting.koobiko.com/queue_consult.json',[data])
                    .then(function(response) {
            
                     
                console.log('consultaQ');
                             //console.log(response.data.response.token);

                            return response;
                     

                    }, function(response) {
                        // something went wrong
                        console.log('consultaQWrong');
                        // console.log(response);
                        return response;
                    });

  },


    getCompany:function(data){
      return  $http.post(' http://api.nowaiting.koobiko.com/companies.json',data)
                    .then(function(response) {
            
                     
                console.log('getCompany');
                             //console.log(response.data.response.token);

                            return response;
                     

                    }, function(response) {
                        // something went wrong
                        console.log('err');
                        // console.log(response);
                        return 500;
                    });

  },


    turnConsult:function(data){
      return  $http.post(' http://api.nowaiting.koobiko.com/turnConsult.json',data)
                    .then(function(response) {
            
                     
                console.log('addd44');
                             //console.log(response.data.response.token);

                            return response;
                     

                    }, function(response) {
                        // something went wrong
                        console.log('ddada22');
                        // console.log(response);
                        return response;
                    });

  },

    getToken:function(user){
      return  $http.get(' http://api.nowaiting.koobiko.com/token.json')
                    .then(function(response) {
            
                     
                console.log('asd2');
                             //console.log(response.data.response.token);

                            return response;
                     

                    }, function(response) {
                        // something went wrong
                        console.log('ger3');
                        // console.log(response);
                        return response;
                    });

  },

    getTokenD: function() {

  var deferred = $q.defer();
      $http({
    method: 'GET',
    url: 'http://api.nowaiting.koobiko.com/getToken.json',
   
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
    data: {}
}).success(function (response, status) {console.log(response);
  deferred.resolve(response);});
    return deferred.promise;
    }


  }
})


.controller('ProfileCtrl', function($scope, $stateParams, $interval, $timeout, $window, ionicMaterialMotion, ionicMaterialInk, apiC) {
    // Set Header
//    $scope.$parent.noHeader();
  //  $scope.$parent.hideNavBar();
   // $scope.$parent.hideHeader();
   


   // $scope.$parent.clearFabs();
    //$scope.isExpanded = false;
    //$scope.$parent.setExpanded(false);
    //$scope.$parent.setHeaderFab(false);


        $scope.$on('$ionicView.beforeEnter', function(){
        $scope.getTurnos();
    });

      

        $scope.turnos=[];
  

console.log(localStorage.getItem('sinEsperaToken'));

$scope.calcularTiempo = function(minutos){

var hours = Math.floor( minutos / 60);          
    var minutes = minutos% 60;
var strTiempo = hours + ' Hrs y ' + minutes+' Min';
return strTiempo;
}


$scope.verificarOld= function(turnos){

console.log(turnos);
var turnosGuardados=JSON.parse($window.localStorage.getItem("turnos"));
var len = turnos.length;
for (var i = 0; i < len; i++) {

        //console.log(turnos[i]);
        if(turnos[i].remaining.time<1){
            console.log(turnos[i].remaining.time);
            for (var k = 0; k < turnosGuardados.length; k++) {

                if(turnos[i].business == turnosGuardados[k].business && turnos[i].turn == turnosGuardados[k].turn){
                  
                    var indexEliminar= turnosGuardados.indexOf(turnosGuardados[k]);
                    turnosGuardados.splice(indexEliminar,1);
                    $window.localStorage.setItem("turnos", JSON.stringify(turnosGuardados));


                    var turnosHistorial=JSON.parse($window.localStorage.getItem("turnosHistorial"));
                    if(turnosHistorial == null){turnosHistorial=[]}
                    var turnosHistorialNew = turnos[i] ;


                //
                        var currentDate = new Date()
                        var day = currentDate.getDate()
                        var month = currentDate.getMonth() + 1
                        var year = currentDate.getFullYear()
                        var ddd =  day + "/" + month + "/" + year;
                        turnosHistorialNew.date=ddd;
                //
                    console.log(turnosHistorialNew);
                    turnosHistorial.push(turnosHistorialNew);
                    $window.localStorage.setItem("turnosHistorial", JSON.stringify(turnosHistorial));

                }
                
            }

        }
}


};


$scope.getTurnos= function(){

apiC.consultaTiempos().then(function(response){

    console.log(JSON.parse($window.localStorage.getItem("turnos")));

    if(response==500){
        console.log('no internet');
    }
        else{
            $scope.turnos=response;
            $scope.verificarOld($scope.turnos);
            $scope.historialT = JSON.parse($window.localStorage.getItem("turnosHistorial"));
console.log(    $scope.historialT);
        }
});


}

  $interval(function(){
    $scope.getTurnos();
    //console.log('ádadadadadasd22233');
}, 60000);

$scope.getTokenS = function(){    

apiC.getToken().then(function(response){
var tok=response.data.response.token;
console.log(tok);
 $window.localStorage['sinEsperaToken']=tok;

});

}


$scope.consultaTurno=function(){

var data = {token:localStorage.getItem('sinEsperaToken'), turn: '0004000000', business:1};    

apiC.turnConsult(data).then(function(response){
console.log(response)

});

}



$scope.getCompany=function(){

var data = {term: 'banco', search_by:'name'};    

apiC.getCompany(data).then(function(response){
console.log(response)

});

}

$scope.consultaQ=function(){

var data = {token:localStorage.getItem('sinEsperaToken'), turn: '0004000000', business:2};  
//var data = {token:'zz52nDGOHHbVBwbyfOJ4', turn: '0004000000', business:2};      

apiC.consultaQ(data).then(function(response){
console.log(response)

});

}



//$scope.getTokenS();

//$scope.consultaQ(); 


$scope.path=true;

$scope.cambiar=function(estado){

    if(estado == 1 && $scope.path == false){
    $scope.path = !$scope.path;}



    if(estado == 0 && $scope.path == true){
    $scope.path = !$scope.path;}
}




    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, apiC, $window, $ionicPopup, $state, $ionicModal, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);



$scope.empresa={};
$scope.carg=false;
$scope.noResult=false;

//modal 

  $scope.openModal = function(animation) {
    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: animation
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

//modal end


$scope.getTurnos= function(id,turno){

var turnos=JSON.parse($window.localStorage.getItem("turnos"));

    console.log(turnos);


}


/*

var string = Codturno;
var re = new RegExp("/(^[a-zA-Z]{0,4}[0-9]{0,10}$)|(^[0-9]{0,10}$)/");
if (re.test(string)) {
    console.log("Valid");
} else {
       $scope.alerta("EL TICKET ESTA MAL FORMADO!");
}





*/

$scope.guardarTurno= function(Codturno){

var string = Codturno;
var re = new RegExp("(^[a-zA-Z]{0,4}[0-9]{0,10}$)|(^[0-9]{0,10}$)");
if (re.test(string)) {
    console.log("Valido");

    console.log(Codturno);

var turnos=JSON.parse($window.localStorage.getItem("turnos"));

if(turnos == null){turnos=[]}

var turno = {turn:Codturno, business: $scope.empresa.id, token: localStorage.getItem('sinEsperaToken')};

turnos.push(turno);

$window.localStorage.setItem("turnos", JSON.stringify(turnos));

$scope.alerta("TURNO GUARDADO EXITOSAMENTE",2);

} else {
       $scope.alerta("EL TICKET ESTA MAL FORMADO!",1);
}






}


/*
JSON.parse(localStorage.getItem("turnos"));
turno = {turn:dasda, business:dasda, token: };
turnos.push(turno);
localStorage.setItem("names", JSON.stringify(turnos));



*/



/*

var names = [];
names[0] = prompt("New member name?");
localStorage.setItem("names", JSON.stringify(names));

//...
var storedNames = JSON.parse(localStorage.getItem("names"));


reg exp:





*/


$scope.openEmpresa = function(nombre,imagen,id){

    $scope.empresa.nombre=nombre;
       $scope.empresa.imagen=imagen;
          $scope.empresa.id=id;

    console.log('asd');
     $scope.openModal();
}


/*
$scope.consultaQ=function(turno, business){

var data = {token:localStorage.getItem('sinEsperaToken'), turn: turno, business:business};  
//var data = {token:'zz52nDGOHHbVBwbyfOJ4', turn: '0004000000', business:2};      

apiC.consultaQ(data).then(function(response){
console.log(response)

});

}*/

$scope.alerta = function(mensaje,tipo){

    if(tipo==1)

{   
 var customTemplate =
      '<div style="text-align:center"><img style="margin-top:10px" src="img/alert.png"> <p style="margin-top:25px">'+mensaje+'</p> </div>';

    $ionicPopup.show({
      template: customTemplate,
      title: '',
      subTitle: '',
      buttons: [{
        text: 'Cerrar',
        type: 'button-assertive',
        onTap: function(e) {

        }
      }]
    });
}


    if(tipo==2)

{   
 var customTemplate =
      '<div style="text-align:center"><img style="margin-top:10px" src="img/posi.png"> <p style="margin-top:25px">'+mensaje+'</p> </div>';

    $ionicPopup.show({
      template: customTemplate,
      title: '',
      subTitle: '',
      buttons: [{
        text: 'OK',
        type: 'button-balanced',
        onTap: function(e) {
 $scope.closeModal();
 $state.go('app.profile');
        }
      }]
    });
}

}


$scope.borrarBtn=function(){



$scope.texto='';

  

};

$scope.buscar = function(texto){

console.log(texto.length);
    $scope.noResult=false;
if(texto.length>1)
  
{
  $scope.carg=true;

    var data = {term: texto, search_by:'name'};    


apiC.getCompany(data).then(function(response){
    
    if(response == 500){
        $scope.alerta("VERIFICA TU CONEXION A INTERNET",1);
          $scope.carg=false;
    }
    else{
        $scope.carg=false;
        $scope.items=response.data.response;
        if($scope.items.length<1){$scope.noResult=true;}
        else{$scope.noResult=false;}
        }

});

}

else{
    $scope.noResult=false;
    $scope.items=[];
}

}

$scope.getCompany=function(palabra){

var data = {term: palabra, search_by:'name'};    

apiC.getCompany(data).then(function(response){
console.log(response);

});

}


    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;